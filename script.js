document.addEventListener("DOMContentLoaded", () => {
  const userAnswers = {};

  // Store the user answer for each question
  function saveAnswer(question, answer) {
    userAnswers[question] = answer;
  }

  function calculateResult() {
    const combination = [
      userAnswers["What type of food are you feeling?"],
      userAnswers["How broke are you?"],
      userAnswers["What do you imagine now?"],
      userAnswers["What time of day?"],
      userAnswers["What’s the atmosphere?"],
    ].join(", ");

    const result =
      results[combination] || "No match found, maybe try something new today!";
    displayResult(result);
  }

  function displayResult(result) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `<h2>Your Food Match: ${result}</h2>`;
  }

  document.querySelectorAll(".question1-options button").forEach((button) => {
    button.addEventListener("click", () => {
      saveAnswer("What type of food are you feeling?", button.innerText);
    });
  });

  document.querySelectorAll(".question2-options button").forEach((button) => {
    button.addEventListener("click", () => {
      saveAnswer("How broke are you?", button.innerText);
    });
  });

  document
    .querySelector("#submitQuiz")
    .addEventListener("click", calculateResult);
});

//add comment
const questions = [
  {
    question: "What kind of mood are you in?",
    options: [
      "Cozy",
      "Adventurous",
      "Satisfied",
      "Curious",
      "Playful",
      "Indulgent",
    ],
  },
  {
    question: "What do you want to feel after your meal?",
    options: ["Full", "Refreshed", "Warm", "Satisfied", "Energized", "Content"],
  },
  {
    question: "how broke are you?",
    options: [
      "got 1 buck",
      "10-15, no more",
      "bOUGIE af",
      "cheap af",
      "mid mid mid",
      "normal. just normal",
    ],
  },
  {
    question: "now, what aligns with your imagination",
    options: [
      "frolicking around grassy plains in the middle of nowhere",
      "in my penthouse about to host a singles-only party",
      "culture shocked",
      "by the waterfalls while it thunderstorms",
      "bathing in the sunlight about to take the biggest nap ever",
      "at the beach about to take those polaroids",
    ],
  },
  {
    question: "what time of day?",
    options: [
      "too early for this shi-",
      "meh, lunch, hungry but not hungry",
      "snackity snacking",
      "go heavy or go home",
      "midnight feasting",
      "dinner. good dinner, no stress",
    ],
  },
  {
    question: "atmosphere?",
    options: [
      "Let’s keep it laid-back and chill",
      "I love sharing and bonding over food!",
      "Let’s indulge in a luxury",
      "Fresh air and good food, yes please",
      "midnight feasting",
      "dinner. good dinner, no stress",
    ],
  },
];

const results = {
  "Cozy, Full, Comfort mac and cheese, Too early for this shi-, Let’s keep it laid-back and chill":
    "American Comfort Food",
  "Adventurous, Energized, Flavor central, Midnight feasting, Go heavy or go home":
    "Fusion Cuisine",
  "Satisfied, Warm, Warm soup and noodles, Dinner. Good dinner, no stress, Fresh air and good food, yes please":
    "Asian Noodle Dish",
  "Curious, Content, Can you add more cheese?, Meh, lunch, hungry but not hungry, Let’s indulge in a luxury":
    "Italian Pasta",
  "bOUGIE af, Full, In my penthouse about to host a singles-only party, Midnight feasting, Family-style Fine Dining":
    "Gourmet Dishes",
  "Got 1 buck, Cheap af, Snackity snacking, Midnight feasting, Fast Food":
    "Fast Food",
  "10-15, no more, Mid mid mid, Dinner. Good dinner, no stress, Casual Dining":
    "Casual Dining",
  "Too early for this shi-, Cozy, Let’s keep it laid-back and chill, Light Brunch":
    "Breakfast Brunch",
  "Go heavy or go home, Carnivorous steak, Midnight feasting, Steakhouse Meal":
    "Steakhouse Meal",
  "Bathing in the sunlight about to take the biggest nap ever, Dinner. Good dinner, no stress, Relaxed Summer Dinner":
    "Relaxed Summer Dinner",
  "Frolicking around grassy plains in the middle of nowhere, Casual Dining":
    "Picnic Food",
  "Culture shocked, At the beach about to take those Polaroids, Mexican Street Food":
    "Global Street Food",
  "Satisfied, Warm, Indian Butter Chicken, Go heavy or go home, Full, Rich Indian Comfort Food":
    "Indian Butter Chicken",
};

let currentQuestion = 0;
let answers = [];

function displayQuestion() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = `<h2>${questions[currentQuestion].question}</h2>`;

  questions[currentQuestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => selectAnswer(option);
    quizDiv.appendChild(button);
  });
}

function selectAnswer(option) {
  answers.push(option);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const resultDiv = document.getElementById("result");
  const key = answers.join(", ");
  resultDiv.innerText = `You are feeling like: ${
    results[key] || "a mix of flavors!"
  }`;
}

document.getElementById("nextButton").onclick = displayQuestion;

displayQuestion();
