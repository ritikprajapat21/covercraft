"use client";
import { generate } from "@/lib/actions";
import { useAppStore } from "@/lib/store";
import { FileText, LoaderCircle, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [activeType, setActiveType] = useState<"cover_letter" | "cold_email">(
    "cover_letter",
  );
  const { isGenerating, currentResume, setIsGenerating, setGeneratedContent } =
    useAppStore();

  const handleGenerate = async (type: "cover_letter" | "cold_email") => {
    if (!currentResume) {
      toast.error("Please upload your resume first");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsGenerating(true);
    setActiveType(type);

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("jobDescription", jobDescription);
      formData.append("resumeContent", JSON.stringify(currentResume.content));

      const { content, error } = await generate(formData);

      if (error) {
        throw new Error(error);
      }

      setGeneratedContent(content as string);
      toast.success(
        `${type === "cover_letter" ? "Cover letter" : "Cold email"} generated successfully!`,
      );
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
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
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Button
            onClick={() => handleGenerate("cover_letter")}
            disabled={isGenerating || !currentResume || !jobDescription.trim()}
            className="h-12 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isGenerating && activeType === "cover_letter" ? (
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
            onClick={() => handleGenerate("cold_email")}
            disabled={isGenerating || !currentResume || !jobDescription.trim()}
            variant="outline"
            className="h-12 border-2 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isGenerating && activeType === "cold_email" ? (
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
      </CardContent>
    </Card>
  );
}
