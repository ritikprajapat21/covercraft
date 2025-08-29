"use client";

import { Copy, Download, Edit3 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function Editor({ content, onContentChange }: EditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied to clipboard!");
    } catch (_error) {
      toast.error("Failed to copy content");
    }
  }, [content]);

  const handleSave = useCallback(() => {
    onContentChange(editContent);
    setIsEditing(false);
    toast.success("Content updated!");
  }, [editContent, onContentChange]);

  const handleCancel = useCallback(() => {
    setEditContent(content);
    setIsEditing(false);
  }, [content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded!");
  }, [content]);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-background rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <Edit3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-foreground font-medium">
            No content generated yet
          </p>
          <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">
            Upload your resume and job description to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {!isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              Save Changes
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>

      {/* Content Display/Editor */}
      {isEditing ? (
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="min-h-[400px] font-mono text-sm resize-none"
          placeholder="Edit your content here..."
        />
      ) : (
        <div className="bg-white border rounded-lg p-6 min-h-[400px]">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {content}
            </pre>
          </div>
        </div>
      )}

      {/* Content Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
        <span>Characters: {content.length}</span>
        <span>
          Words: {content.split(/\s+/).filter((word) => word.length > 0).length}
        </span>
        <span>Lines: {content.split("\n").length}</span>
      </div>
    </div>
  );
}
