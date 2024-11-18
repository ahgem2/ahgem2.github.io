const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint for handling AI responses
app.post("/api/quiz", async (req, res) => {
  try {
    const { answers } = req.body; // Get answers from the request body
    const prompt = `Based on the user's answers: ${answers.join(", ")}, suggest a fun and creative food match idea.`;

    // Call OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    const result = response.data.choices[0].text.trim();
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error calling OpenAI API:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});