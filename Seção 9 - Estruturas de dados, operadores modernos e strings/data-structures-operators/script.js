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

/**
 * 117. Chaining Opcional
 */

// Problema: Como acessar objetos de uma propriedade que pode não existir?

// Maneira errada: deixa dar erro
console.log(restaurant.openingHours.mon.open); // quero o horário de abertura
// vai dar erro porque o restaurante não abre na segunda (não tem propriedade mon)

// Maneira tradicional: com if
if (restaurant.openingHours.mon) {
  //não sabe se o restaurante abre na segunda. Se não abre, a propriedade não existe
  console.log(restaurant.openingHours.mon.open); // se existir, quero o horário de abertura
}

// Maneira melhorada: Chaning opcional
// (?.) retorna o objeto ou undefined se a propriedade não existe (null ou undefined)
console.log(restaurant.openingHours.mon?.open); // se o restaurante abre na segunda, quero o horário, senão undefined

// E se openingHours fosse opcional?
// Só usar chaining opcional na propriedade
console.log(restaurant.openingHours?.mon?.open); // se o restaurante abre, e se abre na segunda, quero o horário, senão undefined

// Outro exemplo: Indicar que hora restaurante abre em cada dia da semana
const weekdays2 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of weekdays2) {
  const openHour = restaurant.openingHours[day]?.open ?? 'no time';
  console.log(`On ${day} we open at ${openHour}.`); //computando propriedade
}

// Optional chaining em métodos: Use ?. antes dos parênteses
console.log(
  restaurant.bulkOrder?.(1, 2, 100) ??
    'Não aceitamos pedidos em grandes quantidades.'
);

// Optional chaining em arrays: use ?. depois dos colchetes
console.log(weekdays2[9]?.toUpperCase ?? 'DIA NÃO EXISTE!');

/**
 * 118. Loop em objetos
 */
// loop sobre propriedades de objetos

// Object.keys(objeto) retorna uma lista com as chaves (nomes das propriedades) do objeto.
const properties = Object.keys(openingHours);
console.log(properties);

let openAnnounce = `We are open ${propreties.length} days a week:`;

for (const day of properties) {
  openAnnounce += `${day}, `;
}

console.log(openAnnounce);

// Object.values(objeto) retorna uma lista com os valores das propriedades do objeto.
const values = Object.values(openingHours);
console.log(values);

// Object.entries(objeto) retorna uma lista. Cada elemento da lista contém uma sublista com o nome de uma propriedade e o valor
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  // destruturando objeto
  console.log(`On ${day} we open at ${open} and close at ${close}.`);
}

// NÃO VOU FAZER O CHALLENGE #2

/**
 * 120. Sets
 */

// É uma coleção de valores únicos
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
console.log(orderSet); // set não permite duplicatas
// Set não tem ordem

// Métodos e propriedades
console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
orderSet.add('Garlic Bread'); // retorna true se adicionou
orderSet.delete('Risotto'); // retorna true se deletou
orderSet.clear();
// console.log(orderSet[0]); // sets não tem índices

// Iteração
for (const item of orderSet) {
  console.log(item);
}

// Exemplo

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// Como saber quantos cargos existem?
const uniqueStaff = [...new Set(staff)]; //lista -> set -> lista
console.log(uniqueStaff);

/**
 * 121. Operações novas em sets
 */

// Atenção: Funcionalidade MUITO NOVA (ES2025?)
const italianFoods = new Set([
  'pasta',
  'gnocci',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Como achar elementos em comum entre comidas italianas e mexicanas: .intersection()
const commonFoods = italianFoods.intersection(mexicanFoods); // retorna novo set com elementos em comum
console.log('Ingredients in common:', commonFoods);

// Como achar todos os elementos: .union()
const allFoods = italianFoods.union(mexicanFoods); // retorna novo set com todos os elementos
console.log('All ingredients:', allFoods);

// ou pode usar spread and criar um novo set
const allFoods2 = new Set([...italianFoods, ...mexicanFoods]);
console.log('All ingredients:', allFoods);

// Como saber quais elementos não são comuns: .difference()
// Atenção: O resultado não é comutativo. Vai retornar os elementos do primeiro set que não fazem parte do segundo
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Unique italian ingredients:', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Unique mexican ingredients:', uniqueMexicanFoods);

// Como saber quais elementos não são comuns: .symmetricDifference()
const uniqueFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log('Unique ingredients:', uniqueFoods);

// Como saber se um conjunto é diferente de outro: isDisjointFrom()
console.log(italianFoods.isDisjointFrom(mexicanFoods));

/**
 * 122. Maps
 */
// Estrutura de dados que mapeia chaves a valores
// Diferença principal de maps vs objetos é que as chaves em maps podem ser de qualquer tipo,
//        enquanto que em objetos as chaves só podem ser strings.

const restaurantMap = new Map();

// Pra adicionar elementos em maps use o método .set(chave, valor)
restaurantMap.set('name', 'ClassicoItaliano');
restaurantMap.set(1, 'Firenze, Italy');
console.log(restaurantMap.set(2, 'Lisbon, Portugal')); // método .set() retorna o map

restaurantMap
  .set('categories', ['Italian', 'Pizzeria'])
  .set('open', 11)
  .set('close', 23); // é possível encadear métodos .set()

// Pra recuperar o valor, use o método .get(chave)
console.log(restaurantMap.get('name'));
console.log(restaurantMap.get(99)); // retorna undefined se não consegue achar a chave

// Pra checar se o map contém uma chave use o método .has(chave)
console.log(restaurantMap.has('ratings'));

// Pra deletar uma chave e valor do map use o método .delete(chave)
console.log(restaurantMap.delete(2));

// Pra saber a quantidade de elementos, use a propriedade .size
console.log(restaurantMap.size);

// Pra remover todos os elementos use o método .clear()
restaurantMap.clear();

// Atenção: Quando forem usados objetos como chaves, use o mesmo objeto pra recuperar o valor
//          Maps só recupera o valor se houver uma chave igual, o que significa mesma instância para objetos
//          Instâncias diferentes de objetos equivalentes são chaves diferentes.
const arrKey = [1, 2];
restaurantMap.set(arrKey, 'No');
console.log(restaurantMap.get([1, 2])); // vai retornar undefined
console.log(restaurantMap.get(arrKey)); // agora funciona

/**
 * 123. Maps, iteração
 */
// Outra forma de criar um map, com uma lista
const question = new Map([
  ['question', 'What are thoooose?!'],
  [1, 'Green leather shoes'],
  [2, 'Red crocs'],
  [3, 'Organic papaya slippers'],
  [4, 'Transparent silicone work boots'],
  [5, 'Hoof high heels'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Wrong!'],
]); // cada elemento contém um par chave-valor
console.log(question);

// Convertendo objeto para map com Object.entries
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iterando sobre maps: loop of retorna par [chave, valor]
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Alternative ${key}: ${value}`);
  }
}

console.log(question.get(answer === Number(prompt('Your answer:'))));

// Convertendo map pra array: use oprador spread
console.log(...question);

// Métodos extras comuns a Object
console.log(question.entries());
console.log(question.keys());
console.log(question.values());

// NÃO VOU FAZER O CODING CHALLENGE #3

/**
 * 126. Trabalhando com strings parte 1
 */

const airline = 'TAP Air Portugal';
const plane = 'A320';

// Para obter um caractere em uma posição específica, faça como um array
console.log(plane[0]); // T
console.log(plane[1]); // A
console.log(plane[2]); // P

// Para saber a quantidade de caracteres, use a propriedade .length
console.log(airline.length);
console.log(plane.length);

// Para saber a primeira posição de um caractere, use o método .indexOf()
console.log(airline.indexOf('r')); // 6, começando por 0

// Para saber a última posição de um caractere, use o método .lastIndexOf()
console.log(airline.lastIndexOf('r')); // 6, começando por 0

// O método slice(início, fim) pode cortar uma string
console.log(airline.slice(4)); // 'Air Portugal'
console.log(airline.slice(4, 7)); // 'Air' - o valor final não é incluído

// Exemplo: Extrair a primeira palavra sem usar valores
console.log(airline.slice(0, airline.indexOf(' '))); // 'TAP'

// Exemplo: Extrair a última palavra
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // 'Portugal'

// Também é possível indicar índices negativos
// Nesse caso, o método conta a partir do final
console.log(airline.slice(-2)); // pega as duas últimas letras: 'al'
console.log(airline.slice(1, -1)); // tudo a partir do segundo caractere até o último caractere: 'AP Air Portuga'

/**
 * Checa se o assento é o assento do meio
 * @param {*} seatCode
 */
function isMiddleSeat(seatCode) {
  const seat = seatCode.slice(-1); // pega o último caractere
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat. >:(');
  } else {
    console.log('You got lucky! :D');
  }
}

isMiddleSeat('11B');
isMiddleSeat('23C');
isMiddleSeat('3E');

/*
 * 127. Trabalhando com strings parte 2
 */

// .toLowerCase() muda letras para caixa baixa
console.log(airline.toLowerCase());

// .toUpperCase() muda letras para caixa alta
console.log(airline.toUpperCase());

// Exemplo: Corrigir capital em nome
const passenger = 'jOnaS';

const passengerCorrect =
  passenger[0].toUpperCase + passenger.toLowerCase().slice(1);

console.log(passengerCorrect);

// Para remover espaços no começo e final, use o método .trim()
const email = ' hi@jonas.io\n';

const emailFix = email.trim();
console.log(emailFix);

// Método .replace(src, dst) substitui trechos de uma string
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); // '288.97$'
console.log(priceUS);

// .replace() só substitui a primeria ocorrência.
// para substituir todas as ocorrências, use replaceAll()
const boardingAnnoucement =
  'Attention: The flight appointed to 23:15 will be delayed to 23:15. Sorry for the inconvenience. Any further questions, please consult the main desk.';

// O correto seria o voo das 22:00 estar atrasado, não o de 23:15
const boardingAnnouncementFix = boardingAnnoucement.replace('23:15', '22:00'); // substitui somente a primeira instância
console.log(boardingAnnouncementFix);

// Ops! O correto seria o voo das 19:30, não o das 23:15, atrasado para as 19:30 do proximo dia
const boardingAnnouncementFixFix = boardingAnnouncement.replaceAll(
  '23:15',
  '19:30'
);
console.log(boardingAnnouncementFixFix);

// Atenção: .replaceAll é um método muito novo, então pode não estar disponível

// Substituindo com expressões regulares
const boardingAnnouncementFixRegex = boardingAnnoucement.replace(
  /23:15/g,
  '19:30'
); // /23:15/ é a expressão regular /g indica modificador global, todas as ocorrências

// .includes() verifica se a string contém outro trecho
console.log(boardingAnnoucement.includes('delay'));

// .startsWith() verifica se a string começa com outro trecho
console.log(boardingAnnoucement.startsWith('Attention'));

// .endsWith() verifica se a string termina com outro trecho
console.log(boardingAnnoucement.endsWith('main desk.'));
console.log(boardingAnnouncement.endsWith('site.'));

/**
 * 128. Trabando com strings parte 3
 */

// .split(): parte uma string em várias partes de acordo com uma string divisora
console.log('a+very+nice+string'.split('+'));
const [firstName, surname] = 'Jonas Schmedtmann'.split(' ');

// .join(): Une strings de uma lista com um divisor entre elas
console.log(['Mr.', firstName, surname].join(' '));

function capitalize(name) {
  const names = name.split(' ');
  const result = [];
  for (const word of names) {
    result.push(word[0].toUpperCase() + word.slice(1));
  }

  return result.join(' ');
}

const passengers = 'jessica ann smith davis';
console.log(capitalize(passengers));

// .padStart() adiciona o mesmo caractere antes da string até que ela tenha o tamanho desejado
const message = 'Go to gate 23.';
console.log(message.padStart(25, '<'));

// .padStart() adiciona o mesmo caractere depois da string até que ela tenha o tamanho desejado
console.log(message.padEnd(25, '>'));

// .repeat() repete a string um número de vezes
console.log('hip'.repeat(2) + ' hurray!'); //'hiphip hurray!'

/**
 * 129. Desafio #4
 */

function convertCase(variable, amount) {
  if (!variable.includes('_')) {
    return;
  }

  const words = variable.trim().toLowerCase().split('_');
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    words[i] = word[0].toUpperCase() + word.slice(1);
  }
  console.log(words.join('').padEnd(20, ' '), '[V]'.repeat(amount)); // No lugar do emoji, coloquei '[V]'
}

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// Quando o botão for clicado, processe as variáveis
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  for (const [i, v] of text.split('\n').entries()) {
    convertCase(v, i + 1);
  }
});

/**
 * 130. Prática dos métodos de string
 */

// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25
//   +_Arrival;bru0943384722;fao93766109;11:45
//   +_Delayed_Arrival;hel7439299980;fao93766109;12:05
//   +_Departure;fao93766109;lis2323639855;12:30';

for (flight of flights.split('+')) {
  let [type, from, to, time] = flight.split(';');

  type = type.replaceAll('_', ' ').trim();
  if (type.startsWith('Delayed')) {
    type = '<!> ' + type; // troca bolinha por <!>
  }

  from = from.slice(0, 3).toUpperCase();
  to = to.slice(0, 3).toUpperCase();

  time = time.replace(':', 'h');
  console.log(`${type} from ${from} to ${to} (${time})`.padStart(50, ' '));
}
