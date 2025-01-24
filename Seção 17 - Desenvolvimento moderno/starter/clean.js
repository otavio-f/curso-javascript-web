/**
 * 291. Consertando código ruim 1
 */

// substitui todos var por const e alguns let

const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

/**
 * Obtém o limite de gastos do usuário
 * @param {String} user nome do usuário
 * @returns O limite do usuário ou zero se não puder ser obtido
 */
function getSpendingLimit(user) {
  return spendingLimits[user] || 0;
}

/**
 * Adiciona gasto à lista de gastos
 * @param {Number} value Valor a adicionar
 * @param {String} description Descrição do gasto
 * @param {String} user Usuário
 */
const addExpense = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas'; // parâmetro padrão
  // user = user.toLowerCase();

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
  if (value <= getSpendingLimit(user.toLowerCase())) {
    // remover reatribuição de parâmetro
    // remover chave-valor duplicadas usando literais de objeto melhorados
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

/**
 * Checa e marca se algum dos gastos está acima do limite
 */
const checkExpenses = function () {
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
  budget.forEach(item => {
    // renomeia variável de loop
    // const limit = spendingLimits[item.user] || 0; // usa curto circuito ao invés de if..else
    // const limit = getSpendingLimit(item.user); // substitui código repetido por função
    // if (item.value < -limit) { // remove variável usada somente uma vez
    if (item.value < -getSpendingLimit(item.user)) {
      item.flag = 'limit';
    }
  });
};
checkExpenses(); // poderia substituir por IIFE, não?

console.log(budget);

/**
 * Mostra quais gastos são maiores que o limite
 * @param {Number} limit limite de gastos
 */
const showBigExpenses = function (limit) {
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
  const output2 = budget
    .filter(item => item.value <= -limit) // substitui filtro usando for..of..if
    .map(item => item.description.slice(-2)) // substitui operação dentro da condição
    .join(' / '); // substitui adicionar o separador (' / ') e remover o último
  console.log(output2);
};
showBigExpenses(1000);
