import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Resume {
  id: string;
  filename: string;
  content: string;
  uploadedAt: Date;
}

interface Document {
  id: string;
  type: "cover_letter" | "cold_email";
  title: string;
  content: string;
  jobDescription: string;
  resumeId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppState {
  user: any;
  currentResume: Resume | null;
  currentDocument: Document | null;
  documents: Document[];
  isGenerating: boolean;

  // Actions
  setUser: (user: any) => void;
  setCurrentResume: (resume: Resume | null) => void;
  setCurrentDocument: (document: Document | null) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      currentResume: null,
      currentDocument: null,
      documents: [],
      isGenerating: false,

      setUser: (user) => set({ user }),
      setCurrentResume: (resume) => set({ currentResume: resume }),
      setCurrentDocument: (document) => set({ currentDocument: document }),
      addDocument: (document) =>
        set((state) => ({
          documents: [...state.documents, document],
        })),
      updateDocument: (id, updates) =>
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc.id === id ? { ...doc, ...updates } : doc,
          ),
        })),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
    }),
    {
      name: "cover-letter-app",
      partialize: (state) => ({
        currentResume: state.currentResume,
        documents: state.documents,
      }),
    },
  ),
);

