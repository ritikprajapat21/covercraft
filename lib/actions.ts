"use server";

import { auth } from "@/auth";
import { generateColdEmail, generateCoverLetter } from "@/lib/gemini";

export async function generate(formData: FormData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const type = formData.get("type") as string;
  const jobDescription = formData.get("jobDescription") as string;
  const resumeContent = formData.get("resumeContent") as string;

  if (!type || !jobDescription || !resumeContent) {
    return { error: "Missing required fields" };
  }

  const parsedResumeContent = JSON.parse(resumeContent);

  let content: string;
  if (type === "cover_letter") {
    content = await generateCoverLetter(jobDescription, parsedResumeContent);
  } else if (type === "cold_email") {
    content = await generateColdEmail(jobDescription, parsedResumeContent);
  } else {
    return { error: "Invalid type" };
  }

  return { content };
}

// export async function downloadPdf(content: string) {
//   if (!content) {
//     return { error: "Missing content" };
//   }
//
//   const htmlContent = marked(content);
//
//   const fullHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <style>
//           body {
//             font-family: sans-serif;
//             line-height: 1.6;
//             color: #333;
//           }
//         </style>
//       </head>
//       <body>
//         ${htmlContent}
//       </body>
//     </html>
//   `;
//
//   try {
//     const browser = await puppeteer.launch({
//       args: [...chromium.args, "--no-zygote"],
//       // defaultViewport: chromium.defaultViewport,
//       executablePath: await chromium.executablePath(),
//       headless: true,
//       // headless: chromium.headless,
//     });
//     const page = await browser.newPage();
//
//     await page.setContent(fullHtml, { waitUntil: "networkidle0" });
//     const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
//
//     await browser.close();
//
//     const pdfBase64 = pdfBuffer.toBase64();
//
//     return { pdf: pdfBase64 };
//   } catch (error) {
//     console.error("Failed to generate PDF:", error);
//     return { error: "Failed to generate PDF" };
//   }
// }
