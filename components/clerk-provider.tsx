"use client";

import { ClerkProvider as ClerkProviderComponent } from "@clerk/nextjs";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProviderComponent
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {children}
    </ClerkProviderComponent>
  );
}
