// Quiz state variables
let currentQuestion = 0;
let answers = [];

// Question data
const questions = [
  {
    question: "What time of day is it?",
    options: [
      "Early morning, too tired for this",
      "Late morning, ready for lunch",
      "Afternoon snack time",
      "Dinner time!",
    ],
    gifs: {
      left: "",
      right: "",
    },
  },
  {
    question: "How hungry are you feeling?",
    options: [
      "Starving!",
      "Comfortably full",
      "Barely hungry",
      "Refreshed and light",
    ],
    gifs: {
      left: "",
      right: "",
    },
  },
  {
    question: "What's your budget like?",
    options: [
      "Barely got a dollar",
      "Mid-range, nothing fancy",
      "Money's no issue, treat yourself!",
      "Home cooking",
    ],
    gifs: {
      left: "",
      right: "",
    },
  },
  {
    question: "Where would you rather be right now?",
    options: [
      "Cozy at home",
      "Fancy restaurant",
      "Picnic",
      "Frolicking in grassy fields",
    ],
    gifs: {
      left: "",
      right: "",
    },
  },
];

// Result data - using your original structure but keeping the matches
const foodResults = {
  Orange: {
    gif: "/assets/kitty-love.gif",
    description: "Fresh and zesty, just like your personality!",
    fortune: "A surprise awaits you this week.",
    matches: [
      "Refreshed and light",
      "Frolicking in grassy fields",
      "Mid-range, nothing fancy",
    ],
  },
  Pasta: {
    gif: "/assets/pasta.gif",
    description:
      "Reliable, comforting, and infinitely versatile - you appreciate the classics with your own unique twist.",
    fortune:
      "Your adaptability will help you overcome any challenge this week.",
    matches: [
      "Comfortably full",
      "Fancy restaurant",
      "Mid-range, nothing fancy",
    ],
  },
  Sandwich: {
    gif: "/assets/sandwich.gif",
    description:
      "Practical, dependable, and always satisfying. You're the friend everyone can count on!",
    fortune: "A new friendship will bring unexpected joy into your life.",
    matches: ["Late morning, ready for lunch", "Picnic", "Barely got a dollar"],
  },
  "Korean BBQ or Hotpot": {
    gif: "/assets/kbbq.gif",
    description:
      "Social, adventurous, and always up for a good time. You bring people together!",
    fortune: "A gathering with friends will lead to a meaningful connection.",
    matches: [
      "Dinner time!",
      "Money's no issue, treat yourself!",
      "Fancy restaurant",
    ],
  },
  Chocolate: {
    gif: "/assets/chocolate.gif",
    description:
      "Sweet, indulgent, and impossible not to love. You know how to enjoy life's little pleasures.",
    fortune: "Take time to indulge in self-care this week - you deserve it!",
    matches: ["Barely hungry", "Afternoon snack time", "Cozy at home"],
  },
  Noodles: {
    gif: "/assets/soup-noodles.gif",
    description:
      "Long-lasting, flexible, and full of variety. Your life is rich with experiences and possibilities!",
    fortune: "An unexpected journey will bring new knowledge.",
    matches: [
      "Starving!",
      "Late morning, ready for lunch",
      "Mid-range, nothing fancy",
    ],
  },
  "Strawberry Cake": {
    gif: "/assets/strawberry-cake.gif",
    description:
      "Sweet, special, and meant to be celebrated. You bring joy to those around you!",
    fortune:
      "A celebration is in your near future - big or small, it will be meaningful.",
    matches: [
      "Barely hungry",
      "Money's no issue, treat yourself!",
      "Cozy at home",
    ],
  },
  "Homemade Fried Rice": {
    gif: "/assets/rice.gif",
    description:
      "Resourceful, creative, and comforting. You make the most of what you have!",
    fortune: "Your creativity will solve a problem that's been bothering you.",
    matches: ["Dinner time!", "Home cooking", "Barely got a dollar"],
  },
};

// Display current question
function displayQuestion() {
  console.log("Displaying question:", currentQuestion);
  const quizDiv = document.getElementById("quiz");
  console.log("Quiz div found:", quizDiv);

  // Clear previous content
  quizDiv.innerHTML = "";

  // Get current question data
  const currentData = questions[currentQuestion];

  // Create a container for the question and GIFs
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  // Add left GIF
  //const leftGif = document.createElement("img");
  //leftGif.src = currentData.gifs.left;
  //leftGif.alt = "Left GIF";
  //leftGif.classList.add("gif-left");

  // Add right GIF
  // const rightGif = document.createElement("img");
  // rightGif.src = currentData.gifs.right;
  // rightGif.alt = "Right GIF";
  // rightGif.classList.add("gif-right");

  // Add the question text
  const questionText = document.createElement("h2");
  questionText.innerText = currentData.question;

  // Add options as buttons
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");

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

// Show the result with GIF on top and text below
function showResult() {
  const quizDiv = document.getElementById("quiz");
  const resultDiv = document.getElementById("result");
  const retryButton = document.getElementById("retryButton");

  // Clear quiz content
  quizDiv.innerHTML = "";

  // Determine the best food match based on answers
  const bestMatch = getFoodResult(answers);
  const resultData = foodResults[bestMatch];

  // Display the result with the specific GIF and description
  resultDiv.innerHTML = `
    <div class="result-container">
      <img src="${resultData.gif}" alt="${bestMatch} GIF" class="result-gif">
      <div class="result-text">
        <h2>Your Food Match: ${bestMatch}</h2>
        <p>${resultData.description}</p>
        <p><strong>Your Fortune:</strong> ${resultData.fortune}</p>
      </div>
    </div>
  `;

  retryButton.style.display = "block";
}

// Function to calculate the best food match based on user's answers
function getFoodResult(userAnswers) {
  const scoreMap = {};

  // Loop through each food result
  Object.keys(foodResults).forEach((food) => {
    let score = 0;

    // Check each user answer against the preferred matches
    foodResults[food].matches.forEach((match) => {
      if (userAnswers.includes(match)) {
        score += 1; // Increase score for each matching answer
      }
    });

    // Apply positive scoring for specific scenarios
    if (
      userAnswers.includes("Comfortably full") ||
      userAnswers.includes("Refreshed and light")
    ) {
      if (food === "Orange") score += 3; // Orange fits light and refreshing moods
    }
    if (userAnswers.includes("Money's no issue, treat yourself!")) {
      if (food === "Korean BBQ or Hotpot") score += 3; // High budget, luxurious choice
    }
    if (userAnswers.includes("Frolicking in grassy fields")) {
      if (food === "Orange") score += 3; // Orange aligns with fresh, nature-inspired vibes
    }
    if (
      userAnswers.includes("Late morning, ready for lunch") ||
      userAnswers.includes("Picnic")
    ) {
      if (food === "Sandwich" || food === "Noodles") score += 3; // Light and convenient meals
    }

    // Apply negative scoring for mismatched scenarios
    if (
      userAnswers.includes("Early morning, too tired for this") &&
      food === "Strawberry Cake"
    ) {
      score -= 2; // Discourage this food choice in the morning
    }
    if (
      userAnswers.includes("Afternoon snack time") &&
      food === "Korean BBQ or Hotpot"
    ) {
      score -= 2; // Avoid heavy meals for snack time
    }
    if (userAnswers.includes("Barely got a dollar") && food === "Pasta") {
      score -= 2; // Pasta may not fit a tight budget
    }

    // Reduce the score for Chocolate and Homemade Fried Rice
    if (food === "Chocolate") score -= 1;
    if (food === "Homemade Fried Rice") score -= 1;

    scoreMap[food] = score;
  });

  // Get the top-scoring food based on user answers
  const topResult = Object.keys(scoreMap).reduce((a, b) =>
    scoreMap[a] > scoreMap[b] ? a : b
  );
  return topResult;
}

// Set up retry button
function setupRetryButton() {
  const retryButton = document.getElementById("retryButton");
  if (retryButton) {
    retryButton.style.display = "none";
    retryButton.onclick = function () {
      currentQuestion = 0;
      answers = [];
      document.getElementById("result").innerHTML = "";
      retryButton.style.display = "none";
      displayQuestion();
    };
  } else {
    console.error("Retry button not found in the DOM");
  }
}

// Initialize the quiz when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  // Hide the retry button initially
  const retryButton = document.getElementById("retryButton");
  if (retryButton) {
    retryButton.style.display = "none";
  }

  // Reset variables
  currentQuestion = 0;
  answers = [];

  // Clear any existing content
  const resultDiv = document.getElementById("result");
  if (resultDiv) {
    resultDiv.innerHTML = "";
  }

  // Set up the retry button
  setupRetryButton();

  // Start the quiz
  displayQuestion();
});
