import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <SignIn 
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              maxWidth: "400px",
            },
          },
        }}
      />
    </div>
  );
}
