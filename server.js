const express = require("express");
const { OpenAI } = require("openai"); // Correct import for OpenAI v4
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz API! Use POST /api/quiz to interact.");
});

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load the API key from .env
});

// Endpoint for handling AI responses
app.post("/api/quiz", async (req, res) => {
  try {
    const { answers } = req.body;
    console.log("Received answers:", answers);

    const prompt = `Based on the user's answers: ${answers.join(", ")}, suggest a fun and creative food match idea.`;

    // Test OpenAI integration
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content.trim();
    console.log("OpenAI response:", result);

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    res.status(500).json({ error: "OpenAI API failed!" });
  }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

