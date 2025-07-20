"use client";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export const extractTextFromPDF = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

	let text = "";
	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i);
		const content = await page.getTextContent();
		const pageText = content.items
			.filter((item): item is { str: string } => "str" in item)
			.map((item) => item.str)
			.join(" ");
		text += pageText + "\n";
	}

	return text.trim();
};

export const extractTextFromDOCX = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const result = await mammoth.extractRawText({ arrayBuffer });
	return result.value;
};

export const extractTextFromFile = async (file: File): Promise<string> => {
	const fileType = file.type;

	if (fileType === "application/pdf") {
		return await extractTextFromPDF(file);
	} else if (
		fileType ===
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	) {
		return await extractTextFromDOCX(file);
	} else {
		throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
	}
};
