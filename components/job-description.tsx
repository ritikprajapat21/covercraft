"use client";
import { FileText, LoaderCircle, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [activeType, setActiveType] = useState<"cover-letter" | "cold-email">(
    "cover-letter",
  );
  const { isGenerating, currentResume } = useAppStore();

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>
          Paste the job description you're applying for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="min-h-[200px] resize-none"
            required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => setActiveType("cover-letter")}
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
              onClick={() => setActiveType("cold-email")}
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
        </form>
      </CardContent>
    </Card>
  );
}
