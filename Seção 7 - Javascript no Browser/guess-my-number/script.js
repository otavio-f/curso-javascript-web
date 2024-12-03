'use strict';

/**
 * Changes the value of the message box
 * @param {string} value the new value
 */
function setMessage(value) {
  document.querySelector('.message').textContent = value;
}

/**
 * Chooses a secret number
 * @returns A random number between 1 and 20
 */
function rerollNumber() {
  return 1 + Math.floor(20 * Math.random());
}

let highscore = 0;
let score = 20;
let secretNumber = rerollNumber();

// click on 'check' button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    console.log('No number.');
    return; // do nothing
  }

  // right guess, won!
  if (guess === secretNumber) {
    setMessage('Correct number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    const numberContainer = document.querySelector('.number');
    numberContainer.style.width = '30rem';
    numberContainer.textContent = secretNumber;

    // register new highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    return;
  }

  // wrong guess, show hint
  setMessage(guess < secretNumber ? 'Too low!' : 'Too high!');

  // decrease score and game over
  if (score > 0) {
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.score').textContent = 0;
    setMessage('You lost!');
  }
});

// click on 'again' button
document.querySelector('.again').addEventListener('click', function () {
  // restore score
  score = 20;
  document.querySelector('.score').textContent = score;

  // reroll secret number
  secretNumber = rerollNumber();

  // restore body color and number
  setMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  const numberContainer = document.querySelector('.number');
  numberContainer.style.width = '15rem';
  numberContainer.textContent = '?';
});
