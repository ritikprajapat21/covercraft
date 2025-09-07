"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

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
        >
          Sign in with Google
        </Button>
      </div>
    </>
  );
}
