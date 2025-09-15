"use client";
import mammoth from "mammoth";

export const extractTextFromPDF = async (
  file: File,
): Promise<{ text: string; links: string[] }> => {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

  let text = "";
  const links: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .filter((item) => "str" in item)
      .map((item) => item.str)
      .join(" ");
    text += `${pageText}\n`;

    const annotations = await page.getAnnotations();
    annotations.forEach((a) => {
      if (a.subtype === "Link" && a.url) {
        links.push(a.url);
      }
    });
  }

  return { text: text.trim(), links };
};

export const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractTextFromFile = async (
  file: File,
): Promise<{ text: string; links: string[] }> => {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    return await extractTextFromPDF(file);
  } else {
    throw new Error("Unsupported file type. Please upload a PDF file.");
  }
};
