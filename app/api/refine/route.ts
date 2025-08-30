import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { refineContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, userRequest } = await req.json();

    if (!content || !userRequest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const refinedContent = await refineContent(content, userRequest);

    return NextResponse.json({ content: refinedContent });
  } catch (error) {
    console.error("Refinement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
