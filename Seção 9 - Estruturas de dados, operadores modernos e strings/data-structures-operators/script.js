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
let [main, , secondary] = restaurant.categories; // categories tem 4 elementos, destruturar só usa 2 e ignora o resto
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
  return [this.starterMenu[starterIndex], [this.mainMenu[mainIndex]]];
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

/**
 * Destruturando objetos
 */

// para destruturar objetos faça desse jeito
// escreva os nomes das propriedades a serem extraídas **exatamente como no objeto!**
// a ordem não precisa ser a mesma

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// É possível renomear as variáveis, só especificar desse jeito:
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant; // Atenção: Parece com literal de objeto, mas não é!!!
console.log(restaurantName, hours, tags);

// Valores padrão
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutação de variáveis enquanto destrutura objetos
let aa = 111;
let bb = 999;
const oobj = { aa: 23, bb: 7, cc: 14 };
// Problema: quero destruturar um objeto em variáveis já existentes

//{aa, bb} = oobj; // não funciona desse jeito. js pensa que está tentando atribuir um bloco de código
({ aa, bb } = oobj); // coloque entre parênteses pra funcionar
console.log(aa, bb);

// Objetos aninhados
const {
  fri: { open: oh, close: ch }, // confuso
} = openingHours;

console.log(oc, cc);

// Destruturação em argumentos de funções
function orderDelivery({
  starterIndex = 1,
  mainIndex = 0,
  time = '20:00',
  address,
}) {
  // destruturando objeto antes de entrar na função
  console.log(
    `Order received!\n ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]}, will be delivered to ${address} at ${time} hours.`
  );
}

restaurant.orderDelivery = orderDelivery;

restaurant.orderDelivery({
  time: '22:30',
  address: 'Grove Street, 1',
  mainIndex: 2,
  starterIndex: 1,
});

restaurant.orderDelivery({
  mainIndex: 1,
  address: 'Rainbow Road, 90',
}); // agora usa os valores padrão

/**
 * Operator spread
 */

const arr2 = [7, 8, 9]; // Como eu crio um novo array com os elementos de arr2 no final?

const newArr2 = [1, 2, arr2[0], arr2[1], arr2[2]]; // resposta mais trabalhosa, fica impossível caso arr2 tenha 1000 elementos.
console.log(newArr2);

// resposta igualmente trabalhosa: loop for
// resposta correta: operador spread
const goodArr2 = [1, 2, ...arr2]; // igual a escrever todos os elementos de arr2, elemento por elemento
console.log(goodArr2);

//também é útil pra passar argumentos pra funções
console.log(1, 2, 7, 8, 9);
console.log(...goodArr2);

// E se eu quiser adicionar um elemento no menu (exemplo acima)
const newMenu = [...restaurant.mainMenu, 'Gnocci']; // nhoque?
console.log(newMenu);

// Atenção: sempre é criado um novo array, o array original não é modificado
// também é útil pra criar cópias rasas de arrays
const mainMenuCopy = [...restaurant.mainMenu];

// ou fazer a união de dois (ou mais) arrays
const menuAll = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuAll);

// o operador spread funciona em todos os iterables (for..of)
// ex.: arrays, strings, sets, maps, etc.
// Atenção: objetos NÃO são iterables!!!
const text = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// função que aceita múltiplos argumentos
// Exemplo: função de encomenda de macarrão
/**
 * Encomenda macarrão com três ingredientes
 * @param {*} ingredient1 O primeiro ingrediente
 * @param {*} ingredient2 O segundo ingredinente
 * @param {*} ingredient3 O terceiro ingregiente
 */
function orderPasta(ingredient1, ingredient2, ingredient3) {
  console.log(
    `Here is your delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}.`
  );
}
restaurant.orderPasta = orderPasta; // a função está no objeto agora

const ingredients = [
  prompt('Ingredient 1:'),
  prompt('Ingredient 2:'),
  prompt('Ingredient 3:'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients); // mesma coisa do acima

// Spread em objetos
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' }; // novo restaurante inclui todas as propriedades
console.log(newRestaurant);

// cópia rasa de objeto
const restaurantCopy = { ...newRestaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name, restaurantCopy.name); // alterações na cópia não afetam o original

/**
 * Padrão rest (restante)
 */

// condensa elementos em um array
const [xa, xb, ...rest] = [1, 2, 3, 4, 5]; //rest = [3, 4, 5];
console.log(xa, xb, rest);

// rest não coleta elementos pulados
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

// rest só pode ser o último elemento de uma destruturação
// const [...invalid, risotto2] = [...restaurant.mainMenu];

// destruturando objetos com rest
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// quando aplicado a funções, empacota vários argumentos em um único objeto
// técnica conhecida como rest parameters (varargs de js)
function add(...numbers) {
  //...numbers == *args de python
  let accumulator = 0;
  numbers.forEach(num => (accumulator += num));
  console.log(accumulator);
}

add(2, 3, 5); // agora a função aceita um número variável de argumentos

// a função também aceita um array se usarmos o operador spread
const numbers = [12, 2, -1];
add(...numbers);

// Exemplo
/**
 * Ordena uma pizza
 * @param {*} mainIngredient Ingrediente principal
 * @param  {...any} otherIngredients Ingredinetes opcionais
 */
function orderPizza(mainIngredient, ...otherIngredients) {
  if (otherIngredients.length > 0)
    // quando não há argumentos extras, otherIngredients vai ser um array vazio
    console.log(`Making a ${mainIngredient} pizza with `, ...otherIngredients);
  else console.log(`Making a ${mainIngredient} pizza.`);
}

restaurant.orderPizza = orderPizza;

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //is this a salad?
restaurant.orderPizza('mushrooms');

/**
 * Operator de curto circuito (&& ||)
 */

// Operadores lógicos também podem ser usados em outros tipos de dados
// Se o primeiro operador for "truthy", ele é retornado imediatamente (o segundo não é visto)
console.log(3 || 'Jonas'); // ambos são verdadeiros, então retorna o primeiro
console.log('' || 'Jonas'); // String vazia é um valor falso
console.log(true || 0); // 0 (zero) é um valor falso
console.log(undefined || null); // retorna o segundo valor se ambos forem falsos

console.log(undefined || 0 || '' || null || 'Hello' || 23); // operador curto circuito para e retorna no primeiro valor não-falso ('Hello')

// Exemplo
const guestsTernary = restaurant.numGuests ? restaurant.numGuests : 10; // se restaurant.numGuests não for falso é ele, senão é 10
console.log(guestsTernary);

const guestsCircuit = restaurant.numGuests || 10; // se restaurant.numGuests não for falso, é ele, senão é 10
console.log(guestsCircuit);

// Operador &&
// Praticamente o oposto de ||, retorna o primeiro elemento falso
console.log(0 && 'Jonas'); // retorna 0, primeiro elemento falso
console.log(7 && 'Jonas'); // se todos os elementos são não-falsos, retorna o último;
console.log('Hello' && 'Jonas' && 223 && 1 && true && null && 400); // para no primeiro valor falso (null) e retorna ele

// Exemplo: chamar um método se ele existe
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms');
}

// mesma coisa do bloco acima
restaurant.orderPizza && restaurant.orderPizza('mushrooms');

// Atenção: Use operadores curto-circuito com cautela.
//          O uso excessivo pode tornar o código difícil de ler!

/**
 * Operador nullish coalescing (??)
 */

// retorna o primeiro elemento que não é null ou undefined
const guestsNullish = restaurant.numGuests ?? 10; // se restaurant.numGuests existe é ele, senão é 10

/**
 * Operadores de atribuição lógico
 */

// Atenção: Código novo, ES2021

// Exemplo: Aplicar propriedade a objetos que não a possuem
const restaurant1 = {
  name: 'Capri',
  numGuests: 20,
};

const restaurant2 = {
  name: 'La Piazza',
  owner: 'Giovanni',
  masterChef: 'Nidoqueen',
};

// Objetivo: aplicar numGuests a objetos que não possuírem

// Alternativa 1: Curto circuito OR
/*
restaurant1.numGuests = restaurant1.numGuests || 10;
restaurant2.numGuests = restaurant2.numGuests || 10;
console.log(restaurant1);
console.log(restaurant2);
*/

// Alternativa 2: Atribuição lógica
// Operador ||= atribui se o argumento for falso
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10; // se numGuests não existe, vai passar a ser 10
console.log(restaurant1);
console.log(restaurant2);

// Atenção: 0(zero) é um valor falso, então não use atribuição lógica se zero for válido!
//          Nesse caso use o operador de atribuição nullish ??=, que atribui se a variável for null ou undefined
restaurant1.masterChef ??= 'unknown'; // se não há cozinheiro chefe, vai ser desconhecido
restaurant2.masterChef ??= 'unknown';
console.log(restaurant1);
console.log(restaurant2);

// Objetivo: Anonimizar o nome do dono do restaurante
// Alternativa 1: Curto circuito AND
/*
restaurant1.owner = restaurant1.owner && '<ANONYMOUS>';
restaurant2.owner = restaurant2.owner && '<ANONYMOUS>';
*/

// Alternativa 2: Atribuição lógica AND
restaurant1.owner &&= '<ANONYMOUS>';
restaurant2.owner &&= '<ANONYMOUS>';

// NÃO VOU FAZER O DESAFIO #1

/*
 * Loop for-of
 */

// Como iterar por todos os elementos do menu
// const menuAll = [...restaurant.starterMenu, ...restaurant.mainMenu]; // definido mais acima

// Maneira 1: loop tradicional
for (let i = 0; i < menuAll.length; i++) {
  console.log(menuAll[i]);
}

// Maneira 2: loop for..of
for (let item of menuAll) {
  console.log(item);
}

// Pra obter o índice, itere sobre o resultado do método .entries()
for (let entry of menuAll.entries()) {
  let [index, item] = entry; // cada entrada é uma lista com índice e o item, então posso desempacotar em variáveis
  console.log(`${index} - ${item}`);
}

/**
 * 116. Literais de objeto melhorados
 */
// ES6 possui três maneiras de escrever literais de objeto

// Exemplo: incluir openHours no objeto foodTruckX
const openHours = {
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
};
const openHours2 = openHours; // clone para ilustração

// Como incluir openHours no objeto foodTruck?
const foodTruck = {
  name: 'Burgers Ahoy',
  location: 'Pepper Avn. 2333, NY, United States',
  categories: ['Burgers', 'Hotdogs', 'Beverages', 'Vegetarian', 'Other'],
  beverages: [
    'Strawberry Drink',
    'Lemonade',
    'Grape Drink',
    'Soda',
    'Beer',
    'Smoothie',
  ],
  dressings: ['Cheesy', 'Tomato', 'Mayo', 'Ranch', 'Inferno'],
  side: ['French Fries', 'Ice Cream'],
  mainMenu: [
    'Cheese Burger',
    'Fat Dog',
    'Obese Dog',
    'Mountain of Potato Salad',
    'Bucket of Fried Chicken, Fries and Sausage',
  ],
  // Maneira Tradicional: incluir diretamente no objeto
  openHours: openHours, //repetição

  // Maneira melhorada: incluir somente o nome da propriedade.
  openHours2, // O nome da variável externa tem que ser o mesmo!

  // Propriedade computada: use colchetes
  ['serial']: 9121, // permite especificar o nome com uma string
  [`parkId${3 + 1}`]: 9999, // também permite calcular o nome da propriedade
  //
};
console.log(foodTruck);

// Objetivo: Escrever uma função
const foodTruck2 = {
  name: 'Burgers Ahoy',
  location: 'Bell Street 100, NY, United States',
  categories: ['Burgers', 'Hotdogs', 'Beverages', 'Vegetarian', 'Other'],
  beverages: [
    'Strawberry Drink',
    'Lemonade',
    'Grape Drink',
    'Soda',
    'Beer',
    'Smoothie',
  ],
  dressings: ['Cheesy', 'Tomato', 'Mayo', 'Ranch', 'Inferno'],
  side: ['French Fries', 'Ice Cream'],
  mainMenu: [
    'Cheese Burger',
    'Fat Dog',
    'Obese Dog',
    'Mountain of Potato Salad',
    'Bucket of Fried Chicken, Fries and Sausage',
  ],

  // Maneira tradicional: atribuir uma função à uma propriedade
  order: function (beverageIndex, mainMenuIndex) {
    return [this.beverages[beverageIndex], this.mainMenu[mainMenuIndex]];
  },

  // Maneira melhorada: fazer atribuição e declaração no mesmo passo
  orderComplete(beverageIndex, mainMenuIndex, dressingIndex, sideIndex) {
    // orderComplete: function(...)
    return [this.beverages[beverageIndex], this.mainMenu[mainMenuIndex]];
  },
};
console.log(foodTruck2);

// Nota: Ainda prefiro deixar explícito com a palavra chave function
//       Fica mais claro a função do trecho de código

// Nota: Prefiro repetir a propriedade
//       A maneira curta me parece mais propensa a bugs
