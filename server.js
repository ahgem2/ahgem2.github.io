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
app.post("/api/quiz", (req, res) => {
  const { answers } = req.body;
  console.log("Received answers:", answers);

  // Send a basic response
  res.status(200).json({ message: "API is working!", answers: answers });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

