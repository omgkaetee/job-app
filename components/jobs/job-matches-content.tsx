"use client"

import * as React from "react"
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$150K - $180K",
    matchScore: 95,
    posted: "2 days ago",
    type: "Full-time",
    size: "1000+ employees",
    description: "We're looking for a Senior Software Engineer to join our growing engineering team. You'll be working on our core platform, building scalable systems that serve millions of users.",
    requirements: [
      "5+ years of software engineering experience",
      "Proficiency in TypeScript and React",
      "Experience with cloud platforms (AWS, GCP)",
      "Strong system design skills",
    ],
    whyMatch: [
      "Your TypeScript experience aligns perfectly",
      "Your leadership experience matches their team needs",
      "Remote work matches your preferences",
      "Salary range fits your expectations",
    ],
    resumeAdjustments: [
      "Highlight your microservices experience",
      "Add specific metrics from your TechCorp role",
      "Include AWS certifications if any",
    ],
    saved: false,
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    salary: "$130K - $160K",
    matchScore: 88,
    posted: "1 week ago",
    type: "Full-time",
    size: "51-200 employees",
    description: "Join our fast-paced startup as a Full-Stack Developer. You'll be responsible for building features across our entire stack, from frontend to backend.",
    requirements: [
      "3+ years of full-stack development",
      "Experience with React and Node.js",
      "Database design experience",
      "Startup mindset",
    ],
    whyMatch: [
      "Full-stack skills match their requirements",
      "Your startup experience is valuable",
      "Location matches your preferences",
    ],
    resumeAdjustments: [
      "Emphasize end-to-end project ownership",
      "Highlight your adaptability",
    ],
    saved: true,
  },
  {
    id: 3,
    title: "Software Engineer III",
    company: "FinanceApp",
    location: "Remote",
    salary: "$140K - $170K",
    matchScore: 85,
    posted: "3 days ago",
    type: "Full-time",
    size: "201-1000 employees",
    description: "FinanceApp is seeking a Software Engineer III to help build the next generation of financial tools. You'll work on critical systems handling financial transactions.",
    requirements: [
      "4+ years of backend development",
      "Experience with financial systems",
      "Security-minded development",
      "Python or Node.js proficiency",
    ],
    whyMatch: [
      "Your Python skills are a strong match",
      "Security experience from previous roles",
      "Remote work available",
    ],
    resumeAdjustments: [
      "Add any compliance or security experience",
      "Highlight data handling expertise",
    ],
    saved: false,
  },
  {
    id: 4,
    title: "Lead Frontend Engineer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$160K - $190K",
    matchScore: 78,
    posted: "5 days ago",
    type: "Full-time",
    size: "51-200 employees",
    description: "Lead our frontend engineering team in building beautiful, performant user interfaces. You'll mentor junior developers and drive technical decisions.",
    requirements: [
      "6+ years of frontend development",
      "Team leadership experience",
      "Strong design sensibility",
      "React/Vue expertise",
    ],
    whyMatch: [
      "Your React expertise is a strong match",
      "Leadership experience aligns",
      "Salary exceeds your range",
    ],
    resumeAdjustments: [
      "Emphasize team mentorship",
      "Add UI/UX collaboration examples",
    ],
    saved: false,
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudServices Co.",
    location: "Remote",
    salary: "$135K - $165K",
    matchScore: 82,
    posted: "1 day ago",
    type: "Full-time",
    size: "1000+ employees",
    description: "Build and maintain cloud infrastructure services. You'll work on distributed systems serving enterprise clients.",
    requirements: [
      "4+ years of backend development",
      "Experience with distributed systems",
      "Cloud platform expertise",
      "Go or Rust experience preferred",
    ],
    whyMatch: [
      "Cloud experience matches well",
      "Distributed systems knowledge",
      "Remote position available",
    ],
    resumeAdjustments: [
      "Highlight scalability achievements",
      "Add cloud certifications",
    ],
    saved: true,
  },
]

export function JobMatchesContent() {
  const [selectedJob, setSelectedJob] = React.useState<typeof jobs[0] | null>(null)
  const [savedJobs, setSavedJobs] = React.useState<number[]>([2, 5])
  const [searchQuery, setSearchQuery] = React.useState("")

  const toggleSave = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Job Matches</h1>
        <p className="text-muted-foreground">
          Jobs that match your profile and preferences
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or companies..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Salary</SelectItem>
                  <SelectItem value="100">$100K+</SelectItem>
                  <SelectItem value="150">$150K+</SelectItem>
                  <SelectItem value="200">$200K+</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="90">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Match Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Match</SelectItem>
                  <SelectItem value="90">90%+ Match</SelectItem>
                  <SelectItem value="80">80%+ Match</SelectItem>
                  <SelectItem value="70">70%+ Match</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background">
                <span className="text-sm text-muted-foreground">Remote</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
        </p>
        <Select defaultValue="match">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best Match</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="salary">Highest Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            onToggleSave={() => toggleSave(job.id)}
            onViewDetails={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* Job Detail Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        {selectedJob && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-1">
                    <Building2 className="size-4" />
                    {selectedJob.company}
                  </DialogDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-primary">{selectedJob.matchScore}%</span>
                    <span className="text-sm text-muted-foreground">Match</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Job Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-4" />
                  {selectedJob.salary}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-4" />
                  {selectedJob.size}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {selectedJob.posted}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-foreground mb-2">About the Role</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-medium text-foreground mb-2">Requirements</h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why This Matches */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  Why This Job Matches You
                </h4>
                <ul className="space-y-2">
                  {selectedJob.whyMatch.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resume Adjustments */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  Recommended Resume Adjustments
                </h4>
                <ul className="space-y-2">
                  {selectedJob.resumeAdjustments.map((adj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="size-4 text-primary mt-0.5 shrink-0" />
                      {adj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => toggleSave(selectedJob.id)}
                >
                  {savedJobs.includes(selectedJob.id) ? (
                    <>
                      <BookmarkCheck className="size-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="size-4" />
                      Save
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ExternalLink className="size-4" />
                  Apply Manually
                </Button>
                <Button className="flex-1 gap-2">
                  <Zap className="size-4" />
                  Let AI Apply
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

function JobCard({
  job,
  isSaved,
  onToggleSave,
  onViewDetails,
}: {
  job: typeof jobs[0]
  isSaved: boolean
  onToggleSave: () => void
  onViewDetails: () => void
}) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Building2 className="size-4" />
                  {job.company}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={onToggleSave}
                >
                  {isSaved ? (
                    <BookmarkCheck className="size-4 text-primary" />
                  ) : (
                    <Bookmark className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="size-4" />
                {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {job.posted}
              </span>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-primary">{job.matchScore}%</span>
                  <span className="text-sm text-muted-foreground">Match</span>
                </div>
                <Badge variant="secondary" className="ml-2">{job.type}</Badge>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={onViewDetails}>
                View Details
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
