'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/**
 * 152. Criando elementos DOM
 */

/**
 * Insere a movimentação da conta na página
 * @param {[Number]} movements A lista com a movimentação da conta do usuário
 */
function displayMovements(movements) {
  // limpa o elemento
  containerMovements.innerHTML = '';
  // insere valores
  movements.forEach(function (amount, i) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${amount}€</div>
        </div>
`;
    // insere elemento dentro do elemento, na primeira posição
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
}

// displayMovements(account1.movements); //movido

/**
 * 156. Computing Usernames
 */

/**
 * Cria um nome de usuário em cada conta
 * @param {[Object]} accounts
 */
function createUsernames(accounts) {
  accounts.forEach(function (acc, index, arr) {
    const initials = acc.owner.split(' ').map(name => name[0]); // separa palavras e pega a primeira letra
    acc.username = initials.join('').toLowerCase(); // junta as letras e coloca em caixa baixa
  });
}

createUsernames(accounts);

/**
 * 158. Método .reduce() parte 2
 */

function calcDisplayBalance(movements) {
  const balance = movements.reduce((acc, amount) => acc + amount, 0); // calcula o balanço
  labelBalance.textContent = `${balance}€`;
}

// calcDisplayBalance(account1.movements);

/**
 * 160. A mágica de encadear métodos parte 2
 */
function calcDisplaySummary(account) {
  const totalIn = account.movements
    .filter(amount => amount > 0) // filtra depósitos
    .reduce((total, amount) => total + amount, 0); // soma tudo
  labelSumIn.textContent = `${totalIn}€`;

  const totalOut = account.movements
    .filter(amount => amount < 0) // filtra retiradas
    .reduce((total, amount) => total + amount, 0); // soma tudo
  labelSumOut.textContent = `${Math.abs(totalOut)}€`; // mostra sem o sinal

  const interest = account.interestRate / 100;
  const earnings = account.movements
    .filter(amount => amount > 0) // filtra depósitos
    .map(deposit => deposit * interest) // aplica taxa de juros
    .filter(earning => earning >= 1) // só inclui ganhos maiores que 1
    .reduce((total, amount) => total + amount, 0); // soma ganhos
  labelSumInterest.textContent = `${earnings.toFixed(2)}€`;
}

// calcDisplaySummary(account1.movements);

/**
 * 163. Implementando login
 */

let currentAccount;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // impede form de submeter e recarregar a página

  // Confere usuário e pin
  currentAccount = accounts.find(
    account =>
      account.username === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
  );
  console.log(currentAccount);

  // Limpa os campos de entrada e tira o foco
  inputLoginUsername.value = '';
  inputLoginUsername.blur();
  inputLoginPin.value = '';
  inputLoginPin.blur();

  // Login falhou, não continue
  if (!currentAccount) {
    // if (currentAccount === undefined) {
    containerApp.style.opacity = 0; // esconde UI
    return;
  }

  // Mostra mensagem de boas vindas e UI
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;

  // Mostra movimentação
  displayMovements(currentAccount.movements);

  // Mostra extrato
  calcDisplayBalance(currentAccount.movements);

  // Mostra resumo
  calcDisplaySummary(currentAccount);
});

/**
 * 164. Implementando transferências
 */

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  // Validar destino
  const destinationAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = ''; // limpa campo
  inputTransferTo.blur();

  // Validar quantidade
  const amount = Number(inputTransferAmount.value);
  inputTransferAmount.value = ''; // limpa campo
  inputTransferAmount.blur();

  // Validação
  if (destinationAccount === undefined) {
    // Destino não existe
    console.log("Account doesn't exist");
    return;
  }
  if (Number.isNaN(amount)) {
    // Quantidade é inválida
    console.log('Is not a valid amount.');
    return;
  }

  if (
    amount <= 0 || // quantidade negativa
    currentAccount.movements.reduce((acc, value) => value + acc, 0) < amount || // saldo insuficiente
    destinationAccount.username === currentAccount.username // transferência pra mesma conta
  ) {
    console.log('Invalid amount, not enough balance or invalid destination.');
    return;
  }

  // Transferir
  currentAccount.movements.push(-amount);
  destinationAccount.movements.push(amount);

  // Recarregar a interface com os novos valores
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummary(currentAccount);
});

/**
 * 165. O método .findIndex()
 */

// Similar ao método .find(), mas retorna o índice do elemento achado
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  const user = inputCloseUsername.value;
  inputCloseUsername.value = '';
  inputCloseUsername.blur();

  const pin = Number(inputClosePin.value);
  inputClosePin.value = '';
  inputClosePin.blur();

  // Validação de campos de entrada
  if (currentAccount.username !== user || currentAccount.pin !== pin) {
    console.log('Invalid account or password!');
    return;
  }

  // Deletar conta
  const index = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );
  accounts.splice(index, 1);

  // Esconde UI
  currentAccount = null;
  containerApp.style.opacity = 0;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Lembre-se: métodos são funções atreladas a objetos

let arr = ['a', 'b', 'c', 'd', 'e'];

//// Método .slice() é parecido com o de string, e funciona do mesmo jeito
// não modifica o array
console.log(arr.slice(2)); // só início
console.log(arr.slice(2, 4)); // início e final
console.log(arr.slice(-2)); // índice negativo, contando a partir do final
console.log(arr.slice(1, -2));
console.log(arr.slice()); // cria uma cópia

//// Método .splice() parece com .slice, mas modifica o array original
// remove elementos do array original e retorna os elementos removidos
const arr2 = [...arr];
console.log(arr2.splice(-1), arr2); // remove o último elemento

// Atenção: primeiro argumento é o índice, segundo é a quantidade de elementos!!
console.log(arr2.splice(1, 2), arr2);

//// Método .reverse() inverte o array e modifica o array original
console.log(arr.reverse(), arr);
arr.reverse();

//// Método .concat() concatena dois arrays
// Não modifica nenhum dos arrays originais e retorna a união dos dois
const arr3 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr.concat(arr3));

//// Método .join() concatena todos os elementos com um separador entre eles
console.log(arr.join(', '));
console.log(arr3.join(' - '));

/**
 * 148. O método .at
 */

// Atenção: esse método é muito novo (ES2022)

const sample = [12, 13, 41];
console.log(`com brackets: ${sample[0]}, com .at(): ${sample.at(0)}`); // é equivalente a notação de array

// Para pegar o último elemento
console.log(sample[sample.length - 1]);
console.log(sample.slice(-1)[0]);
console.log(sample.at(-1)); // .at() permite índices negativos, que contam a partir do final
console.log('Jonas'.at(-1)); // também funciona em strings

/**
 * 149. Looping arrays com .forEach
 */

const lastMovements = [200, 450, -400, 3000, 650, -130, 70, 1300];

console.log('=> for..of');
// Maneira usual de iterar pelos valores de um array com for..of
for (const amount of lastMovements) {
  if (amount > 0) {
    console.log(`You deposited ${amount}.`);
  } else {
    console.log(`You withdrew ${amount}.`);
  }
}

console.log('=> .forEach()');
// Iterando com método .forEach()
lastMovements.forEach(function (amount) {
  // use um callback que vai ser chamado em cada iteração
  if (amount > 0) {
    console.log(`You deposited ${amount}.`);
  } else {
    console.log(`You withdrew ${amount}.`);
  }
});

console.log('=> for..of .entries()');
// Maneira usual de iterar pelos valores de um array com for..of
for (const [index, amount] of lastMovements.entries()) {
  if (amount > 0) {
    console.log(`At ${index}, you deposited ${amount}.`);
  } else {
    console.log(`At ${index}, you withdrew ${amount}.`);
  }
}

console.log('=> .forEach() (value, index, array)');
// Iterando com método .forEach(), especificando os três argumentos
lastMovements.forEach(function (amount, index, array) {
  // use um callback que vai ser chamado em cada iteração
  if (amount > 0) {
    console.log(`At ${index}, you deposited ${amount}.`);
  } else {
    console.log(`At ${index}, you withdrew ${amount}.`);
  }
});

// Atenção: NÃO É POSSÍVEL SAIR DO LOOP .forEach() COM break; OU continue;
// -------- Se precisar terminar o loop mais cedo, use for..of

/**
 * 150. .forEach() com maps e sets
 */

// em maps, o método .forEach funciona de modo parecido com arrays
currencies.forEach(function (value, key, map) {
  console.log(`${key} - ${value}`);
});

// sets não têm chaves, ou índices
// no método .forEach() de um set possui três argumentos por questão de compatibilidade, mas o primeiro é igual ao segundo
const uniqueCurrencies = new Set([
  'BRL',
  'USD',
  'GBP',
  'EUR',
  'BRL',
  'BRL',
  'BRL',
]);
console.log(uniqueCurrencies);
uniqueCurrencies.forEach(function (value, value2, set) {
  // value === value2
  console.log(`${value2} - ${value}`);
});

/**
 * 153. Desafio de código #1
 */

// Create function
function checkDogs(juliaDogs, kateDogs) {
  // 1. Remove cats from julia
  const juliaDogsCorrected = juliaDogs.slice(); // copia array
  juliaDogsCorrected.splice(0, 1); // remove o primeiro gato, primeiro elemento
  juliaDogsCorrected.splice(-2); // remove os outros gatos, último e antepenúltimo elementos

  // 2. Create array with julia and kate's dogs
  const allDogs = juliaDogsCorrected.concat(kateDogs);
  // const allDogs = [...juliaDogsCorrected, ...kateDogs]; // equivalente ao acima

  // const allDogs = [...juliaDogs.slice(1, -2), ...kateDogs]; // faz passo 1 e 2

  // 3. For each dog log if it's a puppy or adult
  allDogs.forEach(function (dogAge, index) {
    const ageText = dogAge < 3 ? 'a puppy' : 'an adult';
    const agePlural = dogAge === 1 ? '' : 's';
    console.log(
      `Dog number ${
        index + 1
      } is ${ageText} and is ${dogAge} year${agePlural} old.`
    );
  });
}

// 4. Run for both datasets
// Test data 1
let juliaDogs = [3, 5, 2, 12, 7];
let kateDogs = [4, 1, 15, 8, 3];
checkDogs(juliaDogs, kateDogs);

// Test data 2
juliaDogs = [9, 16, 6, 8, 3];
kateDogs = [10, 5, 6, 1, 4];
checkDogs(juliaDogs, kateDogs);

/**
 * 155. O método .map()
 */
// Aplica uma função sobre cada elemento do array, retornando um novo array
// Não modifica o array original

// Exemplo: converter usd para eur
const eurToUsd = 1.1;

// Com função anônima
// const movementsUSD = movements.map(function (amount) {
//   return amount * eurToUsd;
// });

// Com arrow function
const movementsUSD = movements.map(amount => amount * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// Equivalente em um loop for..of
const movementsUSDfor = [];
for (const amount of movements) {
  movementsUSDfor.push(amount * eurToUsd);
}

console.log(movementsUSDfor);

// De modo similar a .forEach(), a função callback de .map() recebe três argumentos
const movementDescriptions = movements.map(function (amount, index, arr) {
  // if (amount > 0) {
  //   return `Movement ${index}: You deposited ${amount}.`;
  // } else {
  //   return `Movement ${index}: You withdrew ${amount}.`;
  // }
  return `Movement ${
    index + 1
  }: You ${amount > 0 ? 'deposited' : 'withdrew'} \$${Math.abs(amount).toFixed(2)}.`;
});

console.log(movementDescriptions);

/**
 * 157. O método .filter()
 */

// Itera pelo array e filtra elementos de acordo com uma condição
const deposits = movements.filter(amount => amount > 0); // só permite elementos no qual a movimentação é maior que zero
console.log(movements, deposits);

// Loop Equivalente
const depositsFor = [];
for (const amount of movements) {
  if (amount > 0) depositsFor.push(amount);
}

const withdrawals = movements.filter(amount => amount < 0);
console.log(movements, withdrawals);

const withdrawalsFor = [];
for (const amount of movements) {
  if (amount < 0) withdrawalsFor.push(amount);
}
console.log(movements, withdrawalsFor);

/**
 * 158. Método .reduce()
 */

// Condensa todos os valores de um array em um único valor
// A função recebe dois argumentos: a função de callback e o valor inicial do acumulador
// A função de callback recebe quatro argumentos: acumulador, valor, índice e o array

const balance = movements.reduce((acc, amount) => acc + amount, 0);
// const balance = movements.reduce(function (acc, amount, index, arr) {
//   console.log(`Iteration ${index + 1}: ${amount} + ${acc} = ${acc + amount}`);
//   return acc + amount;
// }, 0);
console.log(balance);

// Loop for equivalente
let balanceAcc = 0;
for (const amount of movements) {
  balanceAcc += amount;
}
console.log(balanceAcc);

// Exemplo: valor máximo
const maxMovement = movements.reduce(
  (max, amount) => (amount > max ? amount : max),
  movements[0]
);

console.log(`Maximum: ${maxMovement}`);

/**
 * 159. Desafio de código #2
 */

function calcAverageHumanAge(dogsAges) {
  const asHumanAges = dogsAges.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  const adults = asHumanAges.filter(humanAge => humanAge >= 18);
  const sum = adults.reduce((acc, age) => age + acc, 0);
  return sum / adults.length;
}

juliaDogs = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanAge(juliaDogs));

kateDogs = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(kateDogs));

/**
 * 160. A mágica de encadear métodos
 */
// Exemplo: Soma dos depósitos em dólares em uma única linha
const totalDepositsUSD = movements
  .filter(amount => amount > 0)
  .map(amount => amount * eurToUsd)
  .reduce((total, amount) => total + amount, 0);
// É possível encadear métodos enquanto um array for retornado

console.log(totalDepositsUSD);

// Para verificar sobre o quê se está iterando use o último argumento do callback
// Esse argumento contém o array de entrada
const totalwithdrawalsUSD = movements
  .filter((amount, index, arr) => {
    console.log(`Filtro sobre ${arr}`);
    return amount < 0;
  })
  .map((amount, index, arr) => {
    console.log(`Mapeamento sobre ${arr}`);
    return amount * eurToUsd;
  })
  .reduce((total, amount, index, arr) => {
    console.log(`Redução sobre ${arr}`);
    return total + amount;
  }, 0);

// Atenção: Encadear muitos métodos pode prejudicar performance!!
// Atenção: É má prática encadear métodos que modificam o array original, como por exemplo .splice() ou .reverse()

/**
 * 161. Desafio de código #3
 */

const calcAverageHumanAge2 = dogsAges =>
  dogsAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // acc + (age / arr.length);

console.log(calcAverageHumanAge(juliaDogs));
console.log(calcAverageHumanAge2(juliaDogs));

console.log(calcAverageHumanAge(kateDogs));
console.log(calcAverageHumanAge2(kateDogs));

/**
 * 162. O método .find()
 */

// Itera sobre o array e encontra um elemento
// Recebe uma função de callback que filtra cada elemento
// Retorna o primeiro elemento que satisfaz a condição da callback, principal diferença para .filter()
// Retorna undefined se nenhum elemento satisfazer a condição

// Exemplo: Achar o primeiro saque
console.log(movements.find(mov => mov > 0));

// Exemplo: encontrar a conta de "Jessica Davis"
console.log(accounts.find(acc => acc.owner === 'Jessica Davis'));

// Desafio: implementar a linha acima usando um loop for..of
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    console.log(acc);
    break;
  }
}

/**
 * 166. Os métodos .findLast() e .findLastIndex()
 */

// Atenção: São métodos muito novos (ES2023)!
// Encontram a última ocorrência, contrapartes de .find() e .findIndex()

const lastWithdrawal = movements.findLast(amount => amount < 0);

console.log(`Last withdrawal: ${lastWithdrawal}`);

const lastLargeMovement = movements.findLastIndex(
  amount => Math.abs(amount) >= 1000
);

console.log(
  `Your last large movement was ${
    movements.length - lastLargeMovement
  } movements ago.`
);
