'use strict';

/**
 * 133. Parâmetros padrão (ES6)
 */
const bookings = [];

//// É possível usar expressões no argumentos padrão
// function createBooking(flightNum, numPassengers = 1, price = 199 * numPassengers) {...}
// Atenção: As expressões consideram a ordem dos argumentos. Uma expressão só pode usar um argumento definido antes

//// Maneira antiga (ES5) de setar argumentos padrão (dentro da função)
//// Argumentos ficam sem atribuição
// numPassengers = numpassengers || 1;
// price = price || 199;

function createBooking(flightNum, numPassengers = 1, price = 199) {
  /*
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  */
  // Eu acho a sintaxe curta mais propensa a bugs, por isso não gosto de usá-la
  const booking = {
    flightNum: flightNum,
    numPassengers: numPassengers,
    price: price,
  };

  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 3, 150);
// Atenção: Não é possível pular parâmetros!!
// Para usar um parâmetro padrão, defina-o como undefined
createBooking('LH234', undefined, 250);

/*
 * 134. Passando argumentos: valor vs. referência
 */

const flight = 'LH209';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: '10938130594385',
};

function checkIn(flightNum, passenger) {
  flightNum = 'LH910'; // NÃO ALTERE PARÂMETROS PFVR
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport.startsWith('10')) {
    alert('Checked in!');
  } else {
    alert('Wrong passport!');
  }
}

checkIn(flight, jonas);
console.log(flight); // Não foi alterado, primitivos são copiados para a função (passado por valor).
// Alterações nos valores não afetam a variável original.

console.log(jonas); // Foi alterado, referência de objetos são passados para a função.
// Alterações modficam o objeto original.

// Atenção: JS somente passa por valor. Até em objetos o valor da referência é passado para a função

/**
 * 136. Funções aceitando funções de callback
 */

function oneWord(str) {
  return str.replace(/ /g, '').toLowerCase();
}

function upperFirstWord(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}

function transformer(str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // todas funções tem a propriedade .name
}

transformer('Javascript is the best!', upperFirstWord); // passe o nome da função, mas não a chame
transformer('Javascript is the best!', oneWord); // passe o nome da função, mas não a chame

// transformer() é a função de ordem superior, enquanto a função passada como argumento é a função de callback

// callbacks são usadas frequentemente
function hello() {
  console.log("Hello!. I'm a callback function!");
}

['Say what', 'again!'].forEach(hello); // aplica a função de callback a cada elemento do array
document.body.addEventListener('load', hello);

/*
 * 137. Funções retornando funções
 */

/**
 * Cria um cumprimento personalizado
 * @param {String} greeting O cumprimento
 * @returns Uma função de cumprimento
 */
function greet(greeting) {
  // Função anônima não é visível fora desse bloco, por causa de -closure-
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const greeterHello = greet('Hello'); // Cria a função
greeterHello('Jonas'); // Chama a função criada
greeterHello('Sadie');

greet('Hi')('Joe'); // Chamar diretamente também é possível e parece esquisito

// DESAFIO: Reescrever somente usando arrow functions
const farewell = message => name => console.log(`${message}, ${name}!`); // futuro eu: tenta adivinhar o que isso faz

const goodbye = farewell('Goodbye');
goodbye('Brock');
goodbye('Philip');

farewell('See you')('Lily');
