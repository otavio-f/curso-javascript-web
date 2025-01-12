'use strict';

/**
 * 219. Funções construtoras e o operador new
 */

//// Funções construtoras
// Por convenção, métodos construtores começam com letra maiúscula

// Atenção: Não use arrow functions como funções construtoras, elas não possuem a palavra chave this
function Person(firstName, birthYear) {
  // Propriedades
  this.firstName = firstName;
  this.birthYear = birthYear;

  //// ATENÇÃO: Evite criar métodos dentro de funções construtoras, use protótipos pra isso
  //   /**
  //    * Calcula a idade da pessoa
  //    * @returns A idade de acordo com a data atual
  //    */
  //   this.getAge = function () {
  //     return new Date().getFullYear() - this.birthYear;
  //   };
}

// use a palavra chave new para criar uma nova instância
const jonas = new Person('Jonas', 1991);

//// O que acontece quando uma função é chamada com new:
// 1. Objeto vazio {} é criado;
// 2. Função é chamada com this = {}
// 3. Objeto vazio é linkado a um protótipo
// 4. Função retorna this

// Pra verificar se a instância pertence a uma classe, use o operador instanceof
console.log('Is jonas instance of Person?', jonas instanceof Person);

/**
 * 220. Protótipos
 */

// Todas funções possuem um objeto .prototype, incluindo funções construtoras
// Objetos criados por funções construtoras têm acesso às propriedades e funções definidas no protótipo

console.log('Person prototype:', Person.prototype); // protótipo de Person
console.log('Instance __proto__:', jonas.__proto__); // também acessível pela propriedade __proto__ de uma instância
console.log(
  'Person prototype is same as instance __proto__:',
  Person.prototype === jonas.__proto__
); // são .prototype e .__proto__ são a mesma coisa

/**
 * Calcula a idade da pessoa
 * @returns A idade de acordo com a data atual
 */
Person.prototype.getAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

//// Atenção para o local dos métodos
// Método no construtor vai ser copiado para cada instância
// Método no protótipo vai ter somente uma cópia para todas instâncias

console.log('Jonas age:', jonas.getAge());

//// Propriedades no protótipo
// Propriedades adicionadas ao protótipo são comuns a todas as instâncias (lembre variáveis estáticas)

Person.prototype.species = 'Homo Sapiens'; // propriedade no protótipo

const matilda = new Person('Matilda', 1990);
console.log("Matilda's species:", matilda.species);
console.log("Jonas' species:", jonas.species);

// Mudar a propriedade do protótipo muda em todas as instâncias
matilda.__proto__.species = 'Elf';
console.log("Matilda's species:", matilda.species);
console.log("Jonas' species:", jonas.species);

// A propriedade do protótipo não é da instância
console.log(
  'Is firstName a owned property?',
  jonas.hasOwnProperty('firstName')
);
console.log('Is species a owned property?', jonas.hasOwnProperty('species'));
