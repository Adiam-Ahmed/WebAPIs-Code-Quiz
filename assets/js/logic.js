// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let intervalId=0;
let initialsValue = "";


// add variables to reference DOM elements
// example is below
let timerId = document.getElementById("time");
let feedback = document.getElementById("feedback")
let questionsEl = document.getElementById('questions');
let startButton = document.getElementById("start");
let startScreen = document.getElementById("start-screen");
let questionsScreen = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let choices = document.getElementById("choices");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials")
// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  startButton.addEventListener("click",function () { // Add event listener to start button
    startScreen.classList.add("hide"); // hide start screen
    questionsScreen.classList.remove("hide");  // un-hide questions section
    intervalId = setInterval(() => {  // Start timer
      clockTick(); // Call clockTick() every second
    }, 1000);
  });
  getQuestion(); // call a function to show the next question
}

function getQuestion() {
  const currentQuestion = questions[currentQuestionIndex]; // Get the current question object from the array based on the current index
  if (currentQuestion) {
    questionTitle.innerHTML = currentQuestion.title;  // Update title with current question
    choices.innerHTML = "" // clear out any old question choices
    currentQuestion.choices.forEach(choice=>{ // loop over the choices for each question
      const choiceButton = document.createElement("button"); // create a new button for each choice,
      choiceButton.textContent = choice; // Set the text content for the button 
      choiceButton.value = choice; // // Set the value for the button 
      choiceButton.classList.add("choices");// Append the choice button to the choices container
      choices.appendChild(choiceButton);
      choiceButton.addEventListener('click', function(event) { // Add event listener to each choice button
        questionClick(event);  // Call the questionClick function when a choice is clicked
      });
    })
    
  } else {
    quizEnd();
  }  
}

function questionClick(event) {
  const selectedChoice = event.target.textContent; // Identify the targeted button that was clicked on
  const currentQuestion = questions[currentQuestionIndex];  // Identify current questions
  if (selectedChoice !== currentQuestion.answer) { // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
    time -= 15;
    sfxWrong.play();  // play "wrong" sound effect
    feedback.classList.remove("hide")
    feedback.innerHTML = "Wrong!"  // display "wrong" feedback on page
    setTimeout(() => {
      feedback.classList.add("hide")
    }, 500);
  } else {
    sfxRight.play() //play "right" sound effect
    feedback.classList.remove("hide")
    feedback.innerHTML = "Correct!"  // display "correct" feedback on page
    setTimeout(() => {
      feedback.classList.add("hide")
    }, 500);
    if (currentQuestionIndex === questions.length || time <= 0  ) { // check if we've run out of questions and  if the time is less than zero 
      quizEnd() //call a function that ends the quiz 
    } else { // or else get the next question
      currentQuestionIndex++; // move to next question
      getQuestion();
    }
  }
}

// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  clearInterval(intervalId); // stop the timer
  questionsScreen.classList.add("hide"); // hide the "questions" section
  endScreen.classList.remove("hide"); // show end screen
  finalScore.innerHTML = time; // show final score
  timerId.innerHTML = time; 
  
}

// Start the quiz
startQuiz();
// add the code in this function to update the time, it should be called every second
function clockTick() {
  time--; // Update time
  timerId.innerHTML = time;  // Update the element to display the new time value
  // Check if user ran out of time
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd(); // Call the quizEnd() function
  }

}

function saveHighScore() {
  // Get the value of the initials input box
  var initials = document.getElementById('initials').value.trim();

  // Make sure the value of the initials input box wasn't empty
  if (initials !== "") {
    // Check if there are high scores stored in local storage
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // Add the new initials and high score to the array
    highscores.push({ initials: initials, score: time });

    // Sort highscores by score property in descending order
    highscores.sort(function (a, b) {
      return b.score - a.score;
    });

    // Store the high score in local storage
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // Redirect the user to the high scores page
    window.location.href = "highscores.html";
  }
}

// Use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighScore();
  }
}

// User clicks button to submit initials
var submitBtn = document.getElementById('submit');
submitBtn.onclick = saveHighScore;


// Get the initials element
var initialsEl = document.getElementById('initials');
initialsEl.onkeyup = checkForEnter;