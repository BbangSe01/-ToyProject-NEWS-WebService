const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const askToGemini = async (content) => {
  const prompt = `Please summarize the following article concisely:\n\n---\n\n${content}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response;
};

module.exports = askToGemini;
