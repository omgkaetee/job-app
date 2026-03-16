"use client"

import * as React from "react"
import {
  FolderGit2,
  Github,
  Globe,
  Sparkles,
  Star,
  GitFork,
  Code,
  FileCode,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Eye,
  Lightbulb,
  Award,
  ExternalLink,
  RefreshCcw,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioReviewContent() {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [hasAnalysis, setHasAnalysis] = React.useState(true)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalysis(true)
    }, 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Portfolio & GitHub Review</h1>
        <p className="text-muted-foreground">
          Get AI insights on your projects and how to showcase them in applications
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Input & Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderGit2 className="size-5 text-primary" />
                Connect Your Work
              </CardTitle>
              <CardDescription>
                Add your GitHub profile or portfolio links for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="size-4" />
                    GitHub Username
                  </Label>
                  <Input
                    id="github"
                    placeholder="e.g., johndoe"
                    defaultValue="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="flex items-center gap-2">
                    <Globe className="size-4" />
                    Portfolio URL
                  </Label>
                  <Input
                    id="portfolio"
                    placeholder="e.g., https://johndoe.com"
                    defaultValue="https://johndoe.dev"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="gap-2"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCcw className="size-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Analyze Projects
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Plus className="size-4" />
                  Add More Links
                </Button>
              </div>
            </CardContent>
          </Card>

          {hasAnalysis && (
            <>
              {/* GitHub Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="size-5 text-primary" />
                    GitHub Profile Analysis
                  </CardTitle>
                  <CardDescription>
                    Overview of your GitHub activity and repositories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <StatBox label="Repositories" value="42" icon={FolderGit2} />
                    <StatBox label="Total Stars" value="128" icon={Star} />
                    <StatBox label="Total Forks" value="45" icon={GitFork} />
                    <StatBox label="Contributions" value="1,234" icon={Code} />
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-foreground">Top Languages</p>
                    <div className="space-y-3">
                      <LanguageBar language="TypeScript" percentage={45} color="bg-blue-500" />
                      <LanguageBar language="JavaScript" percentage={25} color="bg-yellow-500" />
                      <LanguageBar language="Python" percentage={15} color="bg-green-500" />
                      <LanguageBar language="CSS" percentage={10} color="bg-pink-500" />
                      <LanguageBar language="Other" percentage={5} color="bg-gray-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="size-5 text-primary" />
                    Project Analysis
                  </CardTitle>
                  <CardDescription>
                    AI insights on your top projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="top-projects" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="top-projects">Top Projects</TabsTrigger>
                      <TabsTrigger value="code-quality">Code Quality</TabsTrigger>
                      <TabsTrigger value="impact">Impact</TabsTrigger>
                    </TabsList>
                    <TabsContent value="top-projects" className="mt-4 space-y-4">
                      <ProjectCard
                        name="awesome-dashboard"
                        description="A modern analytics dashboard built with React and D3.js"
                        stars={45}
                        forks={12}
                        language="TypeScript"
                        qualityScore={92}
                      />
                      <ProjectCard
                        name="api-toolkit"
                        description="REST API framework with built-in validation and auth"
                        stars={38}
                        forks={15}
                        language="JavaScript"
                        qualityScore={88}
                      />
                      <ProjectCard
                        name="ml-experiments"
                        description="Machine learning experiments and notebooks"
                        stars={23}
                        forks={8}
                        language="Python"
                        qualityScore={75}
                      />
                    </TabsContent>
                    <TabsContent value="code-quality" className="mt-4 space-y-4">
                      <QualityMetric
                        label="Documentation"
                        score={85}
                        description="Good README files and inline comments"
                      />
                      <QualityMetric
                        label="Code Organization"
                        score={90}
                        description="Clean folder structure and modular design"
                      />
                      <QualityMetric
                        label="Testing Coverage"
                        score={65}
                        description="Consider adding more unit tests"
                      />
                      <QualityMetric
                        label="Best Practices"
                        score={88}
                        description="Good use of design patterns"
                      />
                    </TabsContent>
                    <TabsContent value="impact" className="mt-4 space-y-4">
                      <ImpactItem
                        title="Strong Open Source Contributions"
                        description="Your projects have been forked 45 times, indicating community value"
                        type="positive"
                      />
                      <ImpactItem
                        title="Good Documentation"
                        description="85% of your projects have comprehensive README files"
                        type="positive"
                      />
                      <ImpactItem
                        title="Consistent Activity"
                        description="Regular commits over the past 12 months show dedication"
                        type="positive"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Right Column - Recommendations */}
        <div className="space-y-6">
          {hasAnalysis && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="size-5 text-primary" />
                    Strengths to Highlight
                  </CardTitle>
                  <CardDescription>
                    Key points to mention in applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <StrengthItem
                    title="Full-Stack Expertise"
                    description="Demonstrated ability to build complete applications from frontend to backend"
                  />
                  <StrengthItem
                    title="Data Visualization"
                    description="Strong D3.js skills shown in dashboard project"
                  />
                  <StrengthItem
                    title="API Design"
                    description="Clean, well-documented API architecture in multiple projects"
                  />
                  <StrengthItem
                    title="Active Contributor"
                    description="Consistent GitHub activity with 1,234+ contributions"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="size-5 text-primary" />
                    Recommended Improvements
                  </CardTitle>
                  <CardDescription>
                    Suggestions to strengthen your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ImprovementItem
                    priority="high"
                    title="Add Live Demos"
                    description="Deploy your top projects to Vercel or Netlify for easy access"
                  />
                  <ImprovementItem
                    priority="high"
                    title="Increase Test Coverage"
                    description="Add unit tests to boost confidence in code quality"
                  />
                  <ImprovementItem
                    priority="medium"
                    title="Add Case Studies"
                    description="Write detailed READMEs explaining your design decisions"
                  />
                  <ImprovementItem
                    priority="medium"
                    title="Portfolio Website"
                    description="Your portfolio could benefit from a projects section"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="size-5 text-primary" />
                    Featured Projects
                  </CardTitle>
                  <CardDescription>
                    Projects to showcase in applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <FeaturedProject
                    name="awesome-dashboard"
                    reason="Best demonstrates technical skills"
                    link="github.com/johndoe/awesome-dashboard"
                  />
                  <FeaturedProject
                    name="api-toolkit"
                    reason="Shows API design expertise"
                    link="github.com/johndoe/api-toolkit"
                  />
                </CardContent>
              </Card>
            </>
          )}

          {!hasAnalysis && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <FolderGit2 className="size-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No analysis yet
                </p>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  Enter your GitHub username or portfolio URL to get AI insights
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ElementType
}) {
  return (
    <div className="p-4 rounded-lg bg-secondary/30 border border-border text-center">
      <Icon className="size-5 text-primary mx-auto mb-2" />
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function LanguageBar({
  language,
  percentage,
  color,
}: {
  language: string
  percentage: number
  color: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{language}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function ProjectCard({
  name,
  description,
  stars,
  forks,
  language,
  qualityScore,
}: {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  qualityScore: number
}) {
  return (
    <div className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-foreground flex items-center gap-2">
            <FolderGit2 className="size-4 text-primary" />
            {name}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <Badge variant="secondary">{language}</Badge>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="size-4" />
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-4" />
            {forks}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Quality:</span>
          <span className="text-sm font-medium text-primary">{qualityScore}%</span>
        </div>
      </div>
    </div>
  )
}

function QualityMetric({
  label,
  score,
  description,
}: {
  label: string
  score: number
  description: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className={cn(
          "text-sm font-medium",
          score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
        )}>
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-2" />
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function ImpactItem({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: "positive" | "neutral" | "negative"
}) {
  const Icon = type === "positive" ? CheckCircle2 : type === "negative" ? AlertCircle : TrendingUp

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
      <Icon className={cn(
        "size-5 mt-0.5 shrink-0",
        type === "positive" ? "text-success" : type === "negative" ? "text-destructive" : "text-primary"
      )} />
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function StrengthItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
      <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function ImprovementItem({
  priority,
  title,
  description,
}: {
  priority: "high" | "medium" | "low"
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
      <Badge
        variant={priority === "high" ? "destructive" : "secondary"}
        className="mt-0.5 shrink-0"
      >
        {priority}
      </Badge>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function FeaturedProject({
  name,
  reason,
  link,
}: {
  name: string
  reason: string
  link: string
}) {
  return (
    <div className="p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <ExternalLink className="size-4 text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground mt-1">{reason}</p>
    </div>
  )
}
