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
  /**
   * Calcula a idade da pessoa
   * @returns A idade de acordo com a data atual
   */
  this.getAge = function () {
    return new Date().getFullYear() - this.birthYear;
  };
}

// use a palavra chave new para criar uma nova instância
const jonas = new Person('Jonas', 1991);

//// O que acontece quando uma função é chamada com new:
// 1. Objeto vazio {} é criado;
// 2. Função é chamada com this = {}
// 3. Objeto vazio é linkado a um protótipo
// 4. Função retorna this

// Pra verificar se a instância pertence a uma classe, use o operador instanceof
console.log(jonas instanceof Person);
