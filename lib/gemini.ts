import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Updated the prompt
export const generateCoverLetter = async (
  jobDescription: string,
  resumeContent: string | { text: string; links: string[] },
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // May need in future so commenting it
    // generationConfig: {
    //   responseMimeType: "application/json",
    //   responseSchema: {
    //     type: SchemaType.OBJECT,
    //     properties: {
    //       coverLetter: {
    //         type: SchemaType.STRING,
    //         description: "The generated cover letter in markdown format.",
    //       },
    //     },
    //     required: ["coverLetter"],
    //   },
    // },
  });

  const prompt = {
    task: "job_outreach_writer",
    constraints: {
      paragraph_count: 4,
      max_words: 400,
      tone: ["professional", "personable", "confident"],
    },
    inputs: {
      resume: resumeContent,
      date: new Date(),
      job_description: jobDescription,
    },
    style: {
      formatting: {
        include_header_for_cover_letter: true,
      },
    },
    instructions: [
      "Map job requirements from job_description to skills/experience in resume.",
      "Each body paragraph should emphasize one or two key skills or achievements.",
      "Be specific and show proof (metrics, technologies, outcomes).",
      "Keep it concise: 3–4 paragraphs max.",
      "Response should contain the fully formatted cover letter in markdown with the links.",
    ],
  };

  const result = await model.generateContent(JSON.stringify(prompt));
  const response = result.response.text();

  return JSON.parse(response).coverLetter;
};

export const generateColdEmail = async (
  companyDescription: string,
  resumeContent: string | { text: string; links: string[] },
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = {
    task: "job_outreach_writer",
    constraints: {
      max_words: 180,
      tone: ["concise", "professional", "confident"],
    },
    inputs: {
      resume: resumeContent,
      company: {
        description: companyDescription,
      },
    },
    style: {
      formatting: {
        include_subject_for_email: true,
      },
    },
    instructions: [
      "Generate a compelling subject line tied to the company/industry.",
      "Start with a personalized hook that shows awareness of the company.",
      "Highlight 1–2 achievements or skills from resume relevant to the company.",
      "Keep it concise: 120–180 words total.",
      "End with a clear call to action (suggest a quick intro call, sharing portfolio, etc.).",
      "Response should contain the fully formatted email in markdown with the links.",
      "Response should contain Subject line that can be copied and content that can be copied separately.",
    ],
  };

  const result = await model.generateContent(JSON.stringify(prompt));
  const response = result.response.text();

  console.log(JSON.parse(response));
  return JSON.parse(response).coldEmail;
};

export const refineContent = async (
  content: string,
  userRequest: string,
  options?: {
    tone?: string[]; // e.g. ["professional", "friendly"]
    maxWords?: number; // e.g. 300
    returnDiff?: boolean; // return old vs new comparison
  },
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          refinedText: {
            type: SchemaType.STRING,
            description: "The refined text in markdown format.",
          },
          notes: {
            type: SchemaType.STRING,
            description: "Include things to keep in mind.",
          },
          diff: {
            type: SchemaType.STRING,
            description: "Short summary of changes made in the text.",
          },
        },
        required: ["refinedText"],
      },
    },
  });

  const prompt = {
    task: "content_refinement",
    constraints: {
      tone: options?.tone || ["professional", "clear"],
      max_words: options?.maxWords || 500,
      return_diff: options?.returnDiff || false,
    },
    inputs: {
      current_content: content,
      user_request: userRequest,
    },
    instructions: [
      "Refine the given content according to user_request.",
      "Maintain the specified tone and professional structure.",
      "If return_diff is true, include a simple before/after diff summary.",
      "Keep refined_text concise and aligned with the max_words constraint.",
      "Always return valid JSON with the required fields.",
    ],
  };

  const result = await model.generateContent(JSON.stringify(prompt));
  const response = result.response.text();

  return JSON.parse(response) as {
    refinedText: string;
    notes?: string;
    diff?: string;
  };
};

// export const generateCoverLetter = async (
//   jobDescription: string,
//   resumeContent: string,
// ) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//
//   const prompt = `
//     Based on the following resume and job description, create a personalized, professional cover letter.
//
//     Resume:
//     ${resumeContent}
//
//     Job Description:
//     ${jobDescription}
//
//     Please create a cover letter that:
//     1. Addresses the specific requirements mentioned in the job description
//     2. Highlights relevant experience and skills from the resume
//     3. Shows genuine interest in the role and company
//     4. Maintains a professional yet personable tone
//     5. Is concise and impactful (3-4 paragraphs)
//
//     Format the response as a complete cover letter with proper structure.
//   `;
//
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// };

// export const generateColdEmail = async (
//   jobDescription: string,
//   resumeContent: string,
// ) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//
//   const prompt = `
//     Based on the following resume and job description, create a personalized cold email to reach out about this opportunity.
//
//     Resume:
//     ${resumeContent}
//
//     Job Description:
//     ${jobDescription}
//
//     Please create a cold email that:
//     1. Has a compelling subject line
//     2. Briefly introduces the candidate
//     3. Highlights 2-3 most relevant qualifications
//     4. Shows knowledge of the company/role
//     5. Includes a clear call to action
//     6. Is concise and professional (4-5 sentences max)
//
//     Format the response with:
//     Subject: [subject line]
//     Body: [email body]
//   `;
//
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// };
//
// export const refineContent = async (content: string, userRequest: string) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//
//   const prompt = `
//     Please modify the following content based on the user's request:
//
//     Current Content:
//     ${content}
//
//     User Request:
//     ${userRequest}
//
//     Please provide the refined version while maintaining the professional tone and structure.
//   `;
//
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// };
//
