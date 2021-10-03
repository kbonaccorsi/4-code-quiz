const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const submitQuizButton = document.getElementById("submit-quiz-btn");
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
const resultsContainerEl = document.getElementById("results");

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true},
            { text: "HyperText Multiple Language", correct: false},
            { text: "HyperTyping Multiple Lines", correct: false},
            { text: "HyperTyping Markup Lines", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Case Sensitive Styling", correct: false},
            { text: "Current Styling Sheet", correct: false},
            { text: "Cascading Style Sheet", correct: true},
            { text: "Cascading Sensitive Styling", correct: false}
        ]
    },
    {
        question: "What does HTML do?",
        answers: [
            { text: "Makes the page interactive", correct: false},
            { text: "Puts the text onto the page", correct: true},
            { text: "Decorates the page", correct: false},
            { text: "Saves the page to storage", correct: false}
        ]
    },
    {
        question: "What does local storage do?",
        answers: [
            { text: "saves key-value pairs in the web browser only until the page is refreshed", correct: false},
            { text: "saves console.log", correct: false},
            { text: "saves files to the hardrive", correct: false},
            { text: "Saves key-value pairs in the web browser even after the page has been refreshed", correct: true}
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

let secondsLeft = 120;

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
let points = 0;

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        let plus= 2;
        points = timerInterval +2;
    } else {
        element.classList.add("incorrect");
    };
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
};

function showResults() {
    
}

var scores = [];

function renderScores() {
    initialsListEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = (score + "initials");
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
    
    const scoreText = initialsTextEl.value.trim();

    if (scoreText === "") {
        return;
    }

    scores.push(scoreText);
    initialsTextEl.value = "";

    storeScores();
    renderScores();
});

init()