import { GoogleGenerativeAI } from '@google-ai/generativeai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateCoverLetter = async (jobDescription: string, resumeContent: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    Based on the following resume and job description, create a personalized, professional cover letter.
    
    Resume:
    ${resumeContent}
    
    Job Description:
    ${jobDescription}
    
    Please create a cover letter that:
    1. Addresses the specific requirements mentioned in the job description
    2. Highlights relevant experience and skills from the resume
    3. Shows genuine interest in the role and company
    4. Maintains a professional yet personable tone
    5. Is concise and impactful (3-4 paragraphs)
    
    Format the response as a complete cover letter with proper structure.
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateColdEmail = async (jobDescription: string, resumeContent: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    Based on the following resume and job description, create a personalized cold email to reach out about this opportunity.
    
    Resume:
    ${resumeContent}
    
    Job Description:
    ${jobDescription}
    
    Please create a cold email that:
    1. Has a compelling subject line
    2. Briefly introduces the candidate
    3. Highlights 2-3 most relevant qualifications
    4. Shows knowledge of the company/role
    5. Includes a clear call to action
    6. Is concise and professional (4-5 sentences max)
    
    Format the response with:
    Subject: [subject line]
    Body: [email body]
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const refineContent = async (content: string, userRequest: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    Please modify the following content based on the user's request:
    
    Current Content:
    ${content}
    
    User Request:
    ${userRequest}
    
    Please provide the refined version while maintaining the professional tone and structure.
  `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};