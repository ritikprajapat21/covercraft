export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  isPremium: boolean;
  creditsRemaining: number;
  createdAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  filename: string;
  content: string;
  uploadedAt: Date;
}

export interface Document {
  id: string;
  userId: string;
  type: 'cover_letter' | 'cold_email';
  title: string;
  content: string;
  jobDescription: string;
  resumeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  documentId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GenerationRequest {
  type: 'cover_letter' | 'cold_email';
  jobDescription: string;
  resumeContent: string;
  additionalPrompt?: string;
}