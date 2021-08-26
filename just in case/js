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
    homePage.classList.add("hidden");
    questionsEl.classList.remove("hidden");

    timerID = setInterval(function() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            submitScore();
        }
    }, 1000);

    timerEl.textContent = time;
    timerEl.classList.add("titleSelection");

    showQuestions();
}

function showQuestions() {
    var titleEl = document.getElementById("questionTitle");
    titleEl.classList.add("titleSelection");
    titleEl.textContent = quizQuestions[currentQuestion].question;

    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";

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
    if(currentQuestion < 3) {
        currentQuestion++;
        showQuestions();
    } else {
        submitScore();
    }
};

function submitScore() {
    clearInterval(timerID)
    currentQuestion = 0
    submitScoreEl.classList.remove("hidden");
    questionsEl.classList.add("hidden");
    var scoredPoints = document.getElementById("scoredPoints");
    scoredPoints.textContent = time
}

function showHighScores() {
    homePage.classList.add("hidden");
    highscoreEl.classList.remove("hidden");

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function saveHighscores() {
    if (initialsEl.value !== ""){
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            initials: initialsEl.value,
            score: time
        };
    }

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    submitScoreEl.classList.add("hidden");
    showHighScores();
}

function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscores();
    }
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}  

function goBack() {
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