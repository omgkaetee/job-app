import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("clerkId", ["clerkId"]),

  resumes: defineTable({
    userId: v.string(),
    name: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    parsedText: v.optional(v.string()),
    analysis: v.optional(v.any()),
    score: v.optional(v.number()),
    versions: v.optional(v.array(v.any())),
    isDefault: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),

  coverLetters: defineTable({
    userId: v.string(),
    resumeId: v.optional(v.string()),
    jobTitle: v.string(),
    company: v.string(),
    content: v.string(),
    tone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),

  preferences: defineTable({
    userId: v.string(),
    targetRoles: v.array(v.string()),
    industries: v.array(v.string()),
    seniorityLevels: v.array(v.string()),
    locations: v.array(v.string()),
    workType: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    companySize: v.optional(v.array(v.string())),
    benefits: v.optional(v.array(v.string())),
    autoApply: v.optional(v.boolean()),
    aiTailor: v.optional(v.boolean()),
    notifications: v.optional(v.boolean()),
    weeklySummary: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),

  portfolioProfiles: defineTable({
    userId: v.string(),
    githubUsername: v.optional(v.string()),
    portfolioUrl: v.optional(v.string()),
    githubData: v.optional(v.any()),
    analysis: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),
});
