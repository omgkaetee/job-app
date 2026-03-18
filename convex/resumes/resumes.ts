import { internalMutation, query } from "../_generated/server";
import { v } from "convex/values";

export const createResume = internalMutation({
  args: {
    userId: v.string(),
    name: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    parsedText: v.optional(v.string()),
    isDefault: v.boolean(),
  },
  handler: async (ctx, args) => {
    if (args.isDefault) {
      const existingResumes = await ctx.db
        .query("resumes")
        .withIndex("userId", (q) => q.eq("userId", args.userId))
        .collect();
      
      for (const resume of existingResumes) {
        await ctx.db.patch(resume._id, { isDefault: false });
      }
    }

    const resumeId = await ctx.db.insert("resumes", {
      userId: args.userId,
      name: args.name,
      fileUrl: args.fileUrl,
      fileType: args.fileType,
      parsedText: args.parsedText,
      isDefault: args.isDefault,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return resumeId;
  },
});

export const updateResumeAnalysis = internalMutation({
  args: {
    resumeId: v.id("resumes"),
    analysis: v.any(),
    score: v.number(),
    parsedText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.resumeId, {
      analysis: args.analysis,
      score: args.score,
      parsedText: args.parsedText,
      updatedAt: Date.now(),
    });
  },
});

export const getResumesByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resumes")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getResumeById = query({
  args: { resumeId: v.id("resumes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.resumeId);
  },
});

export const deleteResume = internalMutation({
  args: { resumeId: v.id("resumes") },
  handler: async (ctx, args) => {
    const resume = await ctx.db.get(args.resumeId);
    if (resume) {
      await ctx.db.delete(args.resumeId);
    }
  },
});

export const setDefaultResume = internalMutation({
  args: { resumeId: v.id("resumes"), userId: v.string() },
  handler: async (ctx, args) => {
    const existingResumes = await ctx.db
      .query("resumes")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();

    for (const resume of existingResumes) {
      await ctx.db.patch(resume._id, { isDefault: resume._id === args.resumeId });
    }
  },
});
