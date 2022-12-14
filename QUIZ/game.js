const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '23',
        answer: 2,
    },
    {
        question: "What is 21 + 2?",
        choice1: "24",
        choice2: "4",
        choice3: "21",
        choice4: "23",
        answer: 4,
    },
    {
        question: "What is 19 + 2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "23",
        answer: 3,
    },
    {
        question: "What is 0 + 2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "23",
        answer: 1,
    },
    {
        question: "What is 2 + 32?",
        choice1: "2",
        choice2: "34",
        choice3: "21",
        choice4: "23",
        answer: 2,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    /* progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%' */

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
    'incorrect'

    if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            alert("Time is Up")
            localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
                timer = duration;
            }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 30 * 1,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};



startGame()