"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ErrorDetail() {
  const search = useSearchParams();
  const error = search.get("error");
  console.log(error);
  return (
    error && (
      <div className="text-destructive border-l-2 border-destructive px-4 mb-4">
        Having some trouble signin now. Try again later.
      </div>
    )
  );
}

export default function SignInButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <ErrorDetail />
      </Suspense>
      <div className="space-y-4">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full"
          size="lg"
          variant="outline"
        >
          Sign in with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          onClick={() =>
            signIn("credentials", { email, password, callbackUrl: "/" })
          }
          className="w-full"
          size="lg"
        >
          Sign in with Email
        </Button>
      </div>
    </>
  );
}
