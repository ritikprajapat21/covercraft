import fs from "node:fs";
import chromium from "@sparticuz/chromium";
import { marked } from "marked";
import { type NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

chromium.setGraphicsMode = false;

function listDir(dir: string) {
  try {
    const files = fs.readdirSync(dir);
    console.error(`Contents of ${dir}:`, files);
  } catch (err) {
    console.error(`Error reading ${dir}:`, err);
  }
}

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
    const path =
      process.env.VERCEL === "1" ? "/tmp" : await chromium.executablePath();
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: path,
      headless: true,
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
    console.error("process.platform:", process.platform);
    console.error("process.arch:", process.arch);
    listDir("/tmp");
    listDir("/var/task");
    listDir("/var/task/node_modules/@sparticuz/chromium");
    listDir("/opt");

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
