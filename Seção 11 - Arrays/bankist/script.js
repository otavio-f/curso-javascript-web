'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Lembre-se: métodos são funções atreladas a objetos

let arr = ['a', 'b', 'c', 'd', 'e'];

//// Método .slice() é parecido com o de string, e funciona do mesmo jeito
// não modifica o array
console.log(arr.slice(2)); // só início
console.log(arr.slice(2, 4)); // início e final
console.log(arr.slice(-2)); // índice negativo, contando a partir do final
console.log(arr.slice(1, -2));
console.log(arr.slice()); // cria uma cópia

//// Método .splice() parece com .slice, mas modifica o array original
// remove elementos do array original e retorna os elementos removidos
const arr2 = [...arr];
console.log(arr2.splice(-1), arr2); // remove o último elemento

// Atenção: primeiro argumento é o índice, segundo é a quantidade de elementos!!
console.log(arr2.splice(1, 2), arr2);

//// Método .reverse() inverte o array e modifica o array original
console.log(arr.reverse(), arr);
arr.reverse();

//// Método .concat() concatena dois arrays
// Não modifica nenhum dos arrays originais e retorna a união dos dois
const arr3 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr.concat(arr3));

//// Método .join() concatena todos os elementos com um separador entre eles
console.log(arr.join(', '));
console.log(arr3.join(' - '));
