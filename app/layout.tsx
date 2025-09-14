import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoverCraft | AI Cover Letter & Cold Email Generator",
  description:
    "CoverCraft helps job seekers instantly generate tailored cover letters and cold emails using AI. Upload your resume and job description to get professional, downloadable application materials in seconds.",
  keywords: [
    "cover letter generator",
    "cold email generator",
    "AI job application",
    "resume to cover letter",
    "AI cover letter",
    "Gemini LLM",
    "Next.js job tool",
    "AI job search",
  ],
  authors: [{ name: "Ritik Prajapat" }],
  creator: "Ritik Prajapat",
  publisher: "CoverCraft",
  metadataBase: new URL("https://cover-craft-one.vercel.app"),
  openGraph: {
    title: "CoverCraft | AI-Powered Cover Letter & Cold Email Generator",
    description:
      "Generate professional cover letters and cold emails instantly with AI. Upload your resume and job description to get personalized, downloadable application materials.",
    url: "https://cover-craft-one.vercel.app",
    siteName: "CoverCraft",
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "CoverCraft – AI Cover Letter Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoverCraft | AI Cover Letter & Cold Email Generator",
    description:
      "AI-powered tool to generate personalized cover letters and cold emails instantly. Just upload your resume and job description!",
    images: ["/og-image.png"],
    // creator: "@your_twitter_handle", // optional
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="min-h-screen fixed inset-0 -z-10 gradient" />
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
