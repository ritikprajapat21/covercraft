import { Crown, FileText, Sparkles, Target, Users, Zap } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import Features from "@/components/features";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();

  const reasons = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate professional cover letters and cold emails in seconds, not hours.",
    },
    {
      icon: Target,
      title: "Highly Personalized",
      description:
        "AI analyzes your resume and the job description to create tailored content.",
    },
    {
      icon: Users,
      title: "Trusted by thousands",
      description:
        "Join thousands of job seekers who have landed interviews with our AI.",
    },
  ];

  if (!session) {
    return (
      <section>
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
                5 free generations • Sign up with Google
              </p>
            </div>
          </div>
        </div>
        {/* Features Section */}
        {/* FIX: background is different from rest */}
        <div className="py-20">
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
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="text-center p-8 rounded-2xl bg-transparent backdrop-blur-lg border border-neutral-300 dark:bg-neutral-400/30 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="w-16 h-16 bg-green-600/70 group-hover:bg-green-600 dark:bg-green-500/50 dark:group-hover:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {reason.description}
                  </p>
                </div>
              ))}
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
