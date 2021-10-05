
//global variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const introductionContainerEl = document.getElementById("introduction-container");
const introductionEl = document.getElementById("introduction");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonEl = document.getElementById("answer-buttons");
const timerEl = document.getElementById("timer");
const highscoreContainerEl = document.getElementById("highscore-container");
const initialsFormEl = document.getElementById("initials-form");
const initialsTextEl = document.getElementById("initials-text");
const initialsListEl = document.getElementById("initials-list");

//question array with each question and answer choices listed in object
const questions = [
    {
        question: "What does a single line comment begin with?",
        answers: [
            { text: "//", correct: true},
            { text: "/*", correct: false},
            { text: "<--", correct: false},
            { text: "<!>", correct: false}
        ]
    },
    {
        question: "What keyword can be used for a variable?",
        answers: [
            { text: "array", correct: false},
            { text: "element", correct: false},
            { text: "let", correct: true},
            { text: "function", correct: false}
        ]
    },
    {
        question: "Which is a data type?",
        answers: [
            { text: "function", correct: false},
            { text: "boolean", correct: true},
            { text: "variable", correct: false},
            { text: "message", correct: false}
        ]
    },
    {
        question: "What is it called when you put 2 or more strings together?",
        answers: [
            { text: "data type", correct: false},
            { text: "boolean", correct: false},
            { text: "function", correct: false},
            { text: "concatination", correct: true}
        ]
    },
    {
        question: "What does a loop do?",
        answers: [
            { text: "runs a block of code until a certain condition is met", correct: true},
            { text: "a single task within a defined block", correct: false},
            { text: "calls functions", correct: false},
            { text: "collects properties", correct: false}
        ]
    },
];

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

//instructions screen shows everything in the instruction container
function instructions () {
    introductionContainerEl.classList.remove("hide");
};

//calls the instructions function to happen
instructions ()

//timer
let timerInterval;
let secondsLeft = 120;
function setTimer () {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds remaining";
        if(secondsLeft === 1) {
            timerEl.textContent = secondsLeft + " second remaining";
        }else if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.classList.add("hide");
            questionContainerEl.classList.add("hide");
            nextButton.classList.add("hide");
            startButton.classList.remove("hide");
        }
    }, 1000);
};

//Start the game: questions are shuffled, timer begins countdown, questions appear
function startGame () {
    startButton.classList.add("hide");
    introductionContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    secondsLeft = 120;
    questionContainerEl.classList.remove("hide");
    timerEl.classList.remove("hide");
    setNextQuestion()
    setTimer ()
};

//Sets up the next quesion by reseting the background, and resetting the correct answer choice for the next question
function setNextQuestion() {
    resetState()
showQuestion(shuffledQuestions[currentQuestionIndex]);
};

//Show the question, and grid of answer choices, checking for which answer choice has the class of correct
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer);
        answerButtonEl.appendChild(button);
    });
};

//resets the background, along with which answer choice is marked as correct, to prepare for the next question
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    };
};

// select answer and determine what happens if the answer is correct, or else (incorrect)
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    //if there are more questions to shuffle, they will be shuffled, and the next button will appear
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    // if all questions have been answered, the user will be able to type their initials to add them to the scoreboard
    } else {
        clearInterval(timerInterval);
        questionContainerEl.classList.add("hide");
        nextButton.classList.add("hide");
        highscoreContainerEl.classList.remove("hide");
        initialsFormEl.classList.remove("hide");
        initialsListEl.classList.add("hide");
    };
};

// if the answer selected is correct, 10 seconds will be added to the time, if answer selected is incorrect 10 seconds will be subtracted from the time.
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        secondsLeft += 10;
        ;
    } else {
        element.classList.add("incorrect");
        secondsLeft -= 10;
        
    };
};

//clears the currently selected answer choice to prepare for the next question
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
};

var scores = [];

// coming up with the score: user inputs their initials, and the seconds remaining on the timer are added to their initials to document their score
function renderScores() {
    initialsListEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = (score);
        li.setAttribute("data-index", i);

        initialsListEl.appendChild(li);
    };
};

//saving the scores(user input + time)
function init() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scores = storedScores;
    };

    renderScores()
};

function storeScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

initialsTextEl.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    event.preventDefault();
    initialsListEl.classList.remove("hide");
};
});


//what happens when submit is pressed
submitButton.addEventListener("click", function() {
    initialsFormEl.classList.add("hide");
    submitButton.classList.add("hide");
    initialsListEl.classList.remove("hide");
    const scoreText = (initialsTextEl.value.trim() + ": " + secondsLeft);

    if (scoreText === "") {
        return;
    };

    //put the score onto the page under the previous scores
    scores.push(scoreText);
    initialsTextEl.value = "";

    storeScores();
    renderScores();
});

init()