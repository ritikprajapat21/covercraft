"use server";

import { auth } from "@/auth";
import {
  generateColdEmail,
  generateCoverLetter,
  refineContent,
} from "@/lib/gemini";

export async function generate(formData: FormData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const type = formData.get("type") as string;
  const jobDescription = formData.get("jobDescription") as string;
  const resumeContent = formData.get("resumeContent") as string;

  if (!type || !jobDescription || !resumeContent) {
    return { error: "Missing required fields" };
  }
  
  const parsedResumeContent = JSON.parse(resumeContent);

  let content: string;
  if (type === "cover_letter") {
    content = await generateCoverLetter(jobDescription, parsedResumeContent);
  } else if (type === "cold_email") {
    content = await generateColdEmail(jobDescription, parsedResumeContent);
  } else {
    return { error: "Invalid type" };
  }

  return { content };
}

export async function refine(formData: FormData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const content = formData.get("content") as string;
  const userRequest = formData.get("userRequest") as string;

  if (!content || !userRequest) {
    return { error: "Missing required fields" };
  }

  const refinedContent = await refineContent(content, userRequest);

  return { content: refinedContent };
}