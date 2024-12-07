'use strict';

// scores
const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// scores
// const currentScore0El = document.querySelector('#current--0');
// const currentScore1El = document.querySelector('#current--1');
let player = 0;
let currentScore = 0;

btnRoll.addEventListener('click', function () {
  // gen dice roll
  const roll = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceEl.classList.remove('hidden');

  // show numbered dice
  diceEl.src = `dice-${roll}.png`;

  // add to current score or switch player
  if (roll !== 1) {
    currentScore += roll;
    document.getElementById(`current--${player}`).textContent = currentScore;
    // currentScore0El.textContent = currentScore;
  } else {
    // reset score
    document.getElementById(`current--${player}`).textContent = 0;
    currentScore = 0;

    // switch player
    let oldPlayer = player;
    player = (player + 1) % 2;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
  }
});
