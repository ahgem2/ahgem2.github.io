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

// Add predefined results with advanced answer matching
const foodResults = {
  Chocolate: {
    gif: "gifs/chocolate.gif",
    description: "You are simply too sweet for the world, let chocolate people dream about the world in new ways, find their forests, and travel to people who mean the universe.",
    fortune: "Hanging under the moonlight, you thrive, where hanging by the thread, you find. Both hard and soft work always belong at the right time, don't worry everything will be alright.",
    matches: ["Indulgent and luxurious", "Content and happy", "Money's no issue, treat yourself!", "Basking in the sunshine, about to nap", "Good dinner, no stress, just relaxation"]
  },
  Orange: {
    gif: "gifs/kitty-love.gif",
    description: "Sometimes you can feel the citrus in the air, or maybe you are liberated from all the chaos. Let it be known that there aren't many souls who see poetry in wind. Maybe letting time fly by isn't a bad idea for now.",
    fortune: "Let flowers grow as slow and fast as they need to for now, not every detail on our lives needs to be monitored like oceans abroad. Take care of yourself in new ways and feel anew!",
    matches: ["snack", "air", "grassy fields", "barely got a dollar"]
  },
  Noodles: {
    gif: "gifs/soup-noodles.gif",
    description: "There's many different noodles you haven't tried yet...including many ramens. But, to the ones you have, let it be known that you always stay grounded to the nature of our universe.",
    fortune: "Every twist and turn brings you closer to fulfillment. Embrace each strand of life!",
    matches: ["feeling satisfied", "warm and cozy", "completely satisfied", "staying budget-friendly", "exploring a new culture"]
  },
  Pasta: {
    gif: "gifs/pasta.gif",
    description: "Linguine linguini, how lovely it is to savor the moment right now. You live by 'Eat well!' and I have to ask - has anyone appreciated you recently? Thank you for being you Pasta people.",
    fortune: "It takes two souls to bring a smile to your face. Cherish getting to know yourself and see the beauty in love since it may be instilled in you.",
    matches: ["dinner time, let's go big!", "relaxing by a waterfall", "splurging a little today"]
  },
  "Korean BBQ or Hotpot": {
    gif: "gifs/bbq.gif",
    description: "Splitting food right now with some warm soup or grilled meat is a way of celebrating life. Don't discount the beauty of your own.",
    fortune: "Smile at the good, smile after the bads. The only one that matters is yourself. Live life, it's just too short.",
    matches: ["warm and cozy", "mid-range budget", "at a rooftop party in the city", "sharing food and bonding with friends"]
  },
  Curry: {
    gif: "gifs/curry.gif",
    description: "Curry's warmth and spice bring comfort and adventure in every bite. You embody a mix of boldness and coziness.",
    fortune: "Life is a blend of flavors, each moment adding to the rich tapestry of your journey. Embrace it all!",
    matches: ["warm and cozy", "exploring a new culture", "mid-range budget"]
  },
  Sandwich: {
    gif: "gifs/sandwich.gif",
    description: "Simple, reliable, and versatile. You adapt to every situation with ease.",
    fortune: "In simplicity, you find strength. The layers of your life add flavor to the world around you.",
    matches: ["keeping it under $15", "feeling satisfied", "snack"]
  },
  "Strawberry Cake": {
    gif: "gifs/strawberry-cake.gif",
    description: "As sweet as strawberry cake, you bring joy and freshness wherever you go. Your delightful presence makes every moment a little brighter.",
    fortune: "Keep spreading sweetness and joy. Your energy is a gift to those around you!",
    matches: ["playful and energetic", "content and happy", "barely got a dollar", "good dinner, no stress, just relaxation"]
  },
  "Homemade Fried Rice": {
    gif: "gifs/rice.gif",
    description: "When nothing else matches, a bowl of homemade fried rice offers comfort and creativity. You make the best of every situation.",
    fortune: "Every grain of rice is a story of patience and perseverance. Keep going!",
    matches: []
  }
};
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
          <img src="${resultData.gif}" alt="${bestMatch} GIF" class="result-gif" />
          <div class="result-text">
              <h2>Your Food Match: ${bestMatch}</h2>
              <p>${resultData.description}</p>
              <p><strong>Your Fortune:</strong> ${resultData.fortune}</p>
          </div>
      </div>
  `;
  retryButton.style.display = "block";
}

  const resultData = foodResults[bestMatch];

// Full Food Recommendation Algorithm with Positive and Negative Scoring

// Function to calculate the best food match based on user's answers
function getFoodResult(userAnswers) {
  const scoreMap = {};

  // Loop through each food result
  Object.keys(foodResults).forEach((food) => {
      let score = 0;

      // Check each user answer against the preferred matches
      foodResults[food].matches.forEach((match) => {
          if (userAnswers.includes(match)) {
              score += 2; // Increase score for each matching answer
          }
      });

      // Apply positive scoring for specific scenarios
      if (userAnswers.includes("Comfortably full") || userAnswers.includes("Refreshed and light")) {
          if (food === "Orange") score += 5; // Orange fits light and refreshing moods
      }
      if (userAnswers.includes("Money's no issue, treat yourself!")) {
          if (food === "Korean BBQ or Hotpot") score += 5; // High budget, luxurious choice
      }
      if (userAnswers.includes("Frolicking in grassy fields")) {
          if (food === "Orange") score += 5; // Orange aligns with fresh, nature-inspired vibes
      }
      if (userAnswers.includes("Late morning, ready for lunch") || userAnswers.includes("Picnic")) {
          if (food === "Sandwich" || food === "Noodles") score += 5; // Light and convenient meals
      }

      // Apply negative scoring for mismatched scenarios
      if (userAnswers.includes("Early morning, too tired for this") && food === "Strawberry Cake") {
          score -= 5; // Discourage this food choice in the morning
      }
      if (userAnswers.includes("Afternoon snack time") && food === "Korean BBQ or Hotpot") {
          score -= 5; // Avoid heavy meals for snack time
      }
      if (userAnswers.includes("Barely got a dollar") && food === "Pasta") {
          score -= 5; // Pasta may not fit a tight budget
      }

      scoreMap[food] = score;
  });

  // Get the top-scoring food based on user answers
  const topResult = Object.keys(scoreMap).reduce((a, b) => scoreMap[a] > scoreMap[b] ? a : b);
  return topResult;
}

// Example usage with all possible answer choices
const userSelections = [
  "Cozy and relaxed",
  "Ready for an adventure",
  "Feeling satisfied",
  "Curious about something new",
  "Playful and energetic",
  "Indulgent and luxurious",
  "Comfortably full",
  "Refreshed and light",
  "Warm and cozy",
  "Completely satisfied",
  "Energized for the rest of the day",
  "Content and happy",
  "Barely got a dollar",
  "Keeping it under $15",
  "Splurging a little today",
  "Staying budget-friendly",
  "Mid-range budget",
  "Money's no issue, treat yourself!",
  "Frolicking in grassy fields",
  "At a rooftop party in the city",
  "Exploring a new culture",
  "Relaxing by a waterfall",
  "Basking in the sunshine, about to nap",
  "Chilling at the beach, taking photos",
  "Early morning, too tired for this",
  "Late morning, ready for lunch",
  "Afternoon snack time",
  "Dinner time, let's go big!",
  "Midnight craving, let's feast!",
  "Dinner, but keeping it calm",
  "Laid-back and chill",
  "Sharing food and bonding with friends",
  "Indulging in a little luxury",
  "Enjoying fresh air and great food",
  "Midnight snacking under the stars",
  "Good dinner, no stress, just relaxation"
];

const result = getFoodResult(userSelections);
console.log("Recommended Food:", result);


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
