import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "./SignInButton";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

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
            <SignInButton />
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
