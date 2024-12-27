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

/**
 * 152. Criando elementos DOM
 */

/**
 * Insere a movimentação da conta na página
 * @param {[Number]} movements A lista com a movimentação da conta do usuário
 */
function displayMovements(movements) {
  // limpa o elemento
  containerMovements.innerHTML = '';
  // insere valores
  movements.forEach(function (amount, i) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${amount}€</div>
        </div>
`;
    // insere elemento dentro do elemento, na primeira posição
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
}

displayMovements(account1.movements);

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

/**
 * 148. O método .at
 */

// Atenção: esse método é muito novo (ES2022)

const sample = [12, 13, 41];
console.log(`com brackets: ${sample[0]}, com .at(): ${sample.at(0)}`); // é equivalente a notação de array

// Para pegar o último elemento
console.log(sample[sample.length - 1]);
console.log(sample.slice(-1)[0]);
console.log(sample.at(-1)); // .at() permite índices negativos, que contam a partir do final
console.log('Jonas'.at(-1)); // também funciona em strings

/**
 * 149. Looping arrays com .forEach
 */

const lastMovements = [200, 450, -400, 3000, 650, -130, 70, 1300];

console.log('=> for..of');
// Maneira usual de iterar pelos valores de um array com for..of
for (const amount of lastMovements) {
  if (amount > 0) {
    console.log(`You deposited ${amount}.`);
  } else {
    console.log(`You withdrew ${amount}.`);
  }
}

console.log('=> .forEach()');
// Iterando com método .forEach()
lastMovements.forEach(function (amount) {
  // use um callback que vai ser chamado em cada iteração
  if (amount > 0) {
    console.log(`You deposited ${amount}.`);
  } else {
    console.log(`You withdrew ${amount}.`);
  }
});

console.log('=> for..of .entries()');
// Maneira usual de iterar pelos valores de um array com for..of
for (const [index, amount] of lastMovements.entries()) {
  if (amount > 0) {
    console.log(`At ${index}, you deposited ${amount}.`);
  } else {
    console.log(`At ${index}, you withdrew ${amount}.`);
  }
}

console.log('=> .forEach() (value, index, array)');
// Iterando com método .forEach(), especificando os três argumentos
lastMovements.forEach(function (amount, index, array) {
  // use um callback que vai ser chamado em cada iteração
  if (amount > 0) {
    console.log(`At ${index}, you deposited ${amount}.`);
  } else {
    console.log(`At ${index}, you withdrew ${amount}.`);
  }
});

// Atenção: NÃO É POSSÍVEL SAIR DO LOOP .forEach() COM break; OU continue;
// -------- Se precisar terminar o loop mais cedo, use for..of

/**
 * 150. .forEach() com maps e sets
 */

// em maps, o método .forEach funciona de modo parecido com arrays
currencies.forEach(function (value, key, map) {
  console.log(`${key} - ${value}`);
});

// sets não têm chaves, ou índices
// no método .forEach() de um set possui três argumentos por questão de compatibilidade, mas o primeiro é igual ao segundo
const uniqueCurrencies = new Set([
  'BRL',
  'USD',
  'GBP',
  'EUR',
  'BRL',
  'BRL',
  'BRL',
]);
console.log(uniqueCurrencies);
uniqueCurrencies.forEach(function (value, value2, set) {
  // value === value2
  console.log(`${value2} - ${value}`);
});

/**
 * 153. Desafio de código #1
 */

// Create function
function checkDogs(juliaDogs, kateDogs) {
  // 1. Remove cats from julia
  const juliaDogsCorrected = juliaDogs.slice(); // copia array
  juliaDogsCorrected.splice(0, 1); // remove o primeiro gato, primeiro elemento
  juliaDogsCorrected.splice(-2); // remove os outros gatos, último e antepenúltimo elementos

  // 2. Create array with julia and kate's dogs
  const allDogs = juliaDogsCorrected.concat(kateDogs);
  // const allDogs = [...juliaDogsCorrected, ...kateDogs]; // equivalente ao acima

  // const allDogs = [...juliaDogs.slice(1, -2), ...kateDogs]; // faz passo 1 e 2

  // 3. For each dog log if it's a puppy or adult
  allDogs.forEach(function (dogAge, index) {
    const ageText = dogAge < 3 ? 'a puppy' : 'an adult';
    const agePlural = dogAge === 1 ? '' : 's';
    console.log(
      `Dog number ${
        index + 1
      } is ${ageText} and is ${dogAge} year${agePlural} old.`
    );
  });
}

// 4. Run for both datasets
// Test data 1
let juliaDogs = [3, 5, 2, 12, 7];
let kateDogs = [4, 1, 15, 8, 3];
checkDogs(juliaDogs, kateDogs);

// Test data 2
juliaDogs = [9, 16, 6, 8, 3];
kateDogs = [10, 5, 6, 1, 4];
checkDogs(juliaDogs, kateDogs);
