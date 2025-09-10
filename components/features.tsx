import { FileText } from "lucide-react";
import AIChat from "./ai-chat";
import { Editor } from "./editor";
import { FileUpload } from "./file-upload";
import JobDescription from "./job-description";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Features() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Cover Letters & Cold Emails
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume, paste a job description, and let AI create
            personalized, professional content that gets you noticed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume to extract your experience and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload />
              </CardContent>
            </Card>

            <JobDescription />
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  Your personalized cover letter or cold email will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Editor />
              </CardContent>
            </Card>

            <AIChat />
          </div>
        </div>

        {/* Premium Features Banner */}
        {/* <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-2xl p-8 text-white shadow-xl"> */}
        {/*   <div className="text-center"> */}
        {/*     <Crown className="w-12 h-12 mx-auto mb-4" /> */}
        {/*     <h3 className="text-2xl font-bold mb-2">Unlock Premium Features</h3> */}
        {/*     <p className="text-lg mb-6 opacity-90"> */}
        {/*       Send emails directly from Gmail, download PDFs, and get unlimited */}
        {/*       generations */}
        {/*     </p> */}
        {/*     <Link href="/pricing"> */}
        {/*       <Button */}
        {/*         variant="secondary" */}
        {/*         size="lg" */}
        {/*         className="bg-white dark:bg-gray-100 text-purple-600 dark:text-purple-700 hover:bg-gray-50 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-200" */}
        {/*       > */}
        {/*         <Crown className="w-4 h-4 mr-2" /> */}
        {/*         Upgrade to Pro */}
        {/*       </Button> */}
        {/*     </Link> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </section>
  );
}
