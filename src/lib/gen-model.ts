import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../utils/env";

const gemini = new GoogleGenerativeAI(env.GEMINI_KEY);

export const model = gemini.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 4096,
    }
});