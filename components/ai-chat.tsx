"use client";

import { Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ChatInterface } from "./chat-interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function AIChat() {
  const { generatedContent, setGeneratedContent } = useAppStore();

  return (
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
  );
}
