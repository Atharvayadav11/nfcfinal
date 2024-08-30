const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyB_c5DjGGfnaDYXTJugMy-6M0ARdddtnk8";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function analyzeData(data) {
  const prompt = `Analyze the following crime data and provide insights:
  ${JSON.stringify(data)}
  Please provide:
  1. Overall trends in crime types
  2. Most common locations for crimes
  3. Time patterns (e.g., time of day, day of week)
  4. Any notable patterns in suspect descriptions
  5. Effectiveness of current case statuses
  6. Recommendations for law enforcement based on the data`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { analyzeData };
