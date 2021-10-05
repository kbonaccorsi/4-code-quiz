# 4-code-quiz

Task: Build a timed multiple choice coding quiz that will run in the browser, and feature dynamically updated HTML and CSS powered by JavaScript code.  The user interface needs to be clean, polished, and responsive.

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

GIVEN I am taking a code quiz:

WHEN I click the start button
THEN a timer starts and I am presented with a question
    //make start button that disappears when clicked
        //button Start
        //button data-status: visible
        //addEventGenerator ("click", start button)
        //button data-status: hidden
    //timer counts down at 1 second intervals
        //when - addEventGenerator ("click", start button)
        //timer countdown begins
        //timer displays 
            //If (timerCountDown > 1) {
                display ("You have " + timerCountDown + " seconds remaining")
                }else if (timerCountDown = 1) {
                display ("You have " + timerCountDown + " second remaining")
                }else {
                display (scoreboard)
                }
        //timer display updates every second
    //first question appears as soon as start button is clicked
        // question data-status: hidden
        //when - addEventGenerator ("click", start button)
        //question data-status: visible
    //question container includes the question, and 4 answer choices with buttons.
        // div questionContainer
            // header says question # and question
                //div answers
                    button A - answer choice
                    button B - answer choice
                    button C - answer choice
                    button D - answer choice
        //add a next button for user to press and proceed to the next question
            //event.preventDefault();

WHEN I answer a question
THEN I am presented with another question
    //next button data-status: hidden 
    //button addEventGenerator("click", answerchoicebutton)
    //next button data-status: visible
    // create let correct = ("You got it!")
    // create let incorrect = ("Better luck next time")
    //if (answerChoiceButton = true) {
        return(let correct)
    } else {
        return(let incorrect)
    }
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
    //if (answerChoiceButton = true) {
        return(let correct)
        timerCountDown +2
    } else {
        return(let incorrect);
        timerCountDown -2
    }
    //Add time when users get questions correct

WHEN all questions are answered or the timer reaches 0
THEN the game is over
    //when { questions are answered || timerCountDown=0}
    

WHEN the game is over
THEN I can save my initials and my score
    //prompt("Type your initials into the box to save your score")
    //attach API to give a place for initials to be stored
        //localStorage.setItem
        //highscore object holding array with name:score

After putting initals into box, link to a new screen
new screen needs to have list of highscores, an okay button, and a clear highscores button


URL:  https://kbonaccorsi.github.io/4-code-quiz/

Screenshot: ![Quiz App](https://user-images.githubusercontent.com/86372011/136044559-1e781f4f-f2a6-41e1-ad6e-e61c54a8e61b.gif)

