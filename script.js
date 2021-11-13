'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnDiceHold = document.querySelector('.btn--hold');
const btnGuide = document.querySelector('#guide');
const diceImage = document.querySelector('.dice');
const won0El = document.querySelector('#won--0');
const won1El = document.querySelector('#won--1');

let currentScore = 0;
let activePlayer = 0;
let playing = true;
let score = [0, 0];
diceImage.classList.add('hidden');

function funNewGame() {
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceImage.classList.add('hidden');
    document.querySelector(`#won--${activePlayer}`).classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

funNewGame();

function switchPlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

function funRoll() {
    if (playing) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        diceImage.classList.remove('hidden');
        diceImage.src = `diceImages/dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            console.log(currentScore);
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
}

function funHold() {
    if (playing) {
        score[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 100) {
            playing = false;
            diceImage.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`#won--${activePlayer}`).classList.remove('hidden');
            document.querySelector(`#won--${activePlayer}`).innerText = "Winner 🎊";
        } else
            switchPlayer();
    }
}

btnDiceRoll.addEventListener('click', funRoll);
btnDiceHold.addEventListener('click', funHold);
btnNewGame.addEventListener('click', funNewGame);
