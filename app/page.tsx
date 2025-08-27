import { Crown, FileText, Sparkles, Target, Users, Zap } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Features from "@/components/features";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 dark:bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse" />
                  <FileText className="relative w-20 h-20 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  CoverCraft AI
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Generate personalized cover letters and cold emails with AI.
                Upload your resume, paste a job description, and let AI create
                professional content that gets you noticed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/auth/signin">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-2 hover:bg-gray-50 transition-all duration-200"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • 5 free generations • Sign up with
                Google
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose CoverCraft AI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Powered by advanced AI to help you land your dream job
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate professional cover letters and cold emails in
                  seconds, not hours.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Highly Personalized
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI analyzes your resume and the job description to create
                  tailored content.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Trusted by Thousands
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join thousands of job seekers who have landed interviews with
                  our AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
              Join thousands of successful job seekers using AI to get noticed
              by employers.
            </p>
            <Link href="/auth/signin">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 hover:bg-gray-50 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Crown className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return <Features />;
}
