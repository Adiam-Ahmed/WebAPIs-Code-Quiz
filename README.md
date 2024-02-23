## Quiz State Variables


- "currentQuestionIndex": Keeps track of the index of the current question.

- "time": Tracks the remaining time for the quiz.

- "intervalId": Holds the interval ID for the timer.

- "initialsValue": Stores the value entered by the user for initials.


## DOM Elements


DOM elements are referenced to interact with the HTML structure of the quiz app:


- "timerId": Element to display the timer.

- "feedback": Element to display feedback (correct/wrong).

- "questionsEl": Container for the quiz questions.

- "startButton": Button to start the quiz.

- "startScreen": Start screen section.

- "questionsScreen": Questions screen section.

- "questionTitle": Element to display the current question.

- "choices": Container for displaying answer choices.

- "endScreen": End screen section.

- "finalScore": Element to display the final score.

- "initials": Input field to enter initials.


## Sound Effects


Sound effects are referenced for providing auditory feedback on user actions.


- "sfxRight": Sound effect for correct answers.

- "sfxWrong": Sound effect for wrong answers.


## Functions


- "startQuiz()": Initializes the quiz by setting up event listeners and starting the timer.

- "getQuestion()": Displays the current question and its choices.

- "questionClick(event)": Handles user clicks on answer choices.

- "quizEnd()": Ends the quiz, stops the timer, and displays the final score.

- "clockTick()": Updates the timer every second.

- "saveHighScore()": Saves the user's high score to local storage.

- "checkForEnter(event)": Handles the user pressing the Enter key to submit initials.


## Usage


To start the quiz, click on the "Start" button. Answer the questions within the given time frame. After answering all questions or when the time runs out, enter your initials to save your high score.


Enjoy the quiz!