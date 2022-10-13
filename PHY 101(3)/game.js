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
        question: 'A wire is 75.0 cm and the diameter of its circular cross section is o.550 mm. If an attached 25.0 kg weight causes it to stretch by 1.10 mm calculate the stress and strain of the wire.?',
        choice1: '4.12 × 109 N/m2 , 0.15%',
        choice2: '1.24 × 109 N/m2 , 0.15%',
        choice3: '1.03 × 109 N/m2 , 0.15%',
        choice4: '0.52 × 109 N/m2 , 0.15%',
        answer: 3,
    },
	{
        question: 'An astronomical unit (AU) is the average distance between Earth and the Sun, approximately 1.50 × 10^8 km. The Speed of light is about 3.0 × 10^8 m/s. Express the speed of light in astronomical units per minute.  ',
        choice1: '0.02 AU/min',
        choice2: '0.12 AU/min',
        choice3: '5.02 AU/min',
        choice4: '7.02 AU/min',
        answer: 2,
    },

    {
        question: 'A stone is released from rest from the edge of a building roof 190m above the ground. Neglecting air resistance, the speed of the stone, just before striking the ground is?',
        choice1: '54 m/s',
        choice2: '61 m/s',
        choice3: '70 m/s',
        choice4: '120 m/s',
        answer: 2,
    },
    {
        question: "Which of the following statements is not correct?",
        choice1: "The parameter, length, time and mass are both basic and derived quantities.",
        choice2: "The S.I units of the parameters length, time and mass are metre, hour and kilogramme respectively.",
        choice3: "The S.I units of the parameters length, time and mass are metre, second and kilogramme respectively",
        choice4: "None Of These",
        answer: 3,
    },
    {
        question: "sola intends to cross a river which is 6.6km across, He can row a boat at 5.0m/s in still water. if there is a 4.0m/s current and he intends to cross the river to a direction which is directly opposite his present position, determine the time he requires to cross the river?",
        choice1: "61.1 mins",
        choice2: "36.7 mins",
        choice3: "47.2 mins",
        choice4: "22.0 mins",
        answer: 4,
    },
    {
        question: "An object moving in a circle of radius 30m at a constant speed of 20m/s has a centripetal acceleration?",
        choice1: "13.3 m/s^2",
        choice2: "20.8 m/s^2",
        choice3: "20.0 m/s^2",
        choice4: "16.0 m/s^2",
        answer: 1,
    },
    {
        question: "An Astronaut of the moon simulataneously drops a feather and a hammer. The fact That they land together shows:?",
        choice1: "no gravity forces acts on a body in a vacuum",
        choice2: "The accelleration due to gravity on the moon is less than g on the earth",
        choice3: "in the absence of air resistance all bodies at a given location fall with the same acceleration",
        choice4: "G = 0 on the moon",
        answer: 3,
    },
    {
        question: "4.0 kg block A and 6.0 kg block B are connected by a string of negligible mass, Force Fa = (12 N)i acts on a block A; force Fb = (24 N)i acts on a block B. What is the tension in the string?",
        choice1: "36.0 N",
        choice2: "12.0 N",
        choice3: "24.0 N",
        choice4: "1.2 N",
        answer: 2,
    },
    {
        question: "Mango fruit of mass 2.4kg drops from a height of 60cm onto a massless spring. if the spring constant is 1962N/M, find the maximum distance the spring is compressed?",
        choice1: "14.11 cm",
        choice2: "12.0 cm",
        choice3: "8.48 cm",
        choice4: "1.44 cm",
        answer: 2,
    },
    {
        question: "An object of mass 100kg, which has an initial velocity of 10m/s is acted upon by a constant force of 50N for 5 seconds?",
        choice1: "56.25J",
        choice2: "50.50J",
        choice3: "12.25J",
        choice4: "none of these",
        answer: 4,
    },
    {
        question: "An object A of mass 5kg moving at velocity 10m/s collides with another object B of mass 3kg moving in the same direction at velocity 5m/s. Calculate the lost kinetic energy if both objects coalesee after collision",
        choice1: "23.4J",
        choice2: "34.2J",
        choice3: "15.OJ",
        choice4: "37.5J",
        answer: 1,
    },
    {
        question: "A vector of magnitude 3m is at 45 degrees from another vector of magnitude 6m which is pointing east. Calculate the vector sum with its direction",
        choice1: "9.0m, 45 degrees",
        choice2: "70.5m, 135 degrees",
        choice3: "12.0m, 45 degrees",
        choice4: "8.4m, 14.5 degrees",
        answer: 4,
    },
    {
        question: "Find the maximum speed a 1000kg car moving on a flat horizontal road would have to successfully negotiate a curve if the radius of the curve is 50m and the coefficient of static friction between the tires and dry pavement is 0.45 (g = 9.8m/s^2",
        choice1: "15.00m/s",
        choice2: "13.10m/s",
        choice3: "14.85m/s",
        choice4: "14.93m/s",
        answer: 3,
    },
    {
        question: "An object moves such that its displacement as a function of time (seconds) is x = 30 + 0.2t^4 meters. Find its instantaneous velocity at t = 3.0sec and its average velocity for time interval 2.0sec centered at t = 3.0sec",
        choice1: "21.6m/s, 24.0m/s",
        choice2: "5.2m/s, 10.0m/s",
        choice3: "54.2m/s, 62.1m/s",
        choice4: "7.4m/s, 6.0m/s",
        answer: 1,
    },
    {
        question: "Given v(t) = 25 - 18t where v is in m/s and t is in sec. Determine the total displacement from t1 = 1.5s to t2 = 3.1s",
        choice1: "64m",
        choice2: "106m",
        choice3: "91m",
        choice4: "164m",
        answer: 2,
    },
    {
        question: "A planet has two moons with identical Moon 1 is in a circular orbit of radius r. Moon 2 is in a circular orbit of radius 2r. The magnitude of the gravitational force exerted by the planet on moon 1",
        choice1: "Four times as large",
        choice2: "one-fourth as large",
        choice3: "twice as large",
        choice4: "same",
        answer: 2,
    },
    {
        question: "The maximum tension a particle string can sustain is 23N. A girl ties a 0.5kg box to one and whirls it in a circle of radius 60cm with gradual increase in speed until the spring breaks. Calculate the speed at which the box is being whirled as the string breaks",
        choice1: "2.93m/s",
        choice2: "3.76m/s",
        choice3: "4.66m/s",
        choice4: "5.83m/s",
        answer: 4,
    },
    {
        question: "A 45.0kg wheel essentially a thin hoop with radius 1.40m, is rotating at 250rev/min. What is the average power required to bring it to a stop in -18.0s?",
        choice1: "-88.2J",
        choice2: "3.0 * 10^4 J",
        choice3: "-3.0 * 10^4 J",
        choice4: "None of the above",
        answer: 4,
    },
    {
        question: "A scaffold of mass 75kg and length 5.0m is supported in a horizontal position by a vertical cable at each end. A window washer of mass 90kg stands at point 1.5m from one end. what is the tension in the farther cable?",
        choice1: "9.16 * 10^2",
        choice2: "1.62 * 10^3",
        choice3: "7.01 * 10^2",
        choice4: "none of the above",
        answer: 4,
    },
    {
        question: "A stone is released from rest at the edge of a building roof 190m above the ground. Neglecting air resistance, the speed of the stone, just before striking the ground is",
        choice1: "54m/s",
        choice2: "61m/s",
        choice3: "70m/s",
        choice4: "120m/s",
        answer: 2,
    },
    {
        question: "Over a short interval near time t = 0 the co-ordinates of an automobile in meters is given by x(t) = 27t-4.0t^3, where t is in seconds. At the end of 1.0 s the acceleration of the auto is",
        choice1: "-24.0 m/s^2",
        choice2: "12.0 m/s^2",
        choice3: "24.0 m/s^2",
        choice4: "-12.0 m/s^2",
        answer: 1,
    },
    {
        question: "A body of mass 5.0kg is subjected to two forces that gives it an accelleration of a = (4.0 ms^-2)i+(2.0 ms^-2)J if one of the forces is  F1 = (-20.0 N)i+(12.0 N)J what is the second force?",
        choice1: "(54.0 N)I + (7.0 N)J",
        choice2: "(-54.0 N)I + (7.0 N)J",
        choice3: "(40.0 N)I - (2.0 N)J",
        choice4: "(32.0 N)I - (8.0 N)J",
        answer: 3,
    },
    {
        question: "A projectile is fired from the ground with an initial speed of U = 8.0i + 10.0j m/s. what was the maximum height reached by the projectile when (g = 10m/s^2)",
        choice1: "1.2 m",
        choice2: "3.9 m",
        choice3: "5.0 m",
        choice4: "13.3 m",
        answer: 3,
    },
    {
        question: "An object moving in a circle of radius 30m at a constant speed of 20 m/s has a centripetal acceleration of ",
        choice1: "13.3 m/s^2",
        choice2: "5.0 m/s^2",
        choice3: "20.8 m/s^2",
        choice4: "20.0 m/s^2",
        answer: 1,
    },
    {
        question: "An automobile accelerates uniformly from rest to 100km/h in 10.0 seconds. calculate its average acceleration and the time taken to cover first 118m",
        choice1: "2.8m/s^2 ; 8.5s",
        choice2: "2.8m/s^2 ; 7.2s",
        choice3: "2.8m/s^2 ; 10.8s",
        choice4: "none of the above",
        answer: 4,
    },
    {
        question: "An object is thrown up with a velocity v = 8.0i + 6.2j in m/s. Determine the maximum time taken to reach the maimum height and the horizontal distance covered",
        choice1: "0.49s, 8.82m",
        choice2: "0.68s, 4.10m",
        choice3: "0.88s, 10.65m",
        choice4: "0.63s, 10.12",
        answer: 4,
    },
    {
        question: "A tension of 40N can be sustained by a string without breaking. A boy ties a 0.4kg plastic bottle to one end and whirls it in a vertical circle of radius 70cm and slowly increasing the speed until the speed breaks. what is the speed of the bottle as the spring breaks? ",
        choice1: "4.70 m/s",
        choice2: "7.95 m/s",
        choice3: "5.02 m/s",
        choice4: "8.367 m/s",
        answer: 4,
    },
    {
        question: "The cables of an elevator at a height of 10m suddenly broke. what is the velocity of the elevator just before touching the ground.",
        choice1: "19.6 m/s",
        choice2: "17.0 m/s",
        choice3: "16.4 m/s",
        choice4: "14.0 m/s",
        answer: 4,
    },
    {
        question: "In the torsion pendulum, the twist stores",
        choice1: "kinetic energy",
        choice2: "gravitational energy",
        choice3: "potential energy",
        choice4: "force",
        answer: 3,
    },
    {
        question: "A 1000kg car begins sliding down a 10 degrees inclined road with a speed of 36km/h. The engine is turned off and the only forces acting on the car are a net fractional force from the road and the gravitational force. After the car has travelled 50m along the road, its speed is 54km/h. what is the magnitude of the net fractional force experienced by the car.",
        choice1: "873J",
        choice2: "625J",
        choice3: "218J",
        choice4: "none of the above",
        answer: 4,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 14

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
    var fiveMinutes = 1800 * 1,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};



startGame()