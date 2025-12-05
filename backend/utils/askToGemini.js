const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const askToGemini = async (content) => {
  const prompt = `Please summarize the following article concisely in the same language as the original content.\n\n---\n\n${content}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response;
};

module.exports = askToGemini;
