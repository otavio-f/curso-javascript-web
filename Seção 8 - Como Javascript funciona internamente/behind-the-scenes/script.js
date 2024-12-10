'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   console.log(firstName); // Não tem problema se a função é criada antes
//   return age;
// }

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName} is ${age} years old, born in ${birthYear}`; // tem acesso a todas variáveis do calcAge() e escopo global
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // escopo de bloco
      var millenial = true;
      output = 'NEW OUTPUT!'; // É totalmente possível modificar uma variável de um escopo de fora
      const firstName = 'Steven'; // Válido criar uma variável com mesmo nome de um escopo já existente porque está no escopo diferente do firstName global
      // Variáveis podem ter o mesmo nome em escopos diferentes, como parâmetros de funções
      // fora desse bloco, firstName ainda vai ser 'Jonas'
      const text = `Oh, and you're a millenial ${firstName}.`;
      console.log(text);

      function add(a, b) {
        return a + b;
      }
    }

    // console.log(text); // ReferenceError. Variáveis let e const do bloco acima não estão disponíveis fora do bloco
    console.log(millenial); // Isso funciona porque var tem escopo de função
    // add(2, 3); // ReferenceError. Funções tem escopo de bloco a partir do ES6, então a função add só pode ser usada no bloco if acima
    // mas se tirar o modo estrito ele funciona
    console.log(output);
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);

// console.log(age); // Escopo global não tem acesso a variáveis de printAge(). Isso vai dar ReferenceError.
// printAge(); // Escopo global não tem acesso a escopo interno de calcAge(). ReferenceError de novo.

/*
 * Hoisting
 */

// Hoisting de variáveis

console.log(me); // Esse vai retornar undefined, pois é o valor atribuído com o hoisting
// console.log(job);
// console.log(year);
// Esses vão dar erro pois não foram declarados ainda e hoisting não os "puxa" pra cima.

var me = 'Otavio';
let job = 'student';
const year = 1990;

// Hoisting de funções

console.log(addFuncDecl(2, 3)); // Esse funciona, funções declaradas são "puxadas" pra o topo do bloco
// console.log(addExpr(2, 3)); // Dá erro, a função é uma variável const
// console.log(addArrow(2, 3)); // Dá erro, arrow functions ainda são variáveis. Chamar var é equivalente a chamar undefined

function addFuncDecl(a, b) {
  return a+b;
}

const addExpr = function(a, b) {
  return a+b;
}

var addArrow = (a,b) => a+b;

/*
 * Porque var é perigoso
 */

if(!numProducts) // poderia comparar com zero, porém só checar por valores falsey parece mais fácil
  deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() { // função muito perigosa que deve ser chamada com cuidado
  console.log("Shopping Cart deleted!");
}

// Hoisting faz com que numProducts "suba" com valor undefined, que é um valor falso
// A função é chamada assim mesmo
// Resumindo: NÃO USE VAR!!!

/* 
 * var e objeto window
 */

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // verdadeiro
console.log(y === window.y); // falso
console.log(z === window.z); // falso

// Além disso variáveis var adicionam uma propriedade no objeto global window, enquanto que let e const não fazem isso

