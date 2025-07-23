import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Sign In</h1>
        <SignIn
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90',
              footerActionLink: 'text-primary hover:text-primary/90',
            },
          }}
        />
      </div>
    </div>
  );
}
