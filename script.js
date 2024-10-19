// Object to store user's answers
const userAnswers = {};
let currentQuestion = 0;
let answers = [];

// Questions with pixel art and options
const questions = [
  {
    question: "What mood are you in today?",
    image: "images/pixel_cozy.png", // Pixel art for mood
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
    image: "images/pixel_energized.png", // Pixel art for meal feeling
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
    image: "images/pixel_money.png", // Pixel art for budget
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
    image: "images/pixel_imagination.png", // Pixel art for imagination
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
    image: "images/pixel_clock.png", // Pixel art for time of day
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
    image: "images/pixel_vibe.png", // Pixel art for vibe
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

// Expanded results based on combinations of answers
const results = {
  // Cozy and relaxed combinations
  "cozy and relaxed, comfortably full, barely got a dollar, early morning, laid-back and chill": "Waffle house, ramen, or eggs at home...just go home",
  "cozy and relaxed, comfortably full, keeping it under $15, afternoon snack time, laid-back and chill": "Hearty soups, grilled cheese sandwiches, or deli-style sandwiches",
  "cozy and relaxed, refreshed and light, staying budget-friendly, dinner but keeping it calm, good dinner, no stress, just relaxation": "Fresh salads, baked chicken, or simple pasta dishes",
  "cozy and relaxed, completely satisfied, splurging a little today, late morning, indulging in a little luxury": "Decadent brunch with stuffed French toast, mimosas, and gourmet pastries",
  "cozy and relaxed, warm and cozy, mid-range budget, chilling at the beach, dinner but keeping it calm": "Comforting BBQ ribs, grilled corn, and loaded baked potatoes, Mexican",

  // Ready for an adventure combinations
  "ready for an adventure, energized for the rest of the day, splurging a little today, dinner time, indulging in a little luxury": "Fusion cuisine like Asian tacos or Indian pizza",
  "ready for an adventure, completely satisfied, staying budget-friendly, exploring a new culture, late morning, enjoying fresh air and great food": "Dim sum, street food-style tacos, or sushi",
  "ready for an adventure, comfortably full, mid-range budget, basking in the sunshine, about to nap, snack time, laid-back and chill": "Mediterranean wraps, grilled kebabs, or poke bowls",
  "ready for an adventure, completely satisfied, mid-range budget, exploring a new culture, midnight craving, indulging in a little luxury": "Indian curry, tandoori chicken, halal food, chai, cheesecake",
  "ready for an adventure, comfortably full, keeping it under $15, basking in the sunshine, about to nap, snack time, enjoying fresh air and great food": "Vietnamese banh mi, fresh spring rolls, Chipotle",
  "ready for an adventure, completely satisfied, barely got a dollar, chilling at the beach, late morning, laid-back and chill": "Fish tacos, street corn, or a simple poke bowl",
  "ready for an adventure, energized for the rest of the day, mid-range budget, exploring a new culture, snack time, indulging in a little luxury": "Korean fried chicken, bibimbap, or sushi burritos",

  // Feeling satisfied combinations
  "feeling satisfied, warm and cozy, keeping it under $15, late morning, sharing food and bonding with friends": "Warm Korean food like bibimbap or comforting ramen",
  "feeling satisfied, refreshed and light, staying budget-friendly, relaxing by a waterfall, dinner but keeping it calm": "Fresh seafood, light pasta dishes, or fresh hearty Italian soups",
  "feeling satisfied, completely satisfied, splurging a little today, chilling at the beach, dinner time, enjoying fresh air and great food": "Japanese noodles, tom yum soup, or rice/curry ending off with mochi",

  // Curious about something new combinations
  "curious about something new, full, basking in the sunlight, budget-friendly, dinner time, enjoying fresh air": "BBQ meats, bibimbap, or fish and chips",
  "curious about something new, refreshed and light, exploring a new culture, afternoon snack time, enjoying fresh air and great food": "Greek gyros, Turkish kebabs, or Lebanese wraps",
  "curious about something new, completely satisfied, keeping it under $15, frolicking in grassy fields, snack time, laid-back and chill": "Deli sandwiches, falafel wraps, or veggie tacos",

  // Playful and energetic combinations
  "playful and energetic, comfortably full, at a rooftop party in the city, splurging a little today, late morning, bonding over food": "Upscale brunch dishes like lobster benedict or gourmet avocado toast",
  "playful and energetic, content and happy, frolicking in grassy fields, barely got a dollar, snack time, laid-back and chill": "Burgers, loaded fries, or food truck-style meals",
  "playful and energetic, comfortably full, mid-range budget, chilling at the beach, midnight snacking under the stars": "Tacos, sushi rolls, or Korean BBQ",
  "playful and energetic, energized for the rest of the day, mid-range budget, basking in the sunshine, afternoon snack time, enjoying fresh air and great food": "Grilled veggie wraps, fresh smoothies, or acai bowls",
  "playful and energetic, comfortably full, splurging a little today, frolicking in grassy fields, midnight snacking under the stars": "Gourmet sliders, hotpot, loaded nachos, or caramel popcorn",
  "playful and energetic, completely satisfied, keeping it under $15, chilling at the beach, afternoon snack time, laid-back and chill": "Beignets, street-style pizza, or donuts",

  // Indulgent and luxurious combinations
  "indulgent and luxurious, comfortably full, rooftop party in the city, splurging a little today, midnight craving, indulging in a little luxury": "KBBQ, sushi, or truffle mac and cheese with a rich dessert",
  "indulgent and luxurious, completely satisfied, money's no issue, basking in the sunshine, about to nap, dinner time, indulging in a little luxury": "Gourmet steak, lobster thermidor, or truffle pasta",
  "indulgent and luxurious, warm and cozy, keeping it under $15, exploring a new culture, dinner time, indulging in a little luxury": "Exotic street food like Moroccan tagine, pho, or ramen with a gourmet twist",
  "indulgent and luxurious, comfortably full, splurging a little today, relaxing by a waterfall, dinner time, indulging in a little luxury": "Wagyu beef steak, lobster tail, and truffle mashed potatoes",
  "indulgent and luxurious, full, money's no issue, exploring a new culture, snack time, indulging in a little luxury": "Sushi omakase, foie gras sliders, or caviar-topped oysters",

  // Barely got a dollar combinations
  "barely got a dollar, comfortably full, chilling at the beach, afternoon snack time, midnight snacking under the stars": "Fast food like pizza, Taco Bell, or cheeseburgers and fries",
  "barely got a dollar, completely satisfied, snack time, enjoying fresh air and great food": "Banh mi, street tacos, or cheap ramen",
  "barely got a dollar, energized for the rest of the day, frolicking in grassy fields, late morning, laid-back and chill": "Bagels, donuts, or budget sandwiches",
  "cozy and relaxed, warm and cozy, barely got a dollar, basking in the sunshine, snack time, laid-back and chill": "Simple grilled cheese, tomato soup, or pancakes from a diner",
  "cozy and relaxed, completely satisfied, staying budget-friendly, frolicking in grassy fields, dinner time, good dinner, no stress, just relaxation": "Lasagna, spaghetti with meatballs, or a hearty shepherd's pie",

  // Splurging combinations
  "splurging a little today, comfortably full, rooftop party in the city, late morning, indulging in a little luxury": "Upscale brunch with mimosas, eggs benedict, or French toast",
  "splurging a little today, energized for the rest of the day, exploring a new culture, late morning, bonding over food": "Gourmet street food like bao buns, gyros, or fusion tacos",
  "splurging a little today, comfortably full, keeping it under $15, exploring a new culture, dinner time, indulging in a little luxury": "KBBQ, sushi, or gourmet pizzas",
  "ready for an adventure, completely satisfied, mid-range budget, relaxing by a waterfall, late morning, indulging in a little luxury": "Pho, ramen, or spicy Thai curry",
};

// Function to display the current question
function displayQuestion() {
  const quizDiv = document.getElementById("quiz");

  // Clear previous content
  quizDiv.innerHTML = '';

  // Create a container for the question and GIFs
  const questionContainer = document.createElement("div");
  questionContainer.classList.add('question-container');

  // Add left GIF
  const leftGif = document.createElement("img");
  leftGif.src = "https://media.tenor.com/PjmKRWnNSEsAAAAC/soup-noodles.gif"; // Left GIF for each question
  leftGif.alt = "Soup Noodles GIF";
  leftGif.classList.add('left-gif');

  // Add right GIF
  const rightGif = document.createElement("img");
  rightGif.src = "https://media.tenor.com/VLPT0wfRwvIAAAAC/pixel-art-bagel.gif"; // Right GIF for each question
  rightGif.alt = "Bagel GIF";
  rightGif.classList.add('right-gif');

  // Add the pixel art image
  const questionImage = document.createElement("img");
  questionImage.src = questions[currentQuestion].image; // Set the pixel art image for the question
  questionImage.alt = "Cute pixel art for the question";
  questionImage.style.width = "100px"; // Adjust the image size
  questionImage.style.display = "block";
  questionImage.style.margin = "0 auto 20px";

  // Add the question text
  const questionText = document.createElement("h2");
  questionText.innerText = questions[currentQuestion].question;

  // Add the options as buttons
  const optionsContainer = document.createElement("div");
  questions[currentQuestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => selectAnswer(option);
    button.style.marginBottom = '10px'; // Space between buttons
    optionsContainer.appendChild(button);
  });

  // Add all elements to the question container
  questionContainer.appendChild(leftGif);
  questionContainer.appendChild(questionText);
  questionContainer.appendChild(questionImage);
  questionContainer.appendChild(optionsContainer);
  questionContainer.appendChild(rightGif);

  // Append the question container to the quiz div
  quizDiv.appendChild(questionContainer);
}

// Function to handle answer selection
function selectAnswer(option) {
  // Save the selected answer
  answers.push(option);

  // Move to the next question or show the result
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Function to calculate and display the result based on user answers
function showResult() {
  const quizDiv = document.getElementById("quiz");
  const resultDiv = document.getElementById("result");

  // Create a combination key from the user's answers
  const combination = answers.join(", ").toLowerCase();

  // Display the result based on the combination
  const result = results[combination] || "Sandwiches, donuts, curry, or noodles work for now!";
  
  // Clear quiz content
  quizDiv.innerHTML = ''; 

  // Add result text with surrounding GIFs
  resultDiv.innerHTML = `
    <div class="result-container">
      <div class="result-gif-left">
        <img src="https://tenor.com/view/8-bit-pixel-art-eating-pizza-pizza-hut-pizza-time-gif-12678309689695324826" alt="Pizza Eating GIF" class="gif-left-result">
      </div>
      <div class="result-text">
        <h2>Your Food Match:</h2>
        <p>${result}</p>
      </div>
      <div class="result-gif-right">
        <img src="https://tenor.com/view/smolverse-smol-transform-swol-gif-4386360776273237318" alt="Smolverse GIF" class="gif-right-result">
      </div>
    </div>
  `;
}

// Start the quiz by displaying the first question
displayQuestion();