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
<<<<<<< HEAD
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
=======
]

var SCORE_POINTS = 3
var MAX_QUESTIONS = 4
var player_score = 0
var question_counter = 0
var time_remaining = 50
var PENALTY = 7
var hold_interval = 0
var current_question = {}
var available_questions = []

btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});
// Time set

function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}

function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    // questionanswers.innerHTML=""
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
function correction(response) {
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")
    }
    setTimeout(function(){
        alert.innerText=""
        }, 1000);
}
 function endgame() {
    // btnStart.classList.add("d-none")
    myScore.innaText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")
 }
>>>>>>> 862e552d09bcea8222c24949efd95ae731173f53
