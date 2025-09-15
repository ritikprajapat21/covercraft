// pages/api/generate-pdf.ts

import chromium from "@sparticuz/chromium";
import { marked } from "marked";
import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid markdown content" },
      { status: 400 },
    );
  }

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1, h2, h3 { color: #333; }
        </style>
      </head>
      <body>
        ${marked.parse(content)}
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      'attachment; filename="document.pdf"',
    );
    headers.append("Content-Type", "application/pdf");

    return new NextResponse(pdfBuffer, {
      headers,
    });
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=download.pdf");
    // res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
    // res.status(500).json({ error: "Failed to generate PDF" });
  }
}
