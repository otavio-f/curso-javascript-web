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
