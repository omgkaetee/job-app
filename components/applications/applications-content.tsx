"use client"

import * as React from "react"
import {
  Send,
  Building2,
  Calendar,
  Clock,
  FileText,
  Mail,
  ExternalLink,
  MoreHorizontal,
  X,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  Zap,
  User,
  MessageSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const applications = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    matchScore: 95,
    appliedDate: "Mar 10, 2024",
    method: "Auto",
    status: "Interview",
    resumeVersion: "resume_techcorp_v2.pdf",
    coverLetter: "cover_techcorp.pdf",
    notes: "Tailored resume to highlight microservices experience. Added AWS certifications.",
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    matchScore: 88,
    appliedDate: "Mar 8, 2024",
    method: "Manual",
    status: "Pending",
    resumeVersion: "resume_startup_v1.pdf",
    coverLetter: "cover_startup.pdf",
    notes: "Emphasized startup experience and full-stack capabilities.",
  },
  {
    id: 3,
    title: "Software Engineer III",
    company: "FinanceApp",
    matchScore: 85,
    appliedDate: "Mar 5, 2024",
    method: "Auto",
    status: "Rejected",
    resumeVersion: "resume_finance_v1.pdf",
    coverLetter: "cover_finance.pdf",
    notes: "Added security and compliance experience. May have been missing Fintech-specific keywords.",
  },
  {
    id: 4,
    title: "Lead Frontend Engineer",
    company: "DesignStudio",
    matchScore: 78,
    appliedDate: "Mar 12, 2024",
    method: "Manual",
    status: "Pending",
    resumeVersion: "resume_design_v1.pdf",
    coverLetter: "cover_design.pdf",
    notes: "Highlighted UI/UX collaboration and team leadership.",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudServices Co.",
    matchScore: 82,
    appliedDate: "Mar 14, 2024",
    method: "Auto",
    status: "Offer",
    resumeVersion: "resume_cloud_v1.pdf",
    coverLetter: "cover_cloud.pdf",
    notes: "Strong match on distributed systems. Interview went very well!",
  },
  {
    id: 6,
    title: "Platform Engineer",
    company: "DevOps Inc.",
    matchScore: 80,
    appliedDate: "Mar 1, 2024",
    method: "Auto",
    status: "Interview",
    resumeVersion: "resume_devops_v1.pdf",
    coverLetter: "cover_devops.pdf",
    notes: "Emphasized CI/CD and infrastructure experience.",
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  Pending: { bg: "bg-muted", text: "text-muted-foreground", icon: Hourglass },
  Interview: { bg: "bg-primary/10", text: "text-primary", icon: MessageSquare },
  Rejected: { bg: "bg-destructive/10", text: "text-destructive", icon: X },
  Offer: { bg: "bg-success/10", text: "text-success", icon: CheckCircle2 },
}

export function ApplicationsContent() {
  const [selectedApplication, setSelectedApplication] = React.useState<typeof applications[0] | null>(null)

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "Pending").length,
    interview: applications.filter((a) => a.status === "Interview").length,
    offer: applications.filter((a) => a.status === "Offer").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <StatsCard label="Total" value={stats.total} icon={Send} />
        <StatsCard label="Pending" value={stats.pending} icon={Hourglass} color="muted" />
        <StatsCard label="Interview" value={stats.interview} icon={MessageSquare} color="primary" />
        <StatsCard label="Offer" value={stats.offer} icon={CheckCircle2} color="success" />
        <StatsCard label="Rejected" value={stats.rejected} icon={X} color="destructive" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="auto">Auto-Apply</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="match">Best Match</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-center">Match</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="cursor-pointer hover:bg-secondary/30" onClick={() => setSelectedApplication(app)}>
                  <TableCell className="font-medium">{app.title}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Building2 className="size-4 text-muted-foreground" />
                      {app.company}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium text-primary">{app.matchScore}%</span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      {app.appliedDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={app.method === "Auto" ? "default" : "secondary"} className="gap-1">
                      {app.method === "Auto" ? <Zap className="size-3" /> : <User className="size-3" />}
                      {app.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedApplication(app)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="size-4 mr-2" />
                          View Job Posting
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Withdraw Application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Detail Sheet */}
      <Sheet open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        {selectedApplication && (
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedApplication.title}</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                <Building2 className="size-4" />
                {selectedApplication.company}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={selectedApplication.status} />
              </div>

              {/* Match Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Match Score</span>
                <span className="text-lg font-bold text-primary">{selectedApplication.matchScore}%</span>
              </div>

              {/* Applied Date */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Applied</span>
                <span className="text-sm text-foreground">{selectedApplication.appliedDate}</span>
              </div>

              {/* Method */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Method</span>
                <Badge variant={selectedApplication.method === "Auto" ? "default" : "secondary"} className="gap-1">
                  {selectedApplication.method === "Auto" ? <Zap className="size-3" /> : <User className="size-3" />}
                  {selectedApplication.method}
                </Badge>
              </div>

              {/* Documents */}
              <div className="space-y-3">
                <span className="text-sm font-medium text-foreground">Documents Used</span>
                <div className="space-y-2">
                  <DocumentItem
                    icon={FileText}
                    label="Resume Version"
                    value={selectedApplication.resumeVersion}
                  />
                  <DocumentItem
                    icon={Mail}
                    label="Cover Letter"
                    value={selectedApplication.coverLetter}
                  />
                </div>
              </div>

              {/* AI Notes */}
              <div className="space-y-3">
                <span className="text-sm font-medium text-foreground">AI Notes</span>
                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm text-muted-foreground">{selectedApplication.notes}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="size-4" />
                  View Job Posting
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="size-4" />
                  Download Resume
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="size-4" />
                  Download Cover Letter
                </Button>
                <Button variant="destructive" className="w-full">
                  Withdraw Application
                </Button>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}

function StatsCard({
  label,
  value,
  icon: Icon,
  color = "primary",
}: {
  label: string
  value: number
  icon: React.ElementType
  color?: "primary" | "success" | "destructive" | "muted"
}) {
  const colors = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-muted-foreground",
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn("flex size-10 items-center justify-center rounded-lg", colors[color])}>
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = statusColors[status] || statusColors.Pending
  const Icon = config.icon

  return (
    <Badge variant="secondary" className={cn("gap-1", config.bg, config.text)}>
      <Icon className="size-3" />
      {status}
    </Badge>
  )
}

function DocumentItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm text-foreground">{value}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="size-8">
        <ExternalLink className="size-4" />
      </Button>
    </div>
  )
}
