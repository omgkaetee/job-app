"use client"

import * as React from "react"
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
  Award,
  Wand2,
  Target,
  FileCheck,
  Settings2,
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

export function ResumeBuilderContent() {
  const [isDragging, setIsDragging] = React.useState(false)
  const [hasResume, setHasResume] = React.useState(true)

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
              {!hasResume ? (
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    setHasResume(true)
                  }}
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Upload className="size-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drop your resume here
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supports PDF, DOCX, TXT (Max 5MB)
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">resume_john_doe_2024.pdf</p>
                        <p className="text-xs text-muted-foreground">245 KB • Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Replace</Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Analysis Score</span>
                        <span className="font-medium text-primary">78/100</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCcw className="size-4" />
                      Re-analyze
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Extracted Information */}
          {hasResume && (
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
                <Tabs defaultValue="skills" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="skills" className="gap-2">
                      <Code className="size-4" />
                      <span className="hidden sm:inline">Skills</span>
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="gap-2">
                      <Briefcase className="size-4" />
                      <span className="hidden sm:inline">Experience</span>
                    </TabsTrigger>
                    <TabsTrigger value="education" className="gap-2">
                      <GraduationCap className="size-4" />
                      <span className="hidden sm:inline">Education</span>
                    </TabsTrigger>
                    <TabsTrigger value="gaps" className="gap-2">
                      <AlertTriangle className="size-4" />
                      <span className="hidden sm:inline">Gaps</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="skills" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-3">Technical Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Git", "REST APIs"].map((skill) => (
                            <Badge key={skill} variant="secondary" className="gap-1">
                              <Check className="size-3 text-success" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-3">Soft Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {["Leadership", "Communication", "Problem Solving", "Team Collaboration"].map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="experience" className="mt-4">
                    <div className="space-y-4">
                      <ExperienceItem
                        title="Senior Software Engineer"
                        company="TechCorp Inc."
                        duration="2022 - Present"
                        highlights={["Led team of 5 engineers", "Improved performance by 40%", "Architected microservices"]}
                      />
                      <ExperienceItem
                        title="Software Engineer"
                        company="StartupXYZ"
                        duration="2019 - 2022"
                        highlights={["Full-stack development", "Built core features", "Mentored junior developers"]}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="education" className="mt-4">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                            <GraduationCap className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Bachelor of Science in Computer Science</p>
                            <p className="text-sm text-muted-foreground">Stanford University • 2015 - 2019</p>
                            <p className="text-sm text-muted-foreground mt-1">GPA: 3.8/4.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="gaps" className="mt-4">
                    <div className="space-y-3">
                      <GapItem
                        type="missing"
                        title="Missing Industry Keywords"
                        description="Consider adding: CI/CD, Agile, Scrum, Kubernetes, GraphQL"
                      />
                      <GapItem
                        type="improvement"
                        title="Quantifiable Achievements"
                        description="Add specific metrics to 2 of your bullet points"
                      />
                      <GapItem
                        type="suggestion"
                        title="Professional Summary"
                        description="Your summary could be more targeted to specific roles"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* AI Refinement Section */}
          {hasResume && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="size-5 text-primary" />
                  AI Resume Refinement
                </CardTitle>
                <CardDescription>
                  Let AI help you improve your resume sections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <RefinementOption
                    icon={FileCheck}
                    title="Bullet-Point Rewriting"
                    description="Transform weak bullet points into impactful achievements"
                  />
                  <RefinementOption
                    icon={Target}
                    title="ATS Keyword Optimization"
                    description="Add keywords that help your resume pass ATS filters"
                  />
                  <RefinementOption
                    icon={Settings2}
                    title="Tone & Style Adjustments"
                    description="Professional, concise, and impact-focused language"
                  />
                  <RefinementOption
                    icon={Briefcase}
                    title="Role-Specific Tailoring"
                    description="Customize for software engineer, designer, PM, etc."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Target Role</label>
                    <Select defaultValue="software-engineer">
                      <SelectTrigger className="w-[200px]">
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Instructions (Optional)</label>
                    <Textarea
                      placeholder="E.g., Focus on leadership experience, emphasize cloud technologies..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button className="w-full gap-2">
                    <Sparkles className="size-4" />
                    Generate Improved Resume Sections
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                Resume Preview
              </CardTitle>
              <CardDescription>
                Download or preview your refined resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasResume ? (
                <>
                  <div className="aspect-[8.5/11] rounded-lg border border-border bg-secondary/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full p-4 text-xs space-y-4">
                      <div className="text-center border-b border-border pb-3">
                        <p className="font-bold text-foreground text-base">John Doe</p>
                        <p className="text-muted-foreground">Senior Software Engineer</p>
                        <p className="text-muted-foreground text-[10px]">john@example.com • San Francisco, CA</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-[10px] mb-1">SUMMARY</p>
                        <p className="text-muted-foreground text-[9px] leading-relaxed">
                          Experienced software engineer with 5+ years building scalable applications...
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-[10px] mb-1">EXPERIENCE</p>
                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-foreground text-[9px]">Senior Software Engineer • TechCorp</p>
                            <p className="text-muted-foreground text-[8px]">2022 - Present</p>
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-[9px]">Software Engineer • StartupXYZ</p>
                            <p className="text-muted-foreground text-[8px]">2019 - 2022</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-[10px] mb-1">SKILLS</p>
                        <p className="text-muted-foreground text-[8px]">JavaScript, TypeScript, React, Node.js, Python...</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Download className="size-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="size-4" />
                      Download DOCX
                    </Button>
                  </div>
                </>
              ) : (
                <div className="aspect-[8.5/11] rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-center p-4">
                  <FileText className="size-12 text-muted-foreground/50 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Upload a resume to see the preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ExperienceItem({
  title,
  company,
  duration,
  highlights,
}: {
  title: string
  company: string
  duration: string
  highlights: string[]
}) {
  return (
    <div className="p-4 rounded-lg bg-secondary/30 border border-border">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
          <Briefcase className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{company} • {duration}</p>
          <ul className="mt-2 space-y-1">
            {highlights.map((highlight, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function GapItem({
  type,
  title,
  description,
}: {
  type: "missing" | "improvement" | "suggestion"
  title: string
  description: string
}) {
  const icons = {
    missing: AlertTriangle,
    improvement: Target,
    suggestion: Sparkles,
  }
  const Icon = icons[type]

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
      <div className={cn(
        "flex size-8 items-center justify-center rounded-full shrink-0",
        type === "missing" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
      )}>
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function RefinementOption({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
        <Icon className="size-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}
