import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateCoverLetter = async (
  jobDescription: string,
  resumeContent: { text: string; links: string[] },
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
      `
        You are an AI writing assistant helping users generate personalized and concise cover letters for job applications.
        Use the resume and job description to craft a compelling narrative tailored to the role. Follow the structure below:

        1. Match Skills to Role
        - Carefully analyze the job description and map its key requirements to the candidate's skills and experience.
        - Focus on relevance and alignment between the candidate's background and the company's needs.

        2. Body Paragraph Structure
        - Each body paragraph should highlight one or two specific skills, achievements, or experiences.
        - Emphasize outcomes, metrics, and technologies where possible (e.g., “Increased X by Y%”, “Led a team of 5 engineers”, “Built using React and Node.js”).

        3. Tone and Brevity
        - Keep the tone professional yet approachable.
        - Limit the cover letter to 3–4 concise paragraphs (around 180–250 words).

        4. Formatting Instructions
        - Format the output as a markdown-formatted cover letter.
        - Use proper paragraph breaks.
        - If a line or string should appear on the next line, end it with two spaces.
        - Include relevant links as clickable markdown links (e.g., [My Portfolio](https://example.com)).

        Only output the fully formatted markdown cover letter — no explanations or extra content.
      `,
    ],
  };

  if (process.env.VERCEL !== "1") {
    return `
September 16, 2025

Ritik Prajapat  
ritikprajapati084@gmail.com  
+91 9754892367  
[GitHub](https://github.com/ritikprajapat21) | [LinkedIn](https://www.linkedin.com/in/ritik-prajapat/) | [Portfolio](https://ritikprajapat-portfolio.vercel.app/)

Dear Hiring Team,

I am writing to express my enthusiastic interest in the Engineer position on the Client Identities team at Goldman Sachs. My background as a detail-oriented Computer Science graduate with strong interests in secure web development, software architecture, and full-stack contribution aligns perfectly with your team's mission to design and implement secure, seamless sign-in experiences. I am eager to apply my skills in an agile, client-driven environment to build resilient, scalable solutions.

During my Web Developer Internship at RezuWizard, I gained hands-on experience in enterprise-level application development, specifically by engineering secure authentication and authorization flows with backend APIs, which notably improved onboarding speed by 40%. My proficiency in compiled languages like Java, alongside extensive experience in developing RESTful APIs and full-stack applications with frameworks like Spring Boot and Node.js, directly addresses your requirements for building robust and secure software.

My project work further demonstrates my capabilities in critical areas, including the implementation of Google [OAuth 2.0](https://github.com/ritikprajapat21/email-summarizer) for secure email access in my Email Summarizer project and leveraging [Clerk](https://github.com/ritikprajapat21/tune-in) for user authentication in my Podcast Generator. This experience directly relates to your focus on modern web security protocols. Furthermore, my understanding of containerization with Docker and scripting skills in Python, evidenced by my contributions to projects like SurfSense, would enable me to contribute effectively to systems integrating cloud-native offerings and custom products.

I am confident in my ability to contribute across the stack and help promote best practices for secure application development within the firm. I am passionate about continuous growth and building mission-critical systems, and I am particularly drawn to Goldman Sachs' commitment to fostering diversity and professional development. Thank you for considering my application; I look forward to discussing how my skills and enthusiasm can benefit your team.`;
  }

  const result = await model.generateContent(JSON.stringify(prompt));
  const response = result.response.text();

  return response;
};

export const generateColdEmail = async (
  companyDescription: string,
  resumeContent: { text: string; links: string[] },
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
      `
        You are an AI writing assistant helping users generate concise and personalized cold outreach emails for job applications.  
        Use the following structure to generate the email in markdown format:

        1. Subject Line
        - Create a compelling subject line tailored to the target company's name, role, or industry.
        - Make it personalized, relevant, and curiosity-driven.

        2. Personalized Opening Hook
        - Start the email with a line that shows genuine interest or awareness of the company’s work, product, or recent news.
        - Mention the company name directly.

        3. Resume Tie-In  
        - Briefly highlight 1–2 achievements, skills, or experiences from the candidate’s resume that are most relevant to the company or role.
        - Focus on how these align with the company’s goals or challenges.

        4. Clear Call to Action
        - Close with a friendly and professional call to action, such as scheduling a quick intro call, reviewing a portfolio, or continuing the conversation.
        - Keep tone warm, not pushy.

        5. Formatting Rules
        - Keep total length between 120–180 words.
        - Format the output as a markdown email.
        - Add two spaces at the end of lines where a line break is desired.
        - Include relevant links (portfolio, LinkedIn, etc.) as clickable markdown links (e.g., [My Portfolio](https://example.com)).
        The final response should only contain the fully formatted markdown email, nothing else.
      `,
    ],
  };

  const result = await model.generateContent(JSON.stringify(prompt));
  const response = result.response.text();

  return response;
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
