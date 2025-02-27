import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

// Initialize the API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to get AI response using generateContent
async function getResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log("AI Response:", response);
    return response;
  } catch (error) {
    console.error("Error generating content:", error);
    return "❌ Sorry, I couldn't process your request.";
  }
}

// User chat div
export const userDiv = (message) => `
  <div class="flex items-center gap-2 justify-start">
    <img src="user.jpg" alt="user icon" class="w-10 h-10 rounded-full" />
    <p class="bg-gemDeep text-white p-1 rounded-md shadow-md">${message}</p>
  </div>
`;

// AI chat div
export const aiDiv = (message) => `
  <div class="flex gap-2 justify-end">
    <pre class="bg-gemRegular/40 text-gemDeep p-1 rounded-md shadow-md whitespace-pre-wrap">
${message}
    </pre>
    <img src="chat-bot.jpg" alt="bot icon" class="w-10 h-10 rounded-full" />
  </div>
`;

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const userMessageInput = document.getElementById("prompt");
  const chatContainer = document.getElementById("chat-container");

  const prompt = userMessageInput.value.trim();
  if (!prompt) return;

  // Display user message
  chatContainer.innerHTML += userDiv(prompt);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
  userMessageInput.value = "";

  // Get AI response
  const aiResponse = await getResponse(prompt);
  const formattedResponse = md().render(aiResponse);

  // Display AI response
  chatContainer.innerHTML += aiDiv(formattedResponse);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
}

// Event listeners
const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", handleSubmit);

// Handle Enter key submission (without Shift)
chatForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSubmit(event);
  }
});
