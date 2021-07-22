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

function startGame() {
    question_counter = 0
    player_score = 0
    available_questions = quiz_questions.length
    getNewQuestion()
}

function getNewQuestion() {
    
}