import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load .env variables
config();

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("❌ API_KEY is missing. Check your .env file.");
  process.exit(1);
}

// Initialize the API
const genAI = new GoogleGenerativeAI(apiKey);

async function listAvailableModels() {
  try {
    const models = await genAI.listModels();
    console.log("✅ Available Models:", models.models);
  } catch (error) {
    console.error("❌ Error fetching models:", error);
  }
}

listAvailableModels();
