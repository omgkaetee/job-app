"use client"

import * as React from "react"
import {
  Settings,
  User,
  Bell,
  Zap,
  FileText,
  Moon,
  Sun,
  Shield,
  Mail,
  Smartphone,
  LogOut,
  Trash2,
  Download,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsContent() {
  const [theme, setTheme] = React.useState<"dark" | "light" | "system">("dark")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="profile" className="gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="size-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="auto-apply" className="gap-2">
            <Zap className="size-4" />
            <span className="hidden sm:inline">Auto-Apply</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="size-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Moon className="size-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="size-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline">Professional Headline</Label>
                <Input id="headline" defaultValue="Senior Software Engineer | Full-Stack Developer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>

              <Button className="gap-2">
                <Check className="size-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="size-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Export Data</p>
                  <p className="text-xs text-muted-foreground">Download all your data</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="size-4" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50">
                <div>
                  <p className="text-sm font-medium text-foreground">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
                <NotificationToggle
                  icon={Mail}
                  title="Job Matches"
                  description="New jobs that match your preferences"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Mail}
                  title="Application Updates"
                  description="Status changes on your applications"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Mail}
                  title="Weekly Summary"
                  description="Weekly overview of your job search"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Mail}
                  title="Tips & Recommendations"
                  description="AI-powered suggestions to improve your profile"
                  defaultChecked={false}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Push Notifications</h4>
                <NotificationToggle
                  icon={Smartphone}
                  title="Interview Reminders"
                  description="Get reminded about upcoming interviews"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Smartphone}
                  title="High-Match Jobs"
                  description="Immediate alerts for 90%+ match jobs"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Smartphone}
                  title="Auto-Apply Results"
                  description="Notifications when AI applies on your behalf"
                  defaultChecked={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto-Apply Settings */}
        <TabsContent value="auto-apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="size-5 text-primary" />
                Auto-Apply Settings
              </CardTitle>
              <CardDescription>
                Configure how AI applies to jobs on your behalf
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Enable Auto-Apply</p>
                    <p className="text-xs text-muted-foreground">Let AI apply to matching jobs automatically</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Match Score</Label>
                  <Select defaultValue="85">
                    <SelectTrigger>
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="95">95% and above</SelectItem>
                      <SelectItem value="90">90% and above</SelectItem>
                      <SelectItem value="85">85% and above</SelectItem>
                      <SelectItem value="80">80% and above</SelectItem>
                      <SelectItem value="75">75% and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Daily Application Limit</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 applications per day</SelectItem>
                      <SelectItem value="5">5 applications per day</SelectItem>
                      <SelectItem value="10">10 applications per day</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resume Tailoring</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-tailor for each job</SelectItem>
                      <SelectItem value="manual">Use default resume</SelectItem>
                      <SelectItem value="ask">Ask before each application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Exclusions</h4>
                <NotificationToggle
                  icon={Zap}
                  title="Skip Companies I've Applied To"
                  description="Don't auto-apply if I've already applied"
                  defaultChecked={true}
                />
                <NotificationToggle
                  icon={Zap}
                  title="Skip Saved Jobs"
                  description="Don't auto-apply to jobs I've saved for later"
                  defaultChecked={false}
                />
                <NotificationToggle
                  icon={Zap}
                  title="Require Review for Large Companies"
                  description="Ask before applying to companies with 1000+ employees"
                  defaultChecked={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                Resume Templates
              </CardTitle>
              <CardDescription>
                Manage your resume versions and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TemplateItem
                name="Primary Resume"
                description="Your main resume template"
                isDefault={true}
                lastUpdated="2 days ago"
              />
              <TemplateItem
                name="Technical Focus"
                description="Emphasizes technical skills and projects"
                isDefault={false}
                lastUpdated="1 week ago"
              />
              <TemplateItem
                name="Leadership Focus"
                description="Highlights leadership and management experience"
                isDefault={false}
                lastUpdated="2 weeks ago"
              />
              <Button variant="outline" className="w-full">
                Upload New Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                Cover Letter Templates
              </CardTitle>
              <CardDescription>
                Manage your cover letter templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TemplateItem
                name="General Template"
                description="Versatile template for most applications"
                isDefault={true}
                lastUpdated="1 week ago"
              />
              <TemplateItem
                name="Startup Template"
                description="Enthusiastic tone for startup roles"
                isDefault={false}
                lastUpdated="2 weeks ago"
              />
              <Button variant="outline" className="w-full">
                Create New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="size-5 text-primary" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <ThemeOption
                    value="light"
                    label="Light"
                    icon={Sun}
                    selected={theme === "light"}
                    onSelect={() => setTheme("light")}
                  />
                  <ThemeOption
                    value="dark"
                    label="Dark"
                    icon={Moon}
                    selected={theme === "dark"}
                    onSelect={() => setTheme("dark")}
                  />
                  <ThemeOption
                    value="system"
                    label="System"
                    icon={Settings}
                    selected={theme === "system"}
                    onSelect={() => setTheme("system")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationToggle({
  icon: Icon,
  title,
  description,
  defaultChecked,
}: {
  icon: React.ElementType
  title: string
  description: string
  defaultChecked: boolean
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
      <div className="flex items-center gap-3">
        <Icon className="size-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function TemplateItem({
  name,
  description,
  isDefault,
  lastUpdated,
}: {
  name: string
  description: string
  isDefault: boolean
  lastUpdated: string
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border">
      <div className="flex items-center gap-3">
        <FileText className="size-5 text-primary" />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">{name}</p>
            {isDefault && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Default</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground mt-1">Updated {lastUpdated}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">Edit</Button>
    </div>
  )
}

function ThemeOption({
  value,
  label,
  icon: Icon,
  selected,
  onSelect,
}: {
  value: string
  label: string
  icon: React.ElementType
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors",
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
    >
      <Icon className={cn("size-6", selected ? "text-primary" : "text-muted-foreground")} />
      <span className={cn("text-sm", selected ? "font-medium text-foreground" : "text-muted-foreground")}>
        {label}
      </span>
    </button>
  )
}
