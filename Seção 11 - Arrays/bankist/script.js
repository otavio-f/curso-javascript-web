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
function displayMovements(movements, sort = false) {
  // limpa o elemento
  containerMovements.innerHTML = '';

  // ordena o array se for necessário
  const arr = sort ? [...movements].sort((a, b) => a - b) : movements;

  // insere valores
  arr.forEach(function (amount, i) {
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

/**
 * 167. Métodos .some() e .every() parte 2
 */
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  // Obter quantidade
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  // Validar quantidade
  if (Number.isNaN(amount) || amount <= 0) {
    console.log('Invalid amount');
    return;
  }
  if (!currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    console.log(
      'You need to have a deposit with at least 10% of the requested loan.'
    );
    return;
  }

  // Emprestar
  currentAccount.movements.push(amount);

  // Recarregar a interface com os novos valores
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummary(currentAccount);
});

/**
 * 170. Ordenando arrays parte 2
 */
// Mudar a classe do botão ao invés de usar variáveis parece melhor
// Por outro lado, adicionar dois event listeners pra mesma função não parece bom
let sortMovements = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  sortMovements = !sortMovements; // inverte o valor
  displayMovements(currentAccount.movements, sortMovements);
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

/**
 * 167. Métodos .some() e .every()
 */

// .some() recebe um callback e retorna se pelo menos um elemento obedece a condição
const anyWithdrawals = movements.some(amount => amount < 0);
console.log(anyWithdrawals);

const anyLargeWithdrawals = movements.some(amount => amount < -1000);
console.log(anyLargeWithdrawals);

// .every() recebe um callback e retorna se todos os elementos obedecem a condição
console.log(account1.movements.every(amount => amount > 0)); // confere se só há depósitos
console.log(account4.movements.every(amount => amount > 0)); // confere se só há depósitos

// Callback separado
const isDeposit = amount => amount > 0;
console.log(account1.movements.every(isDeposit)); // confere se só há depósitos
console.log(account4.movements.every(isDeposit)); // confere se só há depósitos

/**
 * 168. Métodos .flat() e .flatMap()
 */
// Transforma arrays de múltiplos níveis em um só
const countThree = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(countThree.flat());

// para arrays com mais de um nível, use o argumento, que por padrão é 1
const countMixed = [1, 2, 3, [4, 5, [6, 7]], [8, 9]];
console.log(countMixed.flat()); // padrão é um nível
console.log(countMixed.flat(2));

// Exemplo: encontrar o saldo de todas as contas
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((sum, val) => val + sum, 0);

console.log(`All accounts balance is ${overallBalance.toFixed(2)}\$`);

// Método .flatMap() combina .flat().map() em uma única chamada
const overallBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, val) => val + sum, 0);

console.log(`All accounts balance is ${overallBalance.toFixed(2)}\$`);

/**
 * 169. Desafio de código #4
 */

// DADOS
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Armazene o peso médio de um husky em uma variável "huskyWeight"
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;

console.log(`Average husky weight: ${huskyWeight}`);

// 2. Ache o nome da raça que goste de correr e buscar
const runFetcher = breeds.find(
  breed =>
    breed.activities.includes('running') && breed.activities.includes('fetch')
);

console.log(`Dog who likes running and fetching: ${runFetcher.breed}`);

// 3. Crie um array com todas as atividades de todos os cachorros
const allActivities = breeds.map(breed => breed.activities).flat();

console.log(`All activities: ${allActivities}`);

// 4. Crie um array com atividades únicas
const uniqueActivities = new Set(allActivities);

console.log(`All unique activities: ${[...uniqueActivities]}`);

// 5. Obtenha as outras atividades de cachorros que gostam de nadar
const swimmingAdjacent = breeds
  .filter(breed => breed.activities.includes('swimming'))
  .map(breed => breed.activities)
  .flat()
  .filter(activity => activity !== 'swimming');

console.log(`Swimming adjacent activities: ${swimmingAdjacent}`);

// 6. Verifique se todas as raças de cachorro tem um peso médio de pelo menos 10Kg
const allWeighsAtLeast = breeds.every(breed => breed.averageWeight > 10);

console.log(
  `Do all breeds weight at least 10kg? ${allWeighsAtLeast ? 'Yes' : 'No'}.`
);

// 7. Verifique se existe alguma raça de cachorro que seja ativa
const anyActive = breeds.some(breed => breed.activities.length >= 3);
console.log(`Is there any breed that is active? ${anyActive ? 'Yes' : 'No'}.`);

// Bonus: Achar o peso da raça mais pesada que goste de buscar
const heaviestFetcher = breeds
  .filter(breed => breed.activities.includes(fetch))
  .reduce(
    (maxWeight, breed) => Math.max(breed.averageWeight > maxWeight),
    breeds[0].averageWeight
  );

console.log(`Heaviest weight of breed that likes to fetch: ${heaviestFetcher}`);

/**
 * 170. Ordenando arrays
 */

// Ordena um array, modificando o array original e retornando o array ordenado
const owners = ['Jonas', 'Zack', 'Adam', 'Anna'];
console.log(owners.sort());

// .sort() ordena arrays baseado em strings
// cada valor é convertido para string e então comparado
// isso significa que arrays com números podem acabar com a ordem errada
const movementsWrongOrder = [...movements].sort();
console.log(movementsWrongOrder);

// para ordenar outros tipos corretamente, a função recebe uma função comparadora
// a função comparadora por sua vez recebe dois argumentos: um elemento e o elemento imediatamente posterior a ele
// a função deve retornar um valor negativo ou um positivo similar ao .compareTo() do java
const movementsAscending = [...movements].sort((a, b) => (a > b ? 1 : -1));
// const movementsAscending = [...movements].sort((a, b) => a - b); // só precisa retornar um positivo ou negativo
console.log(movementsAscending);

const movementsDescending = [...movements].sort((a, b) => (a < b ? 1 : -1));
// const movementsDescending = [...movements].sort((a, b) => a + b); // só precisa retornar um positivo ou negativo
console.log(movementsDescending);

/**
 * 171. Agrupamento de arrays
 */
// Função Object.groupBy() permite agrupar elementos com base em uma condição
// Atenção: Função muito nova (ES2024)

// Exemplo: Agupar movimentação por depósito ou saque
const groupedMovements = Object.groupBy(movements, amount =>
  amount > 0 ? 'deposits' : 'withdrawals'
);
// Os elementos são agrupados em um objeto com os grupos como propriedades
console.table(groupedMovements);

// Exemplo: Agrupar contas pela quantidade de movimentações: muito ativa, ativa, moderada, inativa
const groupedAccounts = Object.groupBy(accounts, account => {
  const count = account.movements.length;
  if (count >= 8) return 'very active';
  if (count >= 4) return 'active';
  if (count >= 1) return 'moderate';
  return 'inactive';
});

console.table(groupedAccounts);

/**
 * 172. Mais maneiras de criar e preencher arrays
 */
// Maneiras de criar um array de modo automático

// 1. Array vazio com .fill()
// O array vai ser preenchido com a quantidade de "elementos vazios"
const arrEmpty = new Array(7);

console.log(arrEmpty);
// Arrays criados desta forma só podem ser preenchidos com o método .fill()
// Nenhum outro método funciona

// O método .fill() preenche o array com o argumento, modificando o array e retornando
arrEmpty.fill(7);
console.log(arrEmpty);

// É possível especificar início e final como segundo e terceiro argumentos
console.log(new Array(10).fill('x', 2)); // preenche a partir do terceiro elemento com 'x'
console.log(new Array(10).fill('y', 1, 4)); // preenche desde o segundo até o quarto elemento com 'y'
console.log(new Array(10).fill('z', -2)); // preenche os dois últimos elementos com 'z'

// 2. Array.from()
// Recebe um objeto com a propriedade .length e uma função callback
// A função callback recebe três argumentos, similar ao callback da função .map(): elemento, índice e o array
const sevenOnes = Array.from({ length: 7 }, () => 1); // sete uns
console.log(sevenOnes);

const countToSeven = Array.from({ length: 7 }, (_, index) => index + 1); // de um a sete
console.log(countToSeven);

const twoPots = Array.from({ length: 11 }, (_, index) => Math.pow(2, index)); // potências de dois de zero a dez
console.log(twoPots);

// Exemplo: Calcular a soma das transações de acordo com os valores na tela, quando clicar no balanço total
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), // Recupera todos os valores na tela
    elem => Number.parseInt(elem.textContent) // Converte até achar um símbolo que não possa converter
  );
  console.log(
    `The sum of all is ${movementsUI.reduce((sum, value) => sum + value, 0)}.`
  );
});

/**
 * 173. Alternativas não destrutivas de alguns métodos
 */

// .toReversed(): Alternativa a .reverse()
const movementsCopy = Array.from(movements);
console.log(movements.toReversed(), movements);

// .toSorted(): Alternativa a .sort()
console.log(
  movements.toSorted((a, b) => a - b), // ordem ascendente
  movements
);

// .toSpliced(): Alternativa a .splice()
// .splice() modifica o array e retorna os elementos removidos, enquanto .toSpliced() só retorna o array modificado
console.log(
  movements.toSpliced(1, 2), // Remove dois elementos a partir do segundo
  movements
);

// .with(): Alternativa a atribuição de índice
// Recebe dois argumentos: o índice e o novo valor
// Retorna o novo array
console.log(
  movements.with(1, 9000), // substitui o segundo elemento por '9000'
  movements
);

/**
 * 174. Resumo: Qual método usar
 */

const numbers = [0, -31, -1, -1, 40, 1996, 999];
let result;

// 1. Métodos para modificar arrays
let numbers2 = Array.from(numbers);

// .push(valor): Adiciona um elemento ao final do array
numbers2.push(440);
console.log(`.push(440): ${numbers2}`);

// .unshift(valor): Adiciona um elemento no começo do array
numbers2 = Array.from(numbers);
numbers2.unshift(440);
console.log(`.unshift(440): ${numbers2}`);

// .pop(): Remove último elemento
numbers2 = Array.from(numbers);
result = numbers2.pop();
console.log(`.pop(): ${numbers2} [${result}]`);

// .shift(): Remove primeiro elemento
numbers2 = Array.from(numbers);
result = numbers2.shift();
console.log(`.shift(): [${result}] ${numbers2}`);

// .splice(início, quantidade): Remove alguns elementos seguidos
numbers2 = Array.from(numbers);
result = numbers2.splice(2, 2); // remove dois elementos a partir do terceiro (terceiro e quarto)
console.log(`.splice(2, 2): [${result}] ${numbers2}`);

// .reverse(): Inverte o array
numbers2 = Array.from(numbers);
numbers2.reverse();
console.log(`.reverse(): ${numbers2}`);

// .sort(callback(elemento, elemento2)): Ordena o array
numbers2 = Array.from(numbers);
numbers2.sort((a, b) => a - b); // ordem ascendente
console.log(`.sort(ascending): ${numbers2}`);

// .fill(valor, início, fim): Preenche com elemento
numbers2 = Array.from(numbers);
numbers2.fill('"2"', 2, -1); // Preenche com dois (string) dois elementos a partir do segundo elemento até o penúltimo
console.log(`.fill("2", 2, -1): ${numbers2}`);

// 2. Novo array baseado no original

// .map(callback(elemento, índice, array)): Transforma cada elemento
result = numbers.map(value => value * 2); // dobra o valor
console.log(`.map(double): ${result}`);

// .filter(callback(elemento, indice, array)): Filtra de elementos
result = numbers.filter(value => value % 2 === 0); // somente pares
console.log(`.filter(even): ${result}`);

// .slice(início, fim): Copia uma seção do array
result = numbers.slice(1, -1); // do segundo ao penúltimo
console.log(`.slice(second to prev last): ${result}`);

// .with(índice, valor): Copia o array, substituindo um valor
result = numbers.with(0, 1_000_000); // substitui primeiro por um milhão
console.log(`.with(first is million): ${result}`);

// .flat(dimensões): Reduz arrays multidimensionais para unidimensionais
result = [
  [0, 1],
  [2, 3],
].flat();
console.log(`[\n\t[0, 1],\n\t[2, 3]\n].flat(): [${result}]`);

// .flatMap(callback(elemento, índice, array)): Aplica uma transformação e reduz as dimensões (deveria ser mapFlat então, não?)
result = [
  [0, 1],
  [2, 3],
].flatMap(([first, second]) => [first + 10, second * 10]);
console.log(
  `[\n\t[0, 1],\n\t[2, 3]\n].flatMap(add ten to first, ten times the second): [${result}]`
);

// .toReversed(): Inverte um array
result = numbers.toReversed();
console.log(`.toReversed(): ${result}`);

// .sort(callback(elemento, elemento2)): Ordena o array
result = numbers.toSorted((a, b) => a + b); // decrescente
console.log(`.sort(descending): ${result}`);

// .toSpliced(início, quantidade): Remove alguns elementos seguidos
result = numbers.toSpliced(2, 2); // remove dois elementos a partir do terceiro (terceiro e quarto)
console.log(`.toSpliced(2, 2): [${result}]`);

// .concat(outro): Concatena dois arrays (primeiro + outro)
result = numbers.concat([1, 2, 3]);
console.log(`.concat([1, 2, 3]): [${result}]`);

// 3. Encontrar índices

// .indexOf(elemento): ìndice da primeira ocorrência de um elemento no array
result = numbers.indexOf(40);
console.log(`.indexOf(40): ${result} (${numbers[result]})`);

// .findIndex(callback(valor, índice, array)): ìndice da primeira ocorrência de um elemento que obedece a condição
result = numbers.findIndex(value => value % 2 == 1);
console.log(`.findIndex(odd): ${result} (${numbers[result]})`);

// .findLastIndex(callback(valor, índice, array)): ìndice da última ocorrência de um elemento que obedece a condição
result = numbers.findLastIndex(value => value % 2 == 1);
console.log(`.findLastIndex(odd): ${result} (${numbers[result]})`);

// 4. Encontrar elementos

// .at(índice): Elemento na posição do índice
result = numbers.at(2); // tercero
console.log(`.at(2): ${result}`);

// .find(callback(valor, índice, array)): primeira ocorrência de um elemento que obedece a condição
result = numbers.find(value => value < 0);
console.log(`.find(negative): ${result}`);

// .findLast(callback(valor, índice, array)): última ocorrência de um elemento que obedece a condição
result = numbers.findLast(value => value < 0);
console.log(`.findLast(negative): ${result}`);

// 5. Testar condição

// .includes(valor): Verifica se o array contém o valor
result = numbers.includes(4000);
console.log(`.includes(4000)? ${result ? 'Yes' : 'No'}.`);

// .some(callback(valor, índice, array)): Verifica se pelo menos um elemento obedece a condição
result = numbers.some(value => value > 1000); //algum valor maior que mil?
console.log(`.some(bigger than a thousand)? ${result ? 'Yes' : 'No'}.`);

// .every(callback(valor, índice, array)): Verifica se pelo menos um elemento obedece a condição
result = numbers.every(value => value < 1_000_000); //todos são menores que um milhão?
console.log(`.every(smaller than a million)? ${result ? 'Yes' : 'No'}.`);

// 6. Resumir para outro tipo

// .join(separador): Transforma para uma string usando o separador entre os elementos
result = numbers.join('---');
console.log(`.join("---"): ${result}`);

// .reduce(
//        callback(acumulador, valor, índice, array),
//        valorInicialDoAcumulador): Reduz para um valor através de uma transformação
result = numbers.reduce(
  (max, value) => (value > max && value < 0 ? value : max),
  -1
); // valor máximo negativo
console.log(`.reduce(maximum negative): ${result}`);

// 7. Iterar

// .forEach(callback(valor, índice, array)): Aplica uma função a cada elemento
console.log(`.forEach(print each item, its index and the array):`);
numbers.forEach((value, index, array) =>
  console.log(`${value} at ${index} from [${array}]`)
);

// 8. Outras operações

// Object.groupBy(array, callback(elemento, índice)): Agrupa elementos em um objeto
result = Object.groupBy(numbers, (value, index) => {
  if (value < 0) return 'negative';
  if (value > 100) return 'high';
  return 'normal';
});

console.log("Object.groupBy('negative', 'normal', 'high'):");
console.table(result);

// Array.from(tamanho): Cria um array de posições vazias
result = Array.from(5);
console.log(`Array.from(5): ${result}.`);

// Array.from(iterável): Cria um array a partir do iterável
result = Array.from('Sample Text');
console.log(`Array.from("Sample Text"): ${result}.`);

// Array.from({length: tamanho}, callback(_, índice)): Cria um array e preenche com uma função
result = Array.from({ length: 10 }, (_, index) => 100 - index); // Contagem regressiva de 100
console.log(`Array.from(length 10, countdown from a hundred): ${result}.`);

// Operador spread: Espalha elementos como se fossem digitados um a um
result = [...numbers, '---', ...numbers];
console.log(`[...numbers, "---", ...numbers]: ${result}.`);

// new Set pra Lista: Obtém valores únicos
result = [...new Set(numbers)];
console.log(`[...set of numbers]: ${result}.`);

// interseção de new Set pra Lista: Obtém valores únicos comuns a duas listas
numbers2 = [3131, 41, 0, 1996];
result = [...new Set(numbers).intersection(new Set(numbers2))];
console.log(
  `[...set of numbers, intersection with [3131, 41, 0, 1996] ]: ${result}.`
);

// Pulei aula 175 porque já fiz bastante prática na aula anterior

/**
 * 176. Desafio de código #5
 */

// DADOS
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Calcule a quantidade recomendada de comida para cada cachorro e adicione como uma nova propriedade
dogs.forEach(dog => {
  dog.recFood = dog.weight ** 0.75 * 28;
});

console.log(dogs);

// 2. Ache o cachorro de Sarah e log se ele está comendo muito ou pouco
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
const eatDiff = sarahDog.recFood - sarahDog.curFood;
if (Math.abs(eatDiff) > 0.1 * sarahDog.recFood) {
  console.log(`Sarah's dog is eating too ${eatDiff < 0 ? 'little' : 'much'}!`);
} else {
  console.log(`Sarah's dog is eating okay.`);
}

// 3. Arrays com donos de cachorros que comem demais e cachorros que comem pouco
const ownersTooMuch = dogs
  .filter(dog => dog.curFood > 1.1 * dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersTooMuch);

const ownersTooLittle = dogs
  .filter(dog => dog.curFood < 0.9 * dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersTooLittle);

// 4. Formate e log para o console os arrays do exercício anterior
console.log(ownersTooMuch.join(' and ') + "'s dogs eat too much!");

console.log(ownersTooLittle.join(' and ') + "'s dogs eat too little!");

// 5. Log para o console se há algum cachorro que coma a quantidade recomendada
console.log(
  dogs.some(dog => Math.abs(dog.recFood - dog.curFood) < 0.1 * dog.recFood)
); // diferença absoluta de menos de 10%

// 6. Log para o console se todos cachorros comem a quantidade recomendada
console.log(
  dogs.every(dog => Math.abs(dog.recFood - dog.curFood) < 0.1 * dog.recFood)
); // diferença absoluta de menos de 10%

// 7. Ache todos os cachorros que estão comendo a quantidade recomendada
console.log(
  dogs.filter(dog => Math.abs(dog.recFood - dog.curFood) < 0.1 * dog.recFood)
); // diferença absoluta de menos de 10%

// 8. Agrupe os cachorros em três grupos: 'exact', 'too little', 'too much'
const dogsByFoodAmount = Object.groupBy(dogs, dog => {
  if (dog.curFood > 1.1 * dog.recFood) return 'too-much';
  if (dog.curFood < 0.9 * dog.recFood) return 'too-little';
  return 'exact';
});

console.table(dogsByFoodAmount);

// 9. Agrupe os cachorros pelo número de donos
const dogsByOwnerAmount = Object.groupBy(dogs, dog => {
  return String(dog.owners.length);
});

console.table(dogsByOwnerAmount);

// 10. Ordene os cachorros pela quantidade recomendada de comida em ordem ascendente, sem modificar o array original
const dogsAscendingFood = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(dogsAscendingFood);
