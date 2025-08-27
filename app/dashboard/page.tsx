"use client";

import { Clock, Crown, FileText, Mail, Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Document {
  id: string;
  type: "cover_letter" | "cold_email";
  title: string;
  content: string;
  jobDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockDocuments: Document[] = [
      {
        id: "1",
        type: "cover_letter",
        title: "Software Engineer - Google",
        content: "Dear Hiring Manager...",
        jobDescription: "We are looking for a skilled Software Engineer...",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        type: "cold_email",
        title: "Product Manager - Meta",
        content: "Subject: Interest in Product Manager Role...",
        jobDescription: "Join our product team...",
        createdAt: new Date("2024-01-14"),
        updatedAt: new Date("2024-01-14"),
      },
    ];

    setDocuments(mockDocuments);
    setIsLoading(false);
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in
          </h1>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Manage your generated documents</p>
          </div>
          <Link href="/">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <FileText className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter((d) => d.type === "cover_letter").length}
                </p>
                <p className="text-gray-600">Cover Letters</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Mail className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter((d) => d.type === "cold_email").length}
                </p>
                <p className="text-gray-600">Cold Emails</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Crown className="w-8 h-8 text-purple-600 mr-4" />
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-gray-600">Credits Left</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              All your generated cover letters and cold emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">No documents yet</p>
                <Link href="/">
                  <Button>Create Your First Document</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {doc.type === "cover_letter" ? (
                        <FileText className="w-8 h-8 text-blue-600" />
                      ) : (
                        <Mail className="w-8 h-8 text-green-600" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {doc.jobDescription.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={
                              doc.type === "cover_letter"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {doc.type === "cover_letter"
                              ? "Cover Letter"
                              : "Cold Email"}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {doc.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
