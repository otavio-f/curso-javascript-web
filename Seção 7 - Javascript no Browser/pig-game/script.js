'use strict';

const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// state
let player = 0;
let currentScore = 0;
const scores = [0, 0];

/**
 * Initializes the game state
 */
function resetGame() {
  //reset total scores
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // reset current scores
  currentScore = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  // remove winner
  const player0El = document.querySelector('.player--0');
  const player1El = document.querySelector('.player--1');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // set player 0 as active
  player = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // hide new game button and dice
  btnNew.classList.add('hidden');
  diceEl.classList.add('hidden');

  // show roll and hold buttons
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
}

/**
 * Resets the current score (visible and state)
 */
function resetCurrentScore() {
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = 0;
}

/**
 * Switches the active player
 */
function switchPlayer() {
  player = (player + 1) % 2;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  // gen dice roll
  const roll = Math.trunc(Math.random() * 6) + 1;

  // show numbered dice
  diceEl.src = `dice-${roll}.png`;

  // display dice
  diceEl.classList.remove('hidden');

  // add to current score or switch player
  if (roll !== 1) {
    currentScore += roll;
    document.getElementById(`current--${player}`).textContent = currentScore;
  } else {
    // reset score
    resetCurrentScore();

    // switch player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to player's score
  scores[player] += currentScore;
  document.querySelector(`#score--${player}`).textContent = scores[player];

  // reset current score
  resetCurrentScore();

  // hide dice
  diceEl.classList.add('hidden');

  // Check if player's score is >= 100. If yes, he wins!
  if (scores[player] >= 100) {
    //mark current player as winner
    const playerEl = document.querySelector(`.player--${player}`);
    playerEl.classList.add('player--winner');
    playerEl.classList.remove('player--active');

    // show reset game button and hide the other buttons
    btnNew.classList.remove('hidden');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', resetGame);

resetGame();
