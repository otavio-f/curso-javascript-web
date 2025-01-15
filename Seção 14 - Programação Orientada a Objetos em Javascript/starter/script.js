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

/**
 * 227. Object.create
 */

// Uma terceira forma de implementar objetos

// Primeiro, defina os métodos do protótipo em um objeto literal
const PersonProto = {
  getAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  get age() {
    return this.getAge();
  },
};

// Segundo, crie o objeto, atribuindo o protótipo ao objeto
const steven = Object.create(PersonProto); // O protótipo dessa instância é PersonProto

// Terceiro, adicione as propriedades
steven.firstName = 'Steven';
steven.birthYear = 2002;

console.log(
  "Is steven's proto equal to PersonProto?",
  steven.__proto__ === PersonProto
);

console.log(steven);
console.log('Steven age is:', steven.getAge(), steven.age);

const sarah = Object.create(PersonProto);
sarah.firstName = 'Sarah';
sarah.birthYear = 1997;
console.log('Sarah age is:', sarah.getAge(), sarah.age);

/**
 * 228. Desafio de código #2
 */

/**
 * Um carro
 */
class CarCl {
  /**
   * Construtor de um carro
   * @param {String} maker Fabricante do carro
   * @param {*} model Modelo específico do carro
   * @param {*} year Ano de lançamento
   * @param {*} speed Velocidade inicial
   */
  constructor(maker, model, year, speed) {
    this.maker = maker;
    this.model = model;
    this.year = year;
    this.speed = speed;
  }

  /**
   * Aumenta a velocidade em 10km/h
   */
  accelerate() {
    this.speed += 10;
    console.log(`${this.model} >> ${this.speed.toFixed(0)}`);
  }

  /**
   * Diminui a velocidade em 5km/h
   */
  brake() {
    this.speed -= 5;
    console.log(`${this.model} || ${this.speed.toFixed(0)}`);
  }

  /**
   * Velocidade em mph
   */
  get speedUS() {
    return this.speed / 1.6;
  }

  /**
   * Velocidade em mph
   */
  set speedUS(mph) {
    this.speed = mph * 1.6;
  }
}

const golf = new CarCl('Volkswagen', 'Gol 1.8 Mi', 2002, 140);
const corolla = new CarCl('Toyota', 'Corolla 1.8 XEI', 2001, 100);

golf.accelerate();
console.log(golf.speedUS);
golf.speedUS = 60;
golf.accelerate();

corolla.brake();
console.log(corolla.speedUS);
corolla.speedUS = 5;
corolla.accelerate();
corolla.accelerate();

/**
 * 229. Herança entre classes: funções construtoras
 */
// Reusando função Person() mais acima

/**
 * Cria um novo estudante
 * @param {String} firstName
 * @param {String} birthYear
 * @param {String} course
 * @return {Student} um objeto estudante
 */
function Student(firstName, birthYear, course) {
  // Se lembre que chamar função construtora sem new, o this será undefined
  // Chame a superclasse, passando o this dessa
  Person.call(this, firstName, birthYear);
  // Atribua as outras propriedades
  this.course = course;
}

// Mude o protótipo antes de adicionar métodos ao protótipo novo
Student.prototype = Object.create(Person.prototype); // .__proto__ do objeto vai ser igual ao .prototype da superclasse

// Corrija o protótipo do construtor
Student.prototype.constructor = Student;

// Adicione métodos do protótipo
/**
 * Greets
 * @return {String} a greeting
 */
Student.prototype.introduce = function () {
  return `My name is ${
    this.firstName
  } and I study ${this.course.toLowerCase()}.`;
};

// Pronto pra criar instâncias!
const mike = new Student('Michael', 1900, 'Medicine');

// __proto__ deve ser Student
console.log(
  "Is mike's prototype Student?",
  mike.__proto__ === Student.prototype
);

// __proto__.__proto__ deve ser Person
console.log(
  "Is the prototype of mike's prototype Person?",
  mike.__proto__.__proto__ === Person.prototype
);

// __proto__.__proto__.__proto__ deve ser Object
console.log(
  "Is the prototype of the prototype of mike's prototype Object?",
  mike.__proto__.__proto__.__proto__ === Object.prototype
);

// __proto__.__proto__.__proto__.__proto__ deve ser null
console.log(
  "Is the prototype of the prototype of the prototype of mike's prototype null?",
  mike.__proto__.__proto__.__proto__.__proto__ === null
);

console.log('Is mike an instance of Student?', mike instanceof Student);
console.log('Is mike an instance of Person?', mike instanceof Person);
console.log('Is mike an instance of Object?', mike instanceof Object);

console.log(mike.introduce());
console.log("Mike's age:", mike.getAge()); // função de Person

/**
 * 230. Desafio de código #3
 */

// Carro elétrico é chato demais, vou implementar uma caminhonete/ATV

// Criar construtor chamando construtor da superclasse
/**
 * Construtor de uma caminhonete
 * @param {String} maker Fabricante da caminhonete
 * @param {String} model Modelo específico da caminhonete
 * @param {Number} year Ano de lançamento
 * @param {Number} speed Velocidade inicial em km/h
 * @param {Number} capacity Capacidade de carga em kg
 */
function Truck(maker, model, year, speed, capacity) {
  Car.call(this, maker, model, year, speed);
  this.capacity = capacity;
  this._load = 0;
}

// Atribuir protótipo
Truck.prototype = Object.create(Car.prototype);

// Consertar construtor
Truck.prototype.constructor = Truck;

// Adicionar métodos da caminhonete
// Ao invés de adicionar 'chargeBatt' vou adicionar load/unload que recebe o peso e só funciona quando parado

/**
 * Carrega a caminhonete.
 * @param {Number} weight Peso a ser carregado
 * @return {Boolean} se a caminhonete foi carregada com o peso
 */
Truck.prototype.load = function (weight) {
  if (this.speed !== 0) {
    console.log("Can't load while the truck is moving!");
    return false;
  }
  if (this.capacity - (this._load + weight) < 0) {
    console.log('There is too much weight already! Unload something before.');
    return false;
  }

  this._load += weight;
  return true;
};

/**
 * Descarrega a caminhonete.
 * @param {Number} weight Peso a ser descarregado
 * @return {Boolean} se a caminhonete foi descarregada
 */
Truck.prototype.unload = function (weight) {
  if (this.speed !== 0) {
    console.log("Can't unload while the truck is moving!");
    return false;
  }
  if (this._load - weight < 0) {
    console.log('There is not enough weight already! Load something before.');
    return false;
  }

  this._load -= weight;
  return true;
};

/**
 * Diminui a velocidade em 2km/h
 */
Truck.prototype.brake = function () {
  this.speed -= 2;
  console.log(`${this.model} [${this._load}] || ${this.speed}`);
};

const saveiro = new Truck('Volkswagen', 'Saveiro CL 1.8', 1995, 60, 990);

// tenta carregar mas está em movimento
saveiro.load(100);

// freia até parar
while (saveiro.speed > 0) {
  saveiro.brake();
}

// tenta carregar
saveiro.load(1000);
// agora com peso certo
saveiro.load(875);

// acelera
saveiro.accelerate();
saveiro.accelerate();

// para
while (saveiro.speed > 0) {
  saveiro.brake();
}

// descarrega
saveiro.unload(900);
saveiro.unload(475);
saveiro.unload(400);

// pra frente de novo
saveiro.accelerate();
saveiro.accelerate();
