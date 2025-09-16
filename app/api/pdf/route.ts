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
          body { font-family: "Times", Arial, sans-serif; padding: 40px; }
          h1, h2, h3 { color: #333; }
        </style>
      </head>
      <body>
        ${marked.parse(content)}
      </body>
    </html>
  `;

  try {
    console.log(await chromium.executablePath("/tmp"));
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath("/tmp/"),
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(pdfBuffer);
        controller.close();
      },
    });

    const headers = new Headers();
    headers.append("Content-Disposition", 'inline; filename="document.pdf"');
    headers.append("Content-Type", "application/pdf");
    headers.append("Content-Length", pdfBuffer.length.toString());

    return new NextResponse(stream, {
      headers,
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
