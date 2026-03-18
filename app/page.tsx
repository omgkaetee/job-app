"use client"

import { useAuth } from "@clerk/nextjs"
import { AppShell } from "@/components/app-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

function SignedOutContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Welcome to CareerAI
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        AI-powered tools to perfect your resume, cover letters, and portfolio for your job search.
      </p>
      <SignInButton mode="modal">
        <Button size="lg" className="gap-2">
          Get Started
        </Button>
      </SignInButton>
    </div>
  )
}

export default function Home() {
  const { isLoaded, userId } = useAuth()

  if (!isLoaded) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      {!userId ? (
        <SignedOutContent />
      ) : (
        <DashboardContent />
      )}
    </AppShell>
  )
}
