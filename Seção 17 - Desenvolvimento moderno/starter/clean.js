'use strict';
/**
 * 291. Consertando código ruim 1
 */

// substitui todos var por const e alguns let

/**
 * 293. Consertando código ruim 2
 */

// usa Object.freeze() para tornar variáveis imutáveis
// Atenção: Object.freeze só congela o primeiro nível. Objetos no array budget ainda podem ser modificados.

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

/**
 * Obtém o limite de gastos do usuário
 * @param {[Object]} limits objeto de limites
 * @param {String} user nome do usuário
 * @returns O limite do usuário ou zero se não puder ser obtido
 */
function getSpendingLimit(limits, user) {
  return limits[user] || 0;
}

/**
 * Adiciona gasto à lista de gastos
 * @param {[Object]} o array de budgets
 * @param {[Object]} o array de limites
 * @param {Number} value Valor a adicionar
 * @param {String} description Descrição do gasto
 * @param {String} user Usuário
 * @returns {[Object]} o array modificado
 */
const addExpense = function (
  budget,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // adiciona o array a função para deixar mais pura
  // if (!user) user = 'jonas'; // parâmetro padrão
  // user = user.toLowerCase();
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // const lim = spendingLimits[user] || 0; // curto circuito troca padrão acima
  // const lim = getSpendingLimit(user); // substitui código repetido por função

  // if (value <= lim) {
  //   budget.push({ value: -value, description: description, user: user });
  // }

  // if (value <= lim) { // remove variável usada somente uma vez
  // if (value <= getSpendingLimit(cleanUser)) {
  //   // remover reatribuição de parâmetro
  //   // remover chave-valor duplicadas usando literais de objeto melhorados
  //   // budget.push({ value: -value, description, user: cleanUser });

  //   // alterar para retorno
  //   return Object.freeze([
  //     ...budget,
  //     { value: -value, description, user: cleanUser },
  //   ]);
  // }

  return value <= getSpendingLimit(cleanUser)
    ? Object.freeze([
        ...budget,
        { value: -value, description, user: cleanUser },
      ])
    : Object.freeze([...budget]);
};

// mudando para código declarativo
// addExpense(10, 'Pizza 🍕');
// addExpense(100, 'Going to movies 🍿', 'Matilda');
// addExpense(200, 'Stuff', 'Jay');
// console.log(budget);
const budget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const budget2 = addExpense(
  budget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const budget3 = addExpense(budget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(budget3);

/**
 * Checa e marca se algum dos gastos está acima do limite
 * @param {[Object]} budget o array de budgets
 * @param {[Object]} limits o array de limites
 */
const checkExpenses = function (budget, limits) {
  // for (const el of budget) {
  //   let lim;
  //   if (spendingLimits[el.user]) {
  //     lim = spendingLimits[el.user];
  //   } else {
  //     lim = 0;
  //   }

  //   if (el.value < -lim) {
  //     el.flag = 'limit';
  //   }
  // }

  // substitui loop for..of por forEach
  return budget.map(item => {
    // renomeia variável de loop
    // const limit = spendingLimits[item.user] || 0; // usa curto circuito ao invés de if..else
    // const limit = getSpendingLimit(item.user); // substitui código repetido por função
    // if (item.value < -limit) { // remove variável usada somente uma vez
    // if (item.value < -getSpendingLimit(limits, item.user)) {
    //   item.flag = 'limit';
    // }
    return item.value < -getSpendingLimit(limits, item.user)
      ? { ...item, flag: 'limit' }
      : { ...item };
  });
};
const finalBudget = checkExpenses(budget3, spendingLimits); // poderia substituir por IIFE, não?

console.log(finalBudget);

/**
 * Mostra quais gastos são maiores que o limite
 * @param {[Object]} budget array de gastos
 * @param {Number} limit limite de gastos
 */
const showBigExpenses = function (budget, limit) {
  // let output = '';
  // for (const el of budget) {
  //   if (el.value <= -limit) {
  //     output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   }
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // substitui concatenação e atribuição
  // renomeia para variável de loop que faz mais sentido (el -> item)
  return budget
    .filter(item => item.value <= -limit) // substitui filtro usando for..of..if
    .map(item => item.description.slice(-2)) // substitui operação dentro da condição
    .join(' / '); // substitui adicionar o separador (' / ') e remover o último
};
console.log(showBigExpenses(finalBudget, 1000));
