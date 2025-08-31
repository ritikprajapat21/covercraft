"use client";
import { Crown, FileText, LoaderCircle, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { ChatInterface } from "./chat-interface";
import { Editor } from "./editor";
import { FileUpload } from "./file-upload";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function Features() {
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
          console.log(response);
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
                className="h-12 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
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
