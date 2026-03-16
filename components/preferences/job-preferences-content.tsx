"use client"

import * as React from "react"
import {
  Settings2,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Laptop,
  FileText,
  Zap,
  Save,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function JobPreferencesContent() {
  const [roles, setRoles] = React.useState(["Software Engineer", "Full-Stack Developer"])
  const [industries, setIndustries] = React.useState(["Technology", "Fintech"])
  const [salaryRange, setSalaryRange] = React.useState([120000, 180000])
  const [newRole, setNewRole] = React.useState("")
  const [newIndustry, setNewIndustry] = React.useState("")

  const addRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole])
      setNewRole("")
    }
  }

  const removeRole = (role: string) => {
    setRoles(roles.filter((r) => r !== role))
  }

  const addIndustry = () => {
    if (newIndustry && !industries.includes(newIndustry)) {
      setIndustries([...industries, newIndustry])
      setNewIndustry("")
    }
  }

  const removeIndustry = (industry: string) => {
    setIndustries(industries.filter((i) => i !== industry))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">Job Preferences</h1>
          <p className="text-muted-foreground">
            Configure your ideal job criteria for better matches
          </p>
        </div>
        <Button className="gap-2">
          <Save className="size-4" />
          Save Preferences
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Desired Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="size-5 text-primary" />
                Desired Roles
              </CardTitle>
              <CardDescription>
                Add the job titles you are interested in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge key={role} variant="secondary" className="gap-1 px-3 py-1.5">
                    {role}
                    <button
                      onClick={() => removeRole(role)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a role..."
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addRole()}
                />
                <Button variant="outline" onClick={addRole}>
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seniority & Industries */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5 text-primary" />
                  Seniority Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Entry Level", "Mid-Level", "Senior", "Lead", "Principal", "Director"].map((level) => (
                  <div key={level} className="flex items-center gap-3">
                    <Checkbox
                      id={level}
                      defaultChecked={level === "Mid-Level" || level === "Senior"}
                    />
                    <Label htmlFor={level} className="text-sm cursor-pointer">
                      {level}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="size-5 text-primary" />
                  Industries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="gap-1 px-3 py-1.5">
                      {industry}
                      <button
                        onClick={() => removeIndustry(industry)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add industry..."
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addIndustry()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" onClick={addIndustry}>
                    <Plus className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                Location Preferences
              </CardTitle>
              <CardDescription>
                Set your preferred work locations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Work Type</Label>
                  <Select defaultValue="hybrid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote Only</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Location</Label>
                  <Input placeholder="e.g., San Francisco, CA" defaultValue="San Francisco, CA" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                <Checkbox id="relocate" />
                <Label htmlFor="relocate" className="text-sm cursor-pointer">
                  Open to relocation for the right opportunity
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Salary Range */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5 text-primary" />
                Salary Range
              </CardTitle>
              <CardDescription>
                Set your expected compensation range (USD)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">
                    ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">per year</span>
                </div>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  min={50000}
                  max={300000}
                  step={5000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$50K</span>
                  <span>$300K+</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                <Checkbox id="negotiate" defaultChecked />
                <Label htmlFor="negotiate" className="text-sm cursor-pointer">
                  Open to negotiation for the right role
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Company Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Laptop className="size-5 text-primary" />
                Company Preferences
              </CardTitle>
              <CardDescription>
                What type of company culture fits you best
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-50)</SelectItem>
                      <SelectItem value="small">Small (51-200)</SelectItem>
                      <SelectItem value="medium">Medium (201-1000)</SelectItem>
                      <SelectItem value="large">Large (1000+)</SelectItem>
                      <SelectItem value="any">Any Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Work Style</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Fast-paced Startup</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Important Benefits</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    "Health Insurance",
                    "401(k) Match",
                    "Stock Options",
                    "Flexible Hours",
                    "Learning Budget",
                    "Parental Leave",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <Checkbox
                        id={benefit}
                        defaultChecked={
                          benefit === "Health Insurance" ||
                          benefit === "Flexible Hours" ||
                          benefit === "Stock Options"
                        }
                      />
                      <Label htmlFor={benefit} className="text-sm cursor-pointer">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Automation & Summary */}
        <div className="space-y-6">
          {/* Automation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="size-5 text-primary" />
                Automation Settings
              </CardTitle>
              <CardDescription>
                Configure AI-powered features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AutomationToggle
                title="Tailor Resume Automatically"
                description="AI adjusts your resume for each job"
                defaultChecked={true}
              />
              <AutomationToggle
                title="Allow Auto-Apply"
                description="Let AI apply to matching jobs"
                defaultChecked={false}
              />
              <AutomationToggle
                title="Email Notifications"
                description="Get notified about new matches"
                defaultChecked={true}
              />
              <AutomationToggle
                title="Weekly Summary"
                description="Receive weekly job market insights"
                defaultChecked={true}
              />
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                Preferences Summary
              </CardTitle>
              <CardDescription>
                Overview of your job criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SummaryItem
                icon={Briefcase}
                label="Roles"
                value={roles.join(", ")}
              />
              <SummaryItem
                icon={Users}
                label="Seniority"
                value="Mid-Level to Senior"
              />
              <SummaryItem
                icon={Building2}
                label="Industries"
                value={industries.join(", ")}
              />
              <SummaryItem
                icon={MapPin}
                label="Location"
                value="Remote / San Francisco, CA"
              />
              <SummaryItem
                icon={DollarSign}
                label="Salary"
                value={`$${(salaryRange[0] / 1000).toFixed(0)}K - $${(salaryRange[1] / 1000).toFixed(0)}K`}
              />
              <SummaryItem
                icon={Laptop}
                label="Company"
                value="Any Size, Any Style"
              />

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-success" />
                  <span className="text-foreground">23 jobs match your criteria</span>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Save className="size-4" />
                Save All Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AutomationToggle({
  title,
  description,
  defaultChecked,
}: {
  title: string
  description: string
  defaultChecked: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}
