"use client";

import MDEditor from "@uiw/react-md-editor";
import { Copy, Download, Edit3 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

export function Editor() {
  const {
    generatedContent: content,
    setGeneratedContent: onContentChange,
    user,
  } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    setEditContent(content);
  }, [content]);

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

  const handleDownload = useCallback(async () => {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      alert("Failed to generate PDF");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${user?.name} Cover Letter.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
  }, [user?.name, content]);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-64 bg-background rounded-lg border-2 border-dashed border-gray-300">
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
      <div className="prose dark:prose-invert max-w-none">
        {isEditing ? (
          <MDEditor
            value={editContent}
            className="h-full"
            onChange={(val) => {
              setEditContent(val || "");
            }}
          />
        ) : (
          <MDEditor.Markdown
            source={content}
            className="p-4 border border-gray-600 rounded-md"
          />
        )}
      </div>

      {/* Content Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
        <span>Characters: {content.length}</span>
        <span>
          Words: {content.split(/\s+/).filter((word) => word.length > 0).length}
        </span>
      </div>
    </div>
  );
}
