

//global variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn")
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
            { text: "const", correct: false},
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

function instructions () {
    introductionContainerEl.classList.remove("hide");
};

instructions ()

let timerInterval;
let secondsLeft = 120;

function setTimer () {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds remaining";
        if(secondsLeft === 1) {
            timerEl.textContent = secondsLeft + " second remaining";
        }else if (secondsLeft === 0) {
            clearInterval(timerInterval);
            questionContainerEl.classList.add("hide");
        }
    }, 1000);
};

function startGame () {
    startButton.classList.add("hide");
    introductionContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion()
    setTimer ();
}

function setNextQuestion() {
    resetState()
showQuestion(shuffledQuestions[currentQuestionIndex]);
}

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

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    };
};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        clearInterval(timerInterval);
        questionContainerEl.classList.add("hide");
        nextButton.classList.add("hide");
        highscoreContainerEl.classList.remove("hide");
    }
}

//adjust list to only have ten scores
//adjust list to order by score, and add scores after list is full
//adjust scores to seconds left +2

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        //points = 2;
        //secondsLeft = secondsLeft + points;
    } else {
        element.classList.add("incorrect");
        //secondsLeft = secondsLeft + points;
    };
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
};

var scores = [];

function renderScores() {
    initialsListEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = (score);
        li.setAttribute("data-index", i);

        initialsListEl.appendChild(li);
    }
}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scores = storedScores;
    }

    renderScores();
}

function storeScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

submitButton.addEventListener("click", function() {
    
    const scoreText = (initialsTextEl.value.trim() + ": " + secondsLeft);

    if (scoreText === "") {
        return;
    }

    scores.push(scoreText);
    initialsTextEl.value = "";

    storeScores();
    renderScores();
});

init()