const squares = document.querySelectorAll('.square');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');
const resetBtn = document.querySelector('#reset');

let score = 0;
let count = timeLeft.textContent;
let hitPosition;
let timerId;
let moveMoleId;
let canClick = false;

resetBtn.addEventListener('click', () => {
    score = 0;
    count = 60;
    scoreDisplay.textContent = 0;
    resetGame();
    moveMole();
});

function randomSquare() {
    canClick = true;
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    let randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (canClick) {
            if (square.id === hitPosition) {
                score += 1;
            } else score -= 1;
            scoreDisplay.textContent = score;
            canClick = false;
        }
    });
});

function moveMole() {
    moveMoleId = setInterval(randomSquare, 600);
    timerId = setInterval(countDown, 1000);
}

function countDown() {
    count--;
    timeLeft.textContent = count;

    if (count === 0) {
        resetGame();
        scoreDisplay.textContent = 'Game over, Your score: ' + score;
    }
}

function resetGame() {
    clearInterval(timerId);
    clearInterval(moveMoleId);

    canClick = false;
}

moveMole();