import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { generateColdEmail, generateCoverLetter } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, jobDescription, resumeContent } = await req.json();

    if (!type || !jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let content: string;
    if (type === "cover_letter") {
      content = await generateCoverLetter(jobDescription, resumeContent);
    } else if (type === "cold_email") {
      content = await generateColdEmail(jobDescription, resumeContent);
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

