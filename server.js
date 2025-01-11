const express = require("express");
const { OpenAIApi, Configuration } = require("openai"); // Correct import
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Default GET route
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz API! Use POST /api/quiz to interact.");
});

// Endpoint for handling AI responses
app.post("/api/quiz", async (req, res) => {
  try {
    const { answers } = req.body;
    console.log("Received answers:", answers);

    const prompt = `Based on the user's answers: ${answers.join(
      ", "
    )}, suggest a fun and creative food match idea.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.data.choices[0].message.content.trim();
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