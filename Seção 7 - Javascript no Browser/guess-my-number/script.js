'use strict';

/*
console.log(document.querySelector('.message'));

document.querySelector('.message').textContent = 'HEH';

document.querySelector('.number').textContent = '10';

document.querySelector('.score').textContent = '9999';

document.querySelector('.guess').value = 99; // set the value this way

console.log(document.querySelector('.guess').value); // get the value this way
*/

let score = 20;
let secretNumber = 1 + Math.floor(20 * Math.random());

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    console.log('No number.');
    return; // do nothing
  }

  const message = document.querySelector('.message');

  // right guess, reload game
  if (guess === secretNumber) {
    message.textContent = 'Correct number!';
    return;
  }

  // wrong guess, show hint
  if (guess < secretNumber) {
    message.textContent = 'Too low!';
  } else if (guess > secretNumber) {
    message.textContent = 'Too high!';
  }

  // decrease score and game over
  score--;
  if (score > 0) {
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.score').textContent = 0;
    message.textContent = 'You lost!';
  }
});
