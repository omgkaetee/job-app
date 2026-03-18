import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeResume(resumeText: string, targetRole?: string) {
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

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      { role: "user", content: userMessage }
    ]
  });

  const content = response.content[0];
  if (content.type === "text") {
    try {
      return JSON.parse(content.text);
    } catch {
      return { score: 50, summary: content.text, strengths: [], gaps: [], keywords: [], suggestions: [] };
    }
  }
  return { score: 50, summary: "Analysis failed", strengths: [], gaps: [], keywords: [], suggestions: [] };
}

export async function rewriteResumeSection(
  section: string,
  context: string,
  targetRole: string,
  instructions?: string
) {
  const systemPrompt = `You are an expert resume writer. Rewrite the provided resume section to be more impactful, concise, and optimized for ATS.
- Use action verbs and quantify achievements where possible
- Keep it concise but compelling
- Include relevant keywords for the target role
- Maintain professional tone`;

  const userMessage = `Rewrite this ${section} for a ${targetRole} position.
Context: ${context}
${instructions ? `Additional instructions: ${instructions}` : ''}`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [
      { role: "user", content: userMessage }
    ]
  });

  const content = response.content[0];
  if (content.type === "text") {
    return content.text;
  }
  return "Failed to rewrite section";
}

export async function generateCoverLetter(
  resumeText: string,
  jobTitle: string,
  company: string,
  tone: string = "professional",
  highlights?: string
) {
  const systemPrompt = `You are an expert cover letter writer. Write a compelling, personalized cover letter.
- Match the specified tone
- Highlight relevant experience and skills
- Show enthusiasm for the company
- Keep it to 3-4 paragraphs`;

  const userMessage = `Write a ${tone} cover letter for a ${jobTitle} position at ${company}.
Resume: ${resumeText}
${highlights ? `Key points to highlight: ${highlights}` : ''}`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1500,
    system: systemPrompt,
    messages: [
      { role: "user", content: userMessage }
    ]
  });

  const content = response.content[0];
  if (content.type === "text") {
    return content.text;
  }
  return "Failed to generate cover letter";
}

export async function analyzeGitHubProfile(githubUsername: string, repos: any[]) {
  const systemPrompt = `You are an expert software engineer and tech recruiter. Analyze the provided GitHub profile and projects.
Provide insights on:
- Overall profile strength (0-100)
- Technical strengths demonstrated
- Projects worth highlighting
- Suggestions for improvement
Respond with a JSON object.`;

  const userMessage = `Analyze this GitHub profile for ${githubUsername}:
Projects: ${JSON.stringify(repos, null, 2)}`;

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      { role: "user", content: userMessage }
    ]
  });

  const content = response.content[0];
  if (content.type === "text") {
    try {
      return JSON.parse(content.text);
    } catch {
      return { score: 50, summary: content.text, strengths: [], suggestions: [] };
    }
  }
  return { score: 50, summary: "Analysis failed", strengths: [], suggestions: [] };
}
