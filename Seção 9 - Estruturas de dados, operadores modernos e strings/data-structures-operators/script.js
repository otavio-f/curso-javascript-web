'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/*
 * Destruturação de arrays
 */

// sem destruturar
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destruturando array
const [x, y, z] = arr;

console.log(x, y, z); // variaveis criadas a partir do array
console.log(arr); // array original não é modificado

// destruturando ignorando elementos
let [main, ,secondary] = restaurant.categories; // categories tem 4 elementos, destruturar só usa 2 e ignora o resto
console.log(main, secondary);

// trocando elementos da maneira tradicional
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// usando destruturação pra trocar elementos
[main, secondary] = [secondary, main];
console.log(main, secondary);

// destruturando retorno de função
function order(starterIndex, mainIndex) {
  return [this.starterMenu[starterIndex], [this.mainMenu[mainIndex]];
}

restaurant.order = order; // agora restaurant tem o método
console.log(restaurant.order(2, 0)); // verifica se funciona

const [starter, mainCourse] = restaurant.order(2, 0); // destrutura os valores recebidos
console.log(starter, mainCourse);

// arrays aninhados
const nested = [2, 4, [5, 6]]; // como eu posso pegar o 1o valor (2) e os valores aninhados (5, 6)?
const [i, , [j, k]] = nested;
console.log(i, j, k);

// valores padrão
const unknown = [8, 9]; // como eu destruturo sem ter certeza que todos os argumentos serão preenchidos?
const [p = 1, q = 1, r = 0] = unknown; // r vai ser preenchido com valor padrão
console.log(p, q, r);

