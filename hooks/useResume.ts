import { useQuery, useMutation as useConvexMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useResumes(userId: string) {
  const resumes = useQuery(api.resumes.resumes.getResumesByUser as any, { userId });
  return resumes || [];
}

export function useResume(resumeId: any) {
  const resume = useQuery(api.resumes.resumes.getResumeById as any, { resumeId });
  return resume;
}

export function useGenerateUploadUrl() {
  return useConvexMutation(api.resumes.resumeActions.generateUploadUrl as any);
}

export function useSaveResume() {
  return useConvexMutation(api.resumes.resumeActions.saveResume as any);
}

export function useAnalyzeResume() {
  return useConvexMutation(api.resumes.resumeActions.analyzeExistingResume as any);
}

export function useRewriteSection() {
  return useConvexMutation(api.resumes.resumeActions.rewriteSection as any);
}
