'use strict';

let highscore = 0;
let score = 20;
let secretNumber = 1 + Math.floor(20 * Math.random());

// click on 'check' button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    console.log('No number.');
    return; // do nothing
  }

  const message = document.querySelector('.message');

  // right guess, won!
  if (guess === secretNumber) {
    message.textContent = 'Correct number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    const numberContainer = document.querySelector('.number');
    numberContainer.style.width = '30rem';
    numberContainer.textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    return;
  }

  // wrong guess, show hint
  if (guess < secretNumber) {
    message.textContent = 'Too low!';
  } else if (guess > secretNumber) {
    message.textContent = 'Too high!';
  }

  // decrease score and game over
  if (score > 0) {
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.score').textContent = 0;
    message.textContent = 'You lost!';
  }
});

// click on 'again' button
document.querySelector('.again').addEventListener('click', function () {
  // restore score
  score = 20;
  document.querySelector('.score').textContent = score;

  // reroll secret number
  secretNumber = 1 + Math.floor(20 * Math.random());

  // restore body color and number
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  const numberContainer = document.querySelector('.number');
  numberContainer.style.width = '15rem';
  numberContainer.textContent = '?';
});
