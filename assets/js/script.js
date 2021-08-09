var question = document.querySelector("#question")
var choices = document.querySelector("#question-container")
var question = document.querySelector("#enter-scores")
var current_time = document.querySelector("#current_time")

var quiz_questions = [
    {
        question: 'Who am I',
        a: 'Me',
        b: 'Myself',
        c: 'I',
        d: 'Him',
        correct: 'a'
    }, {
        question: 'Who am I',
        a: 'Me',
        b: 'Myself',
        c: 'I',
        d: 'Him',
        correct: 'b'
    }, {
        question: 'Who am I',
        a: 'Me',
        b: 'Myself',
        c: 'I',
        d: 'Him',
        correct: 'c'
    }, {
        question: 'Who am I',
        a: 'Me',
        b: 'Myself',
        c: 'I',
        d: 'Him',
        correct: 'd'
    }
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