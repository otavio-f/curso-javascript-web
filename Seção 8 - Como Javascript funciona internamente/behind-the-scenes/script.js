'use strict';

/**
 * 95. Scoping
 */

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
 * 98. Hoisting
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
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

/*
 * Porque var é perigoso
 */

if (!numProducts)
  // poderia comparar com zero, porém só checar por valores falsey parece mais fácil
  deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  // função muito perigosa que deve ser chamada com cuidado
  console.log('Shopping Cart deleted!');
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

/*
 * 99. A palavra chave this
 */

console.log(this); // this é o objeto global window

const calcAgeExp = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // função regular
};
calcAgeExp(1993); // this vai ser undefined

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // função arrow puxa this do contexto de fora, (função pai)
};
calcAgeArrow(1993); // vai usar this do escopo global

const jonas = {
  year: 1991,
  calcAgeObj: function () {
    console.log(this); // função regular: this do objeto que chamar
  },
};

jonas.calcAgeObj(); // usa this de <jonas>, que chamou a função

const matilda = {
  year: 2007,
};

matilda.calcAgeObj = jonas.calcAgeObj; // pegando o método emprestado de jonas
matilda.calcAgeObj(); // usa this de <matilda>, que chamou a função

const f = jonas.calcAgeObj; // extraindo método de jonas
f(); // agora this é undefined porque virou uma função regular

/*
 * 100. Funções regulares vs. *arrow functions*
 */

const jonas2 = {
  // Atenção: Isso não é um bloco de código! É um objeto literal.
  year9: 1991,
  calcAgeObj: function () {
    console.log(this); // função regular: this do objeto que chamar

    const isMillenial = function () {
      // função regular dentro de método. This é undefined para funções regulares.
      console.log(this.year9 >= 1981 && this.year9 <= 1996); // isso dá erro. (undefined).year não existe.
      // Solução 1: Adicione uma variável 'self' antes de chamar a função. Na função use 'self', não 'this'
      // Solução 2: Use arrow function. O this vai ser "herdado" do escopo pai, ou seja, do objeto.
    };
    isMillenial();
  },
  greet: () => console.log(this.year), // arrow function: vai usar o this do escopo pai, ou seja, o escopo global
};

jonas2.greet(); // this é o mesmo que window, window.year é undefined

// Outra razão pra evitar o uso de var
var year9 = 9999; // efeito secundário de criar uma propriedade no objeto global. window.year agora existe
jonas2.greet(); // this é o mesmo que window, window.year é 9999

// Conclusão: NÃO USE VAR E NÃO USE ARROW FUNCTION COMO MÉTODO DE CLASSE!!!

// Palavra chave arguments
const addExprArgs = function (a, b) {
  console.log(arguments); // lista de argumentos da função, similar a *args de python
  return a + b;
};

addExprArgs(2, 5);

const addExprArgsArrow = (a, b) => {
  console.log(arguments); // não é definida para arrow functions
  return a + b;
};

addExprArgsArrow(2, 5); // Erro: arguments não foi definido

/**
 * 102. Referências de objeto na prática
 */

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; // Isso só copia a referência, os dois apontam pro mesmo objeto
marriedJessica.lastName = 'Davis';

console.log('Before: ', jessica);
console.log('After: ', marriedJessica);

// Outra forma de fazer o mesmo acima
function marryPerson(person, newLastName) {
  person.lastName = newLastName;
  return person;
}

const marriedJessica2 = marryPerson(jessica, 'North');

console.log('Before: ', jessica);
console.log('After: ', marriedJessica2);

// Se quiser fazer uma cópia do objeto, não só da referência, faz da seguinte forma
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// shallow copy: spread
const jessica2Shallow = { ...jessica2 }; // operador 'spread' copia todas as propriedades
jessica2Shallow.lastName = 'Davis';

// Agora os objetos são diferentes
console.log('Before: ', jessica2);
console.log('After: ', jessica2Shallow);

// Mas spread só copia o primeiro nível, family ainda é uma referência
jessica2.family.push('Mary');
jessica2.family.push('John');

console.log('Before: ', jessica2);
console.log('After: ', jessica2Shallow); // não era intenção incluir 'Mary' e 'John' na família de jessica2Copy

// deep copy
jessica2Deep = structuredClone(jessica2); // função faz uma cópia de <TUDO>

jessica2.family.push('Smith');
jessica2.family.push('Mary');

console.log('Before: ', jessica2);
console.log('After: ', jessica2Deep);
