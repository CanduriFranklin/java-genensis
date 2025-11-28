import { GoogleGenAI } from "@google/genai";
import { BOOK_PAGES } from "../constants";

let ai: GoogleGenAI | null = null;

export const initializeGenAI = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    console.warn("VITE_API_KEY not found in environment.");
    return;
  }
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
  }
};

export const chatWithBook = async (userQuestion: string): Promise<string> => {
  if (!ai) {
    initializeGenAI();
    if (!ai) return "I'm sorry, I can't connect to the AI right now. Please check your API key configuration.";
  }

  // Construct context from the book content
  const bookContext = BOOK_PAGES.map(page => {
    return `Page ${page.id} (${page.title}): ${page.content.join(' ')} ${page.bulletPoints?.join(' ') || ''}`;
  }).join('\n\n');

  const systemPrompt = `
    You are the AI embodiment of the book "Java Genesis: The Era of Augmented Development" by Developer Canduri Franklin.
    Your persona is professional, futuristic, and encouraging. You are an expert in Java and Generative AI.
    
    Here is the content of the book you represent:
    ${bookContext}

    Answer the user's question based strictly on the book's themes and content.
    If the question is about code examples in the book, explain them clearly.
    Keep answers concise (under 100 words) and inspiring.
  `;

  try {
    const response = await ai!.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuestion,
        config: {
            systemInstruction: systemPrompt,
        }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while consulting the neural network.";
  }
};