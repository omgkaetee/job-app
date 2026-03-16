"use client"

import * as React from "react"
import {
  Mail,
  Sparkles,
  FileText,
  RefreshCcw,
  Copy,
  Download,
  Save,
  Edit3,
  Building2,
  Briefcase,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CoverLetterContent() {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [hasGenerated, setHasGenerated] = React.useState(true)
  const [useResumeContext, setUseResumeContext] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setHasGenerated(true)
    }, 2000)
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Cover Letter Generator</h1>
        <p className="text-muted-foreground">
          Create personalized cover letters tailored to each job application
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                Letter Details
              </CardTitle>
              <CardDescription>
                Enter the job details to generate a tailored cover letter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Target Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Senior Software Engineer"
                  defaultValue="Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="e.g., TechCorp Inc."
                  defaultValue="TechCorp Inc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Writing Tone</Label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="highlights">Key Points to Highlight (Optional)</Label>
                <Textarea
                  id="highlights"
                  placeholder="e.g., Leadership experience, specific projects, relevant achievements..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Use Resume Context</p>
                    <p className="text-xs text-muted-foreground">Pull information from your uploaded resume</p>
                  </div>
                </div>
                <Switch
                  checked={useResumeContext}
                  onCheckedChange={setUseResumeContext}
                />
              </div>

              <Button
                className="w-full gap-2"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCcw className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Saved Letters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="size-5 text-primary" />
                Saved Cover Letters
              </CardTitle>
              <CardDescription>
                Your previously generated cover letters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SavedLetterItem
                  role="Senior Software Engineer"
                  company="TechCorp Inc."
                  date="2 days ago"
                />
                <SavedLetterItem
                  role="Full-Stack Developer"
                  company="StartupXYZ"
                  date="1 week ago"
                />
                <SavedLetterItem
                  role="Software Engineer III"
                  company="FinanceApp"
                  date="2 weeks ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Generated Letter */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-primary" />
                    Generated Cover Letter
                  </CardTitle>
                  <CardDescription>
                    AI-generated letter based on your inputs
                  </CardDescription>
                </div>
                {hasGenerated && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="size-8" onClick={handleCopy}>
                      {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Edit3 className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {hasGenerated ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-secondary/20 border border-border space-y-4 text-sm leading-relaxed">
                    {/* Personalized Intro */}
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">Personalized Intro</Badge>
                      <p className="text-foreground">
                        Dear Hiring Manager,
                      </p>
                      <p className="text-muted-foreground">
                        I am excited to apply for the Senior Software Engineer position at TechCorp Inc. With over 5 years of experience building scalable web applications and leading high-performing engineering teams, I am confident that my skills and passion for innovation align perfectly with your company&apos;s mission to revolutionize the tech industry.
                      </p>
                    </div>

                    {/* Skills Alignment */}
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">Skills Alignment</Badge>
                      <p className="text-muted-foreground">
                        Throughout my career, I have developed deep expertise in JavaScript, TypeScript, React, and Node.js. At my current role, I architect and maintain microservices that handle millions of requests daily, demonstrating my ability to build systems that scale. My experience with cloud platforms like AWS and containerization technologies like Docker ensures I can contribute effectively to your engineering ecosystem from day one.
                      </p>
                    </div>

                    {/* Experience Highlights */}
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">Experience Highlights</Badge>
                      <p className="text-muted-foreground">
                        In my current position at TechCorp Inc., I led a team of 5 engineers in delivering a critical platform migration that improved system performance by 40%. I also spearheaded the adoption of best practices in code review and testing, resulting in a 60% reduction in production incidents. These experiences have honed my technical leadership skills and my ability to drive meaningful improvements.
                      </p>
                    </div>

                    {/* Closing Paragraph */}
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">Closing</Badge>
                      <p className="text-muted-foreground">
                        I am particularly drawn to TechCorp Inc.&apos;s commitment to innovation and its collaborative engineering culture. I would welcome the opportunity to discuss how my background in building high-performance applications and mentoring engineering teams can contribute to your continued success.
                      </p>
                      <p className="text-muted-foreground">
                        Thank you for considering my application. I look forward to the possibility of contributing to your team.
                      </p>
                      <p className="text-foreground mt-4">
                        Best regards,<br />
                        John Doe
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2" onClick={handleGenerate}>
                      <RefreshCcw className="size-4" />
                      Regenerate
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Edit3 className="size-4" />
                      Edit
                    </Button>
                    <Button className="flex-1 gap-2">
                      <Save className="size-4" />
                      Save
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1 gap-2">
                      <Download className="size-4" />
                      Download PDF
                    </Button>
                    <Button variant="secondary" className="flex-1 gap-2">
                      <Copy className="size-4" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Mail className="size-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    No cover letter yet
                  </p>
                  <p className="text-xs text-muted-foreground max-w-[250px]">
                    Fill in the details on the left and click generate to create your personalized cover letter
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

function SavedLetterItem({
  role,
  company,
  date,
}: {
  role: string
  company: string
  date: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="size-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <Briefcase className="size-3" />
            {role}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Building2 className="size-3" />
            {company} • {date}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="size-8">
        <Copy className="size-4" />
      </Button>
    </div>
  )
}
