'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

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

/**
 * 179. Convertendo e verificando números
 */

// números são sempre ponto flutuante, formato binário de 64 bits
console.log(23.0 === 23);

// a representação binária pode introduzir erro de arredondamento
console.log(0.1 + 0.2); //deveria ser 0.3, não 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // deveria ser verdadeiro

// convertendo strings para números
console.log(Number('222')); // Maneira padrão usando conversor explícito
console.log(+'222'); // Maneira alternativa usando coerção de tipo
// No projeto, não vou substituir pela versão curta

console.log(Number.parseInt('222')); // Outra maneira usando a função
console.log(Number.parseInt('310$999')); // Para no primeiro símbolo que não consegue converter e descarta o resto: 310
console.log(Number.parseInt('a913')); // não consegue converter se o primeiro símbolo não for válido, retorna NaN

// Também é possível especificar uma base alternativa pelo segundo argumento
console.log(Number.parseInt('0xff', 16)); //255
console.log(Number.parseInt('77', 8)); // também funciona sem o prefixo: 255

// Versão para ponto flutuante: Number.parseFloat()
console.log(Number.parseFloat('0.111'));
console.log(Number.parseFloat('.111')); // iniciando com ponto é equivalente a iniciar com zero
console.log(Number.parseFloat('1.0')); // Inteiro
console.log(Number.parseFloat('0.41x0.35')); // Para no primeiro símbolo que não consegue converter e descarta o resto: 0.41
console.log(Number.parseFloat('a.913')); // não consegue converter se o primeiro símbolo não for válido, retorna NaN

// Number.isNaN(): verifica se o valor é um número
console.log(Number.isNaN(42)); // false, é um número
console.log(Number.isNaN('abcd')); // false, não é um número válido
console.log(Number.isNaN(0 / 0)); // true, 0/0 === NaN
console.log(Number.isNaN(1 / 0)); // false, qualquer coisa/0 === Infinite
console.log(Number.isNaN(Number('abcd'))); // true, Number() retorna NaN quando a conversão falha

// Number.isFinite(): verifica se o valor é um número finito (não Infinite nem NaN)
console.log(Number.isFinite(1)); // true
console.log(Number.isFinite(1 / 3)); // true
console.log(Number.isFinite('abcd')); // false, nem é um número!
console.log(Number.isFinite(0 / 0)); // false
console.log(Number.isFinite(1 / 0)); // false
console.log(Number.isFinite(+'abcd')); // false

// Number.isInteger(): verifica se o valor é um inteiro
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(1 / 3)); // false
console.log(Number.isInteger('1')); // false, ainda não é número!
console.log(Number.isInteger('abcd')); // false, nem é um número!
console.log(Number.isInteger(0 / 0)); // false
console.log(Number.isInteger(1 / 0)); // false
console.log(Number.isInteger(+'abcd')); // false
