"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import {
  Upload,
  FileText,
  Sparkles,
  Download,
  RefreshCcw,
  Check,
  AlertTriangle,
  Code,
  Briefcase,
  GraduationCap,
  Wand2,
  Target,
  FileCheck,
  Settings2,
  Loader2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useResumes, useSaveResume, useAnalyzeResume } from "@/hooks/useResume"
import { useGenerateUploadUrl } from "@/hooks/useResume"

export function ResumeBuilderContent() {
  const { user, isLoaded } = useUser()
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [selectedResume, setSelectedResume] = React.useState<any>(null)
  const [targetRole, setTargetRole] = React.useState("software-engineer")
  const [file, setFile] = React.useState<File | null>(null)

  const generateUploadUrl = useGenerateUploadUrl()
  const saveResume = useSaveResume()
  const analyzeResume = useAnalyzeResume()

  const resumes = useResumes(user?.id || "")
  
  const currentResume = selectedResume || resumes[0]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !user) return

    setIsUploading(true)
    try {
      const uploadUrl = await generateUploadUrl()

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { storageId } = await response.json()

      await saveResume({
        userId: user.id,
        storageId,
        fileName: file.name,
        fileType: file.type,
        parsedText: "",
        targetRole,
      })

      setFile(null)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!currentResume) return
    
    setIsAnalyzing(true)
    try {
      await analyzeResume({
        resumeId: currentResume._id,
        targetRole,
      })
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <FileText className="size-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Sign in Required</h3>
            <p className="text-muted-foreground">Please sign in to upload and analyze your resume.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const analysis = currentResume?.analysis as any

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
        <p className="text-muted-foreground">
          Upload your resume and let AI help you optimize it for your target roles
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Upload & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="size-5 text-primary" />
                Resume Upload
              </CardTitle>
              <CardDescription>
                Drag and drop your resume or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
                    isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    if (e.dataTransfer.files[0]) {
                      setFile(e.dataTransfer.files[0])
                    }
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Upload className="size-6 text-primary" />
                  </div>
                  {file ? (
                    <>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground mb-4">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drop your resume here
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports PDF, DOCX (Max 5MB)
                      </p>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground mb-2 block">Target Role</label>
                    <Select value={targetRole} onValueChange={setTargetRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="full-stack">Full-Stack Developer</SelectItem>
                        <SelectItem value="frontend">Frontend Developer</SelectItem>
                        <SelectItem value="backend">Backend Developer</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="designer">Product Designer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="mt-6 gap-2" 
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Upload className="size-4" />
                    )}
                    Upload & Analyze
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Resumes */}
          {resumes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  Your Resumes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resumes.map((resume: any) => (
                    <div
                      key={resume._id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer",
                        currentResume?._id === resume._id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedResume(resume)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="size-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{resume.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {resume.score ? `Score: ${resume.score}/100` : "Not analyzed"}
                          </p>
                        </div>
                      </div>
                      {resume.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Analysis */}
          {currentResume && analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  AI-Extracted Information
                </CardTitle>
                <CardDescription>
                  Key information extracted from your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div>
                      <p className="text-sm font-medium">AI Analysis Score</p>
                      <p className="text-xs text-muted-foreground">Based on ATS optimization</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{currentResume.score || 0}</p>
                      <p className="text-xs text-muted-foreground">/100</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="strengths" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="strengths" className="gap-2">
                      <Check className="size-4" />
                      Strengths
                    </TabsTrigger>
                    <TabsTrigger value="gaps" className="gap-2">
                      <AlertTriangle className="size-4" />
                      Gaps
                    </TabsTrigger>
                    <TabsTrigger value="keywords" className="gap-2">
                      <Code className="size-4" />
                      Keywords
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="strengths" className="mt-4">
                    <div className="space-y-3">
                      {analysis.strengths?.map((strength: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                          <Check className="size-4 text-success mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground">{strength}</p>
                        </div>
                      ))}
                      {!analysis.strengths?.length && (
                        <p className="text-sm text-muted-foreground">No strengths identified yet.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gaps" className="mt-4">
                    <div className="space-y-3">
                      {analysis.gaps?.map((gap: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                          <AlertTriangle className="size-4 text-warning mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground">{gap}</p>
                        </div>
                      ))}
                      {!analysis.gaps?.length && (
                        <p className="text-sm text-muted-foreground">No gaps identified yet.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="keywords" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Found Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.found?.map((kw: string, i: number) => (
                            <Badge key={i} variant="secondary" className="gap-1">
                              <Check className="size-3 text-success" />
                              {kw}
                            </Badge>
                          ))}
                          {!analysis.keywords?.found?.length && (
                            <p className="text-sm text-muted-foreground">No keywords found.</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Missing Keywords</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.missing?.map((kw: string, i: number) => (
                            <Badge key={i} variant="outline" className="gap-1">
                              <AlertTriangle className="size-3 text-warning" />
                              {kw}
                            </Badge>
                          ))}
                          {!analysis.keywords?.missing?.length && (
                            <p className="text-sm text-muted-foreground">No missing keywords.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Re-analyze Button */}
          {currentResume && (
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <RefreshCcw className="size-4" />
              )}
              {isAnalyzing ? "Analyzing..." : "Re-analyze with AI"}
            </Button>
          )}
        </div>

        {/* Right Column - Preview & Suggestions */}
        <div className="space-y-6">
          {currentResume && analysis ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="size-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.suggestions?.map((suggestion: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                      <Target className="size-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{suggestion}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    Resume Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[8.5/11] rounded-lg border border-border bg-secondary/20 flex items-center justify-center overflow-hidden">
                    <p className="text-sm text-muted-foreground p-4">
                      {currentResume.parsedText?.substring(0, 500) || "No preview available"}
                    </p>
                  </div>
                  <Button className="w-full mt-4 gap-2">
                    <Download className="size-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Sparkles className="size-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No resume analyzed yet
                </p>
                <p className="text-xs text-muted-foreground max-w-[250px]">
                  Upload your resume to get AI-powered analysis and suggestions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
