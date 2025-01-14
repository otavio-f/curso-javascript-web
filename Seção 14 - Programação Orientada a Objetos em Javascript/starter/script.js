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

/**
 * 222. Herança prototipal em objetos padrão
 */

//// Cadeia de protótipos
console.log(jonas.__proto__); // protótipo de jonas: Person.prototype
console.log(jonas.__proto__.__proto__); // protótipo do protótipo: protótipo de Object
console.log(jonas.__proto__.__proto__.__proto__); // Object é o topo da cadeia, o protótipo é null

//// Arrays
const arr = [1, 2, 3, 4, 5];
console.log(
  '[] prototype is the same as new Array?',
  arr.__proto__ === Array.prototype
); // sintaxe [...] é mesma coisa que new Array(...)

// É possível estender a funcionalidade ao adicionar funções ao protótipo
// Atenção: Não é recomendado mudar objetos padrão
Array.prototype.unique = function () {
  return [...new Set(this)];
};

arr.push(1, 3, 99, -1, 4, 4, 4, 4, 4, 4, 6); // adicionando elementos duplicados

console.log(arr.unique());

//// Funções também são objetos
console.dir(x => x + 1);

/**
 * 223. Desafio de código #1
 */

/**
 * Construtor de um carro
 * @param {String} maker Fabricante do carro
 * @param {*} model Modelo específico do carro
 * @param {*} year Ano de lançamento
 * @param {*} speed Velocidade inicial
 */
function Car(maker, model, year, speed) {
  this.maker = maker;
  this.model = model;
  this.year = year;
  this.speed = speed;
}

/**
 * Aumenta a velocidade em 10km/h
 */
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.model} >> ${this.speed}`);
};

/**
 * Diminui a velocidade em 5km/h
 */
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.model} || ${this.speed}`);
};

const uno = new Car('Fiat', 'Uno Turbo i.e.', 1994, 120);
const omega = new Car('Chevrolet', 'Omega CD 4.1i', 1997, 180);

uno.accelerate();
uno.accelerate();
uno.brake();

omega.accelerate();
omega.brake();

/**
 * 224. Classes ES6
 */

// Classes em ES6 são syntatic sugar sobre objetos
//// Existem duas formas de declarar classes

// Class Expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  // construtor (tem que ter esse nome)
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // métodos vão ser adicionados automaticamente ao protótipo
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  /**
   * Idade atual
   */
  get age() {
    return this.calcAge();
  }

  /**
   * Diz oi
   * @returns Oi
   */
  static hi() {
    return "Hello, I'm a person!";
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
console.log(jessica.calcAge());
console.log(
  "Is jessica's proto equal to PersonCl's prototype?",
  jessica.__proto__ === PersonCl.prototype
);

PersonCl.prototype.greet = function () {
  return `Hello, ${jessica.firstName}`;
};

console.log(jessica.greet());

//// Outras considerações sobre classes:
// Classes não são hoisted. Só podem ser usadas após declarar
// Classes são primeira classe, como funções
// Classes são executadas em modo estrito 'use strict';

/**
 * 225. Getters e setters
 */

// Todo objeto possui propriedades setters e getters
// Getters e setters são acessor properties, e outras são data properties
// Getters e setters são funções que controlam atribuição e obtenção de valor por propriedades

// Exemplo: conta banco
const account = {
  owner: 'jonas',
  movements: [100, 115, 330, -1, 1000],

  /**
   * Retorna a última movimentação
   */
  // Para fazer um get, adicione a palavra chave get a um método dentro do objeto
  get latest() {
    return this.movements.at(-1);
  },

  /**
   * Cria uma nova movimentação
   */
  // Para fazer um set, adicione a palavra chave set a um método dentro do objeto
  // O primeiro argumento vai ser o valor atribuído
  set latest(value) {
    this.movements.push(value);
  },
};

console.log(account.latest);

account.latest = 3500;

console.log(account.latest);

// Para adicionar getters e setters em uma classe é igual ao objeto literal
// Getter age() foi adicionado na classe PersonCl

console.log("Jessica's age:", jessica.age);

/**
 * 226. Métodos estáticos
 */
// Para criar um método estático em uma função construtora, simplesmente adicione como uma propriedade
Person.hi = function () {
  return "Hello, I'm a person.";
};

// Diferença entre um método estático e um método é que o estático está atrelado à função, não ao objeto
// jonas.hi(); isso dá erro (lembrete: jonas é instância de Person)

console.log(Person.hi());

// Para criar um método estático em uma classe, adicione o método com a preposição class (feito mais em cima)
PersonCl.hi();
