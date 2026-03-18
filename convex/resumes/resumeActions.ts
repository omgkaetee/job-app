import { mutation, action, query } from "../_generated/server";
import { v } from "convex/values";
import { createResume, updateResumeAnalysis, getResumeById } from "./resumes";

async function analyzeResumeWithClaude(resumeText: string, targetRole?: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Anthropic API key not configured");
  }

  const systemPrompt = `You are an expert resume analyst and career coach. Analyze the provided resume and provide detailed feedback. 
Consider ATS (Applicant Tracking System) optimization, clarity, impact, and relevance to the target role.
Respond with a JSON object containing:
{
  "score": number (0-100),
  "strengths": string[] (key strengths identified),
  "gaps": string[] (areas for improvement),
  "keywords": string[] (ATS keywords found and missing),
  "suggestions": string[] (specific actionable improvements),
  "summary": string (overall assessment)
}`;

  const userMessage = targetRole 
    ? `Analyze this resume for a ${targetRole} position:\n\n${resumeText}`
    : `Analyze this resume:\n\n${resumeText}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  
  if (content) {
    try {
      return JSON.parse(content);
    } catch {
      return { score: 50, summary: content, strengths: [], gaps: [], keywords: [], suggestions: [] };
    }
  }
  
  return { score: 50, summary: "Analysis failed", strengths: [], gaps: [], keywords: [], suggestions: [] };
}

async function rewriteSectionWithClaude(section: string, context: string, targetRole: string, instructions?: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Anthropic API key not configured");
  }

  const systemPrompt = `You are an expert resume writer. Rewrite the provided resume section to be more impactful, concise, and optimized for ATS.
- Use action verbs and quantify achievements where possible
- Keep it concise but compelling
- Include relevant keywords for the target role
- Maintain professional tone`;

  const userMessage = `Rewrite this ${section} for a ${targetRole} position.
Context: ${context}
${instructions ? `Additional instructions: ${instructions}` : ''}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "Failed to rewrite section";
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveResume = action({
  args: {
    userId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    parsedText: v.optional(v.string()),
    targetRole: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ resumeId: string; storageUrl: string }> => {
    const storageUrl = await ctx.storage.getUrl(args.storageId);
    if (!storageUrl) {
      throw new Error("Failed to get storage URL");
    }

    let analysis = null;
    let score = 0;

    if (args.parsedText) {
      try {
        const result = await analyzeResumeWithClaude(args.parsedText, args.targetRole);
        analysis = result;
        score = result.score || 0;
      } catch (aiError) {
        console.error("AI analysis error:", aiError);
      }
    }

    const resumeId = await ctx.runMutation(createResume as any, {
      userId: args.userId,
      name: args.fileName,
      fileUrl: storageUrl,
      fileType: args.fileType,
      parsedText: args.parsedText,
      analysis,
      score,
      isDefault: true,
    });

    return { resumeId, storageUrl };
  },
});

export const analyzeExistingResume = action({
  args: {
    resumeId: v.id("resumes"),
    targetRole: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const resume = await ctx.runQuery(getResumeById as any, { resumeId: args.resumeId });
    if (!resume) {
      throw new Error("Resume not found");
    }

    const result = await analyzeResumeWithClaude(resume.parsedText || "", args.targetRole);

    await ctx.runMutation(updateResumeAnalysis as any, {
      resumeId: args.resumeId,
      analysis: result,
      score: result.score || 0,
    });

    return result;
  },
});

export const rewriteSection = action({
  args: {
    section: v.string(),
    context: v.string(),
    targetRole: v.string(),
    instructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await rewriteSectionWithClaude(
      args.section,
      args.context,
      args.targetRole,
      args.instructions
    );
  },
});
