const input = document.getElementById('write')
const scoreDisplay = document.getElementById('score')
const wordDisplay = document.getElementById('word')
const timeDisplay = document.getElementById('time')

let point = 0
let stopwatch
let centiseconds = 0, seconds = 0, minutes = 0, hours = 0
let currentWord = ''

function startTimer() {
    clearInterval(stopwatch)
    stopwatch = setInterval(() => {
        centiseconds++
        if (centiseconds > 99) {
            centiseconds = 0
            seconds++
        }
        if (seconds === 60) {
            seconds = 0
            minutes++
        }
        if (minutes === 60) {
            minutes = 0
            hours++
        }
        updateTimeDisplay()
    }, 10)
}

function updateTimeDisplay() {
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}:` +
        `${String(centiseconds).padStart(2, '0')}`
}

function resetTimer() {
    clearInterval(stopwatch)
    centiseconds = 0
    seconds = 0
    minutes = 0
    hours = 0
    updateTimeDisplay()
}

function pickRandomWord() {
    const words = [
        'bed',
        'television',
        'wardrobe',
        'microwave',
        'sofa',
        'table',
        'chair',
        'lamp',
        'refrigerator',
        'toaster',
        'curtain',
        'mirror',
        'carpet',
        'desk',
        'bookshelf',
        'clock',
        'fan',
        'oven',
        'sink',
        'cushion'
    ];
    const index = Math.floor(Math.random() * words.length)
    currentWord = words[index]
    wordDisplay.innerHTML = `Type <b>${currentWord}</b>`
}

function checkAnswer() {
    if (input.value === currentWord) {
        alert(`Your time was ${timeDisplay.textContent}`)
        point++
    } else {
        alert('You typed the word incorrectly')
        point = 0
    }
    updateScore()
    input.value = ''
    input.focus()
    resetTimer()
    startTimer()
    pickRandomWord()
}

function updateScore() {
    scoreDisplay.textContent = point
}

document.getElementById('send').addEventListener('click', checkAnswer)

input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault()
        checkAnswer()
    }
})

window.onload = () => {
    pickRandomWord()
    startTimer()
    input.focus()
}
