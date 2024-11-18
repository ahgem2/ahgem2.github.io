// Object to store user's answers
const userAnswers = {};
let currentQuestion = 0;
let answers = [];

// Questions with pixel art and options
const questions = [
  {
    question: "What mood are you in today?",
    gifs: { left: "gifs/cake_kouji.gif", right: "gifs/pixel-art-pizza.gif" },
    options: [
      "Cozy and relaxed",
      "Ready for an adventure",
      "Feeling satisfied",
      "Curious about something new",
      "Playful and energetic",
      "Indulgent and luxurious",
    ],
  },
  {
    question: "How do you want to feel after your meal?",
    gifs: { left: "gifs/cake_kouji.gif", right: "gifs/pixel-art-pizza.gif" },
    options: [
      "Comfortably full",
      "Refreshed and light",
      "Warm and cozy",
      "Completely satisfied",
      "Energized for the rest of the day",
      "Content and happy",
    ],
  },
  {
    question: "What's your current budget?",
    gifs: {
      left: "gifs/hungry-burger.gif",
      right: "gifs/pixel-art-cookie.gif",
    },
    options: [
      "Barely got a dollar",
      "Keeping it under $15",
      "Splurging a little today",
      "Staying budget-friendly",
      "Mid-range budget",
      "Money's no issue, treat yourself!",
    ],
  },
  {
    question: "Where's your imagination taking you?",
    gifs: { left: "gifs/soup-noodles.gif", right: "gifs/8-bit-pixel-art.gif" },
    options: [
      "Frolicking in grassy fields",
      "At a rooftop party in the city",
      "Exploring a new culture",
      "Relaxing by a waterfall",
      "Basking in the sunshine, about to nap",
      "Chilling at the beach, taking photos",
    ],
  },
  {
    question: "What time of day is it?",
    gifs: { left: "gifs/soup-noodles.gif", right: "gifs/8-bit-pixel-art.gif" },
    options: [
      "Early morning, too tired for this",
      "Late morning, ready for lunch",
      "Afternoon snack time",
      "Dinner time, let's go big!",
      "Midnight craving, let's feast!",
      "Dinner, but keeping it calm",
    ],
  },
  {
    question: "What's the vibe around you?",
    gifs: {
      left: "gifs/hungry-burger.gif",
      right: "gifs/pixel-art-cookie.gif",
    },
    options: [
      "Laid-back and chill",
      "Sharing food and bonding with friends",
      "Indulging in a little luxury",
      "Enjoying fresh air and great food",
      "Midnight snacking under the stars",
      "Good dinner, no stress, just relaxation",
    ],
  },
];

// Display current question
function displayQuestion() {
  const quizDiv = document.getElementById("quiz");

  // Clear previous content
  quizDiv.innerHTML = "";

  // Get current question data
  const currentData = questions[currentQuestion];

  // Create a container for the question and GIFs
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  // Add left GIF
  const leftGif = document.createElement("img");
  leftGif.src = currentData.gifs.left;
  leftGif.alt = "Left GIF";
  leftGif.classList.add("gif-left");

  // Add right GIF
  const rightGif = document.createElement("img");
  rightGif.src = currentData.gifs.right;
  rightGif.alt = "Right GIF";
  rightGif.classList.add("gif-right");

  // Add the question text
  const questionText = document.createElement("h2");
  questionText.innerText = currentData.question;

  // Add options as buttons
  const optionsContainer = document.createElement("div");
  currentData.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(button);
  });

  // Append all elements to the question container
  questionContainer.appendChild(leftGif);
  questionContainer.appendChild(questionText);
  questionContainer.appendChild(optionsContainer);
  questionContainer.appendChild(rightGif);

  // Append the question container to the quiz div
  quizDiv.appendChild(questionContainer);
}

// Handle answer selection
function selectAnswer(option) {
  answers.push(option);

  // Move to the next question or show the result
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Show the result
function showResult() {
  const quizDiv = document.getElementById("quiz");
  const resultDiv = document.getElementById("result");
  const retryButton = document.getElementById("retryButton");

  // Clear quiz content
  quizDiv.innerHTML = "";

  // Create a prompt based on user answers
  const prompt = `Based on these answers: ${answers.join(
    ", "
  )}, suggest a fun and creative food idea.`;

  // Fetch result from API
  fetch("http://localhost:5000/api/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the result
      resultDiv.innerHTML = `
      <div class="result-container">
        <div class="result-gif-left">
          <img src="gifs/smolverse-smol.gif" alt="Smolverse Smol GIF" class="gif-left-result">
        </div>
        <div class="result-text">
          <h2>Your Food Match:</h2>
          <p>${data.result}</p>
        </div>
        <div class="result-gif-right">
          <img src="gifs/heart-flashy.gif" alt="Heart Flashy GIF" class="gif-right-result">
        </div>
      </div>
      `;
      retryButton.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching result:", error);
      resultDiv.innerHTML = `
      <p>Oops! Something went wrong. Please try again later.</p>
      `;
    });
}

// Retry the quiz
document.getElementById("retryButton").onclick = function () {
  currentQuestion = 0;
  answers = [];
  document.getElementById("result").innerHTML = "";
  document.getElementById("retryButton").style.display = "none";
  displayQuestion();
};

// Start the quiz
displayQuestion();
