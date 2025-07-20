'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { extractTextFromFile } from '@/lib/file-utils';
import { toast } from 'sonner';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FileUpload() {
  const { currentResume, setCurrentResume } = useAppStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const content = await extractTextFromFile(file);
      
      const resume = {
        id: Date.now().toString(),
        filename: file.name,
        content,
        uploadedAt: new Date(),
      };

      setCurrentResume(resume);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload resume';
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [setCurrentResume]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeResume = () => {
    setCurrentResume(null);
    setUploadError(null);
    toast.success('Resume removed');
  };

  if (currentResume) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">{currentResume.filename}</p>
              <p className="text-sm text-green-700">
                Uploaded {currentResume.uploadedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeResume}
            className="text-green-700 hover:text-green-900 hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Resume Preview:</p>
          <p className="text-sm text-gray-800 line-clamp-3">
            {currentResume.content.substring(0, 200)}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {isUploading ? (
            <>
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Processing your resume...</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-sm text-gray-600">
                  Drag & drop or click to select • PDF or DOCX • Max 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{uploadError}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Supported formats: PDF, DOCX</p>
        <p>• Your resume data is processed locally and securely</p>
        <p>• We extract text content to personalize your cover letters</p>
      </div>
    </div>
  );
}