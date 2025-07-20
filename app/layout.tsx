import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "CoverCraft AI - AI-Powered Cover Letters & Cold Emails",
	description:
		"Generate personalized cover letters and cold emails with AI. Upload your resume, paste a job description, and let AI create professional content that gets you noticed.",
	keywords: [
		"cover letter",
		"cold email",
		"AI",
		"job application",
		"resume",
		"career",
	],
	authors: [{ name: "CoverCraft AI" }],
	creator: "CoverCraft AI",
	publisher: "CoverCraft AI",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://covercraft-ai.vercel.app"),
	openGraph: {
		title: "CoverCraft AI - AI-Powered Cover Letters & Cold Emails",
		description: "Generate personalized cover letters and cold emails with AI",
		url: "https://covercraft-ai.vercel.app",
		siteName: "CoverCraft AI",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "CoverCraft AI - AI-Powered Cover Letters & Cold Emails",
		description: "Generate personalized cover letters and cold emails with AI",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative flex min-h-screen flex-col">
						<Navigation />
						<main className="flex-1">{children}</main>
					</div>
					<Toaster richColors position="top-right" />
				</ThemeProvider>
			</body>
		</html>
	);
}
