'use strict';

/*
console.log(document.querySelector('.message'));

document.querySelector('.message').textContent = 'HEH';

document.querySelector('.number').textContent = '10';

document.querySelector('.score').textContent = '9999';

document.querySelector('.guess').value = 99; // set the value this way

console.log(document.querySelector('.guess').value); // get the value this way
*/

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    console.log('No number.');
    return;
  }

  console.log(guess);
});
