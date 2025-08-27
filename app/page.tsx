"use client";

import {
  Crown,
  FileText,
  LoaderCircle,
  Mail,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ChatInterface } from "@/components/chat-interface";
import { Editor } from "@/components/editor";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";

// FIX: Convert following page in parts so that it rendered correctly if user is signed in.
export default function HomePage() {
  const { data: session } = useSession();
  const { currentResume, isGenerating, setIsGenerating } = useAppStore();
  const [jobDescription, setJobDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [activeType, setActiveType] = useState<"cover-letter" | "cold-email">(
    "cover-letter",
  );

  const handleGenerate = useCallback(
    async (type: "cover-letter" | "cold-email") => {
      if (!currentResume) {
        toast.error("Please upload your resume first");
        return;
      }

      if (!jobDescription.trim()) {
        toast.error("Please enter a job description");
        return;
      }

      if (!session) {
        toast.error("Please sign in to generate content");
        return;
      }

      setIsGenerating(true);
      setActiveType(type);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type === "cover-letter" ? "cover_letter" : "cold_email",
            jobDescription,
            resumeContent: currentResume.content,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate content");
        }

        const data = await response.json();
        setGeneratedContent(data.content);
        toast.success(
          `${type === "cover-letter" ? "Cover letter" : "Cold email"} generated successfully!`,
        );
      } catch (error) {
        toast.error("Failed to generate content. Please try again.");
        console.error("Generation error:", error);
      } finally {
        setIsGenerating(false);
      }
    },
    [currentResume, jobDescription, session, setIsGenerating],
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse" />
                  <FileText className="relative w-20 h-20 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  CoverCraft AI
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Generate personalized cover letters and cold emails with AI.
                Upload your resume, paste a job description, and let AI create
                professional content that gets you noticed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-2 hover:bg-gray-50 transition-all duration-200"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • 5 free generations • Sign up with
                Google
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose CoverCraft AI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Powered by advanced AI to help you land your dream job
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate professional cover letters and cold emails in
                  seconds, not hours.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Highly Personalized
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI analyzes your resume and the job description to create
                  tailored content.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Trusted by Thousands
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of job seekers who have landed interviews with
                  our AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
              Join thousands of successful job seekers using AI to get noticed
              by employers.
            </p>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 hover:bg-gray-50 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Crown className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Cover Letters & Cold Emails
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume, paste a job description, and let AI create
            personalized, professional content that gets you noticed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume to extract your experience and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload />
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Paste the job description you're applying for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] resize-none"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => handleGenerate("cover-letter")}
                disabled={
                  isGenerating || !currentResume || !jobDescription.trim()
                }
                className="h-12 bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isGenerating && activeType === "cover-letter" ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleGenerate("cold-email")}
                disabled={
                  isGenerating || !currentResume || !jobDescription.trim()
                }
                variant="outline"
                className="h-12 border-2 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isGenerating && activeType === "cold-email" ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Generate Cold Email
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your personalized cover letter or cold email will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Editor
                  content={generatedContent}
                  onContentChange={setGeneratedContent}
                />
              </CardContent>
            </Card>

            {generatedContent && (
              <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI Chat - Refine Your Content
                  </CardTitle>
                  <CardDescription>
                    Ask AI to modify your content based on specific requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatInterface
                    currentContent={generatedContent}
                    onContentRefine={setGeneratedContent}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Premium Features Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="text-center">
            <Crown className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Premium Features</h3>
            <p className="text-lg mb-6 opacity-90">
              Send emails directly from Gmail, download PDFs, and get unlimited
              generations
            </p>
            <Link href="/pricing">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white dark:bg-gray-100 text-purple-600 dark:text-purple-700 hover:bg-gray-50 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
