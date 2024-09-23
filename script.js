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
  "Cozy, Full": "Italian",
  "Adventurous, Refreshed": "Thai",
  "Satisfied, Warm": "Indian",
  "Curious, Energized": "Vietnamese",
  // Add more combinations
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
