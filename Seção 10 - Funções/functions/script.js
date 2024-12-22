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
