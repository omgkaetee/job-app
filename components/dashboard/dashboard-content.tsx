"use client"

import {
  FileText,
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Building2,
  MapPin,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI Career Assistant</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Refine your resume, strengthen your application
          </h1>
          <p className="text-muted-foreground max-w-2xl text-balance leading-relaxed">
            Let AI analyze your resume, match you with the perfect jobs, and increase your chances of landing interviews. Start by uploading your resume or setting your job preferences.
          </p>
          <div className="flex gap-3 mt-6">
            <Button className="gap-2">
              <FileText className="size-4" />
              Upload Resume
            </Button>
            <Button variant="outline" className="gap-2">
              <Target className="size-4" />
              Set Preferences
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 -z-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </svg>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Resume Score"
          value="78"
          suffix="/100"
          description="Above average"
          icon={FileText}
          trend="+5 from last update"
        />
        <StatsCard
          title="Job Matches"
          value="23"
          description="Based on your preferences"
          icon={Target}
          trend="12 new this week"
        />
        <StatsCard
          title="Applications"
          value="8"
          description="Active applications"
          icon={Zap}
          trend="3 pending review"
        />
        <StatsCard
          title="Interview Rate"
          value="37"
          suffix="%"
          description="Above industry average"
          icon={TrendingUp}
          trend="+8% improvement"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Resume Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Resume Status
            </CardTitle>
            <CardDescription>Your current resume analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">resume_john_doe_2024.pdf</span>
              <Badge variant="secondary">Uploaded</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Quality Score</span>
                <span className="font-medium text-primary">78/100</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Strong technical skills</p>
                  <p className="text-xs text-muted-foreground">Well-documented programming experience</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Clear work history</p>
                  <p className="text-xs text-muted-foreground">Chronological and well-structured</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="size-4 text-warning mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Missing keywords</p>
                  <p className="text-xs text-muted-foreground">Add more industry-specific terms</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2">
              View Full Analysis
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-5 text-primary" />
              Job Preferences
            </CardTitle>
            <CardDescription>Your target job criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <PreferenceItem label="Target Roles" value="Software Engineer, Full-Stack Developer" />
              <PreferenceItem label="Industries" value="Technology, Fintech" />
              <PreferenceItem label="Seniority" value="Mid-Level to Senior" />
              <PreferenceItem label="Location" value="Remote / San Francisco, CA" />
              <PreferenceItem label="Salary Range" value="$120,000 - $180,000" />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-Apply</p>
                <p className="text-xs text-muted-foreground">Let AI apply to matching jobs</p>
              </div>
              <Switch />
            </div>

            <Button variant="outline" className="w-full gap-2">
              Edit Preferences
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Auto-Apply Status */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5 text-primary" />
              Auto-Apply Status
            </CardTitle>
            <CardDescription>Automated application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-Apply</p>
                  <p className="text-xs text-muted-foreground">Currently disabled</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applications this week</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending queue</span>
                <span className="font-medium">5 jobs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Match threshold</span>
                <span className="font-medium">85%+</span>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2">
              Configure Auto-Apply
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Improvements and Job Matches */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Recommended Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Top Recommended Improvements
            </CardTitle>
            <CardDescription>AI-generated suggestions to boost your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ImprovementItem
                priority="high"
                title="Add quantifiable achievements"
                description="Include metrics like 'increased performance by 40%' to demonstrate impact"
              />
              <ImprovementItem
                priority="high"
                title="Optimize for ATS keywords"
                description="Add terms like 'CI/CD', 'Agile', and 'microservices' based on target roles"
              />
              <ImprovementItem
                priority="medium"
                title="Strengthen your summary"
                description="Create a compelling professional summary highlighting your unique value"
              />
              <ImprovementItem
                priority="medium"
                title="Update your skills section"
                description="Reorganize skills by relevance to your target positions"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Job Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5 text-primary" />
                Recent Job Matches
              </CardTitle>
              <CardDescription>Jobs matching your preferences</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="size-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <JobMatchItem
                title="Senior Software Engineer"
                company="TechCorp Inc."
                location="Remote"
                salary="$150K - $180K"
                matchScore={95}
              />
              <JobMatchItem
                title="Full-Stack Developer"
                company="StartupXYZ"
                location="San Francisco, CA"
                salary="$130K - $160K"
                matchScore={88}
              />
              <JobMatchItem
                title="Software Engineer III"
                company="FinanceApp"
                location="Remote"
                salary="$140K - $170K"
                matchScore={85}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  suffix = "",
  description,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  suffix?: string
  description: string
  icon: React.ElementType
  trend: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
          </div>
          <p className="text-sm font-medium text-foreground mt-1">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <p className="text-xs text-primary mt-3">{trend}</p>
      </CardContent>
    </Card>
  )
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
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

function JobMatchItem({
  title,
  company,
  location,
  salary,
  matchScore,
}: {
  title: string
  company: string
  location: string
  salary: string
  matchScore: number
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors cursor-pointer">
      <div className="space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Building2 className="size-3" />
            {company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="size-3" />
            {salary}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{matchScore}%</p>
          <p className="text-xs text-muted-foreground">Match</p>
        </div>
      </div>
    </div>
  )
}
