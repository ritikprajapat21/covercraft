"use client";

import { FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { BuiltInProviderType } from "next-auth/providers/index";
import {
  type ClientSafeProvider,
  getProviders,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const search = useSearchParams();
  const error = search.get("error");

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="max-w-md space-y-8 p-8">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to CoverCraft
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Create personalized cover letters and cold emails with AI
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-destructive border-l-2 border-destructive px-4 mb-4">
                Having some trouble signin now. Try again later.
              </div>
            )}
            {providers && (
              <div className="space-y-4">
                {Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className="w-full"
                    size="lg"
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
