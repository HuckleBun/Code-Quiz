var homePage = document.getElementById("home-page");
var questionsEl = document.getElementById("questions");
var submitScoreEl = document.getElementById("submitScore");
var initialsEl = document.getElementById("initialInput")
var submitBtn = document.getElementById("submitButton")
var highscoreEl = document.getElementById("hs-page");
var startBtn = document.getElementById("start-quiz");
var scoresBtn = document.getElementById("highscore");
var backBtn = document.getElementById("back");
var timerEl = document.getElementById("time");
var clearScores = document.getElementById("clearScore")

var quizQuestions = [
    {
        question: 'Which of the following tags is used to insert a blank line?',
        choices: ['<br>', '<div>', '<h1>', '<p>'],
        correct: '1'
    }, {
        question: 'Items in a(n) __ list are preceded by numbers.',
        choices: ['Unordered', 'Bulleted', 'Ordered', 'Grocery'],
        correct: '3'
    }, {
        question: 'How do you add a comment in a CSS file?',
        choices: ['/* this is a comment */', '// this is a comment //', '<! this is a comment >', '// this is a comment'],
        correct: '1'
    }, {
        question: 'The # symbol specifies that the selector is?',
        choices: ['class', 'tag', 'first', 'id'],
        correct: '4'
    }
];

var time = quizQuestions.length * 15;
var TIME_DEDUCTION = 7;
var currentQuestion = 0;
var timerID;

function startQuiz() {
    /*Once started, remove home page and show questions page*/
    homePage.classList.add("hidden");
    questionsEl.classList.remove("hidden");

    /*Create the timer for the quiz*/
    timerID = setInterval(function() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            submitScore();
        }
    }, 1000);

    timerEl.textContent = time;
    timerEl.classList.add("titleSelection");

    /*Start the actual quiz*/
    showQuestions();
}

function showQuestions() {
    /* Gets the question from quizQuestions */
    var titleEl = document.getElementById("questionTitle");
    titleEl.classList.add("titleSelection");
    titleEl.textContent = quizQuestions[currentQuestion].question;

    /* Clears all the answers for each question so that they don't stack between changes */
    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";

    /* Create each button with their given attributes */
    for(var i = 0; i < 4; i++) {
        var choice = document.createElement("button");
        choice.onclick = chooseQuestion;
        choice.setAttribute("id", i + 1);
        choice.textContent = quizQuestions[currentQuestion].choices[i];
        choice.addEventListener("click", nextQuestion);
        choice.classList.add("buttonSelection");
        choicesEl.appendChild(choice);
    }
}

function chooseQuestion() {
    /* Determine if the answer that has been clicked is correct or incorrect */
    if (this.id === quizQuestions[currentQuestion].correct) {
        this.setAttribute("class", "correctAnswer");
    } else {
        time -= TIME_DEDUCTION;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        this.setAttribute("class", "incorrectAnswer");
    }
};

function nextQuestion() {
    /* Keep adding to currentQuestion until it has reached every question */
    if(currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestions();
    } else {
        /* If the last answer was chosen, show the score submittion page */
        submitScore();
    }
};

function submitScore() {
    /* Reset the timer and the currentQuestion index */
    clearInterval(timerID)
    currentQuestion = 0

    /* Show the score submittion page and hide the questions page */
    submitScoreEl.classList.remove("hidden");
    questionsEl.classList.add("hidden");

    /* Show the user their score at the end of the quiz */
    var scoredPoints = document.getElementById("scoredPoints");
    scoredPoints.textContent = time
}

function showHighScores() {
    /* Hide the home page and show the highscores page */
    homePage.classList.add("hidden");
    highscoreEl.classList.remove("hidden");

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    /* Sort each highscore from highest to lowest */
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    /* Create the space for the highscore and append it to the highscores page */
    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function saveHighscores() {
    /* As long as the user initial input isn't blank, save initials and score to localStorage */
    if (initialsEl.value !== ""){
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            initials: initialsEl.value,
            score: time
        };
    }

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    /* Once submitted, hide the submittion page and open the highscores page */
    submitScoreEl.classList.add("hidden");
    showHighScores();
}

/* Allow for user to hit enter instead of clicking the submit button from the submittion page */
function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscores();
    }
}

function clearHighscores() {
    /* Remove all highscores and reload the whole page */
    window.localStorage.removeItem("highscores");
    window.location.reload();
}  

function goBack() {
    /* Return to the home page and reload the page */
    homePage.classList.remove("hidden");
    highscoreEl.classList.add("hidden");
    window.location.reload();
}

clearScores.onclick = clearHighscores;
initialsEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscores;
startBtn.onclick = startQuiz;
scoresBtn.onclick = showHighScores;
backBtn.onclick = goBack;
