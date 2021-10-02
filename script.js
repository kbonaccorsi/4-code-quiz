// global variables
var intro = document.querySelector(".introduction");
var questionEl = document.querySelector(".questions");
var choiceEl = document.querySelector(".choices");
var answerEl = document.querySelector(".answer");
var timeEl = document.querySelector(".time");
var secondsLeft=120;

// functions

//function controls the timer
function countdownTimer() {
    var timeInterval = setInterval(() => {
        if (secondsLeft > 1) {
            timeEl.textContent = secondsLeft + " seconds remaining";
            //decrease timer by 1
            timeLeft--;
        } else if (secondsLeft === 1) {
            timeEl.textContent = secondsLeft + " second remaining";
            secondsLeft--;
        } else {
            timeEl.textContent = "";
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 12000);
}

//controls the question, choices, and answer.
var index = 0;
//create an array of questions/choices/answers array
var questions = [
    { 
    question: "1",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {
    question: "2",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "3",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "4",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "5",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "6",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "7",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "8",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "9",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
    {question: "10",
    answerChoices: ["a","b","c","d"],
    correctAnswer: "a",
    },
]
index++;
//index =1
questionEl.textContent= questions[index].question;
choiceEl.textContent= questions[index].answerChoices;
answerEl.textContent= questions[index].correctAnswer;


//for loop for answerChoices
//create a button for each item
//.textContent to display value to each button


// process

