const questions = [
    {
        question: "What kind of mood are you in?",
        options: [
            "Cozy",
            "Adventurous",
            "Satisfied",
            "Curious",
            "Playful",
            "Indulgent"
        ]
    },
    {
        question: "What do you want to feel after your meal?",
        options: [
            "Full",
            "Refreshed",
            "Warm",
            "Satisfied",
            "Energized",
            "Content"
        ]
    },
    // Add more questions similarly
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
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `<h2>${questions[currentQuestion].question}</h2>`;
    
    questions[currentQuestion].options.forEach(option => {
        const button = document.createElement('button');
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
    const resultDiv = document.getElementById('result');
    const key = answers.join(', ');
    resultDiv.innerText = `You are feeling like: ${results[key] || "a mix of flavors!"}`;
}

document.getElementById('nextButton').onclick = displayQuestion;

displayQuestion();