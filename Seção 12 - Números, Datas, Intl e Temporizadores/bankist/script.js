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
 * Formata a data da transação
 * @param {Date} date
 * @returns uma string no formato "dd/mm/yyyy" ou "dd days ago"
 */
function formatMovementDate(date, locale) {
  const daysPassed = Math.floor(
    Math.abs(date - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Formata a transação de acordo com os parâmetros de local
 * @param {Number} amount quantidade
 * @param {String} locale
 * @param {String} currency
 * @returns uma string formatada
 */
function formatCurrency(amount, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  };

  return new Intl.NumberFormat(locale, options).format(amount);
}

/**
 * Insere a movimentação da conta na página
 * @param {[Number]} account A conta do usuário
 */
function displayMovements(account, sort = false) {
  // limpa o elemento
  containerMovements.innerHTML = '';

  const movements = account.movements.map((_, index) => ({
    amount: account.movements[index],
    date: new Date(account.movementsDates[index]),
  }));

  // ordena o array se necessário
  if (sort) movements.sort((a, b) => a.amount - b.amount);

  // insere valores
  movements.forEach(function (mov, i) {
    const date = formatMovementDate(mov.date, account.locale);
    const money = formatCurrency(mov.amount, account.locale, account.currency);
    const type = mov.amount > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${money}</div>
        </div>
`;
    // insere elemento dentro do elemento pai, na primeira posição
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

/**
 * Calcula e mostra o saldo da conta
 * @param {*} account
 */
function calcDisplayBalance(account) {
  const balance = account.movements.reduce((sum, amount) => sum + amount, 0); // calcula o balanço
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  ); //`${balance.toFixed(2)}€`;
}

/**
 * 160. A mágica de encadear métodos parte 2
 */
/**
 * Calcula e mostra o resumo de operações da parte de baixo da tela
 * @param {Object} account
 */
function calcDisplaySummary(account) {
  const totalIn = account.movements
    .filter(amount => amount > 0) // filtra depósitos
    .reduce((total, amount) => total + amount, 0); // soma tudo
  // labelSumIn.textContent = `${totalIn.toFixed(2)}€`;
  labelSumIn.textContent = formatCurrency(
    totalIn,
    account.locale,
    account.currency
  );

  const totalOut = account.movements
    .filter(amount => amount < 0) // filtra retiradas
    .reduce((total, amount) => total + amount, 0); // soma tudo
  // labelSumOut.textContent = `${Math.abs(totalOut).toFixed(2)}€`; // mostra sem o sinal
  labelSumOut.textContent = formatCurrency(
    Math.abs(totalOut),
    account.locale,
    account.currency
  );

  const interest = account.interestRate / 100;
  const earnings = account.movements
    .filter(amount => amount > 0) // filtra depósitos
    .map(deposit => deposit * interest) // aplica taxa de juros
    .filter(earning => earning >= 1) // só inclui ganhos maiores que 1
    .reduce((total, amount) => total + amount, 0); // soma ganhos
  //labelSumInterest.textContent = `${earnings.toFixed(2)}€`;
  labelSumInterest.textContent = formatCurrency(
    earnings,
    account.locale,
    account.currency
  );
}

/**
 * Formata e mostra a data e hora
 * @param {String} locale O local
 */
function displayLocalizedDateTime(locale = navigator.language) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };

  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
}

/**
 * Recarrega os dados da conta na interface principal
 * @param {*} account
 */
function refreshUI(account) {
  // Mostra movimentação
  displayMovements(account);

  // Mostra extrato
  calcDisplayBalance(account);

  // Mostra resumo
  calcDisplaySummary(account);

  // Mostra data e hora
  displayLocalizedDateTime(account.locale);
}

/**
 * Inicia o timer de logout automático
 * @param {Object} account
 * @returns O id do timer criado
 */
function startLogoutTimer(account) {
  let time = 600;
  function tick() {
    const minutes = `${Math.trunc(time / 60)}`.padStart(2, '0');
    const seconds = `${time % 60}`.padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;
    if (time <= 0) {
      clearInterval(timerId);
      labelWelcome.textContent = 'Log in to get started.';
      containerApp.style.opacity = 0;
    }
    time--;
  }

  tick();
  const timerId = setInterval(tick, 1000);
  return timerId;
}

/**
 * 163. Implementando login
 */

let currentAccount;
let currentTimer;

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
    return;
  }

  // Mostra mensagem de boas vindas e UI
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;

  // Inicia o timer de inatividade
  clearInterval(currentTimer);
  currentTimer = startLogoutTimer(currentAccount);

  refreshUI(currentAccount);
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
  currentAccount.movementsDates.push(new Date().toISOString());
  destinationAccount.movementsDates.push(new Date().toISOString());

  // Reinicia o timer de inatividade
  clearInterval(currentTimer);
  currentTimer = startLogoutTimer(currentAccount);

  // Recarregar a interface com os novos valores
  refreshUI(currentAccount);
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

  // Para timer de logout
  clearInterval(currentTimer);
});

/**
 * 167. Métodos .some() e .every() parte 2
 */
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  // Obter quantidade
  // const amount = Number(inputLoanAmount.value);
  const amount = Math.floor(inputLoanAmount.value); // arredonda pra baixo (Aula 180)
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

  // Simular tempo de análise
  setTimeout(() => {
    // Emprestar
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Recarregar a interface com os novos valores
    refreshUI(currentAccount);

    // Reiniciar temporizador de inatividade
    clearInterval(currentTimer);
    currentTimer = startLogoutTimer(currentAccount);
  }, 5000); // cinco segundos de espera
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
  displayMovements(currentAccount, sortMovements);
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

/**
 * 180. Matemática e arredondamento
 */

// Raiz quadrada
console.log(Math.sqrt(2));
console.log(2 ** (1 / 2)); // Potência fracionária também funciona

// Máximo e mínimo
console.log(Math.max(-Infinity, 26 / 31, 9, 41, 0.12, '991', -1)); // Cada valor é um argumento, e faz coerção de tipo
console.log(Math.max(1 / 4, 26 / 31, 9, 41, 0.12, '991a', -1)); // Se a conversão de algum valor não foi possível, retorna NaN (toda operação involvendo NaN resulta em NaN)
console.log(Math.max(1 / 4, 26 / 31, 9, 41, 0.12, NaN, -1)); // Se ocorrer algum NaN, retorna NaN (toda operação involvendo NaN resulta em NaN)

console.log(Math.min(32, 0x41, 0b110, '1', 0.99, 327 / 17, 8 / 9)); // Mesmas regras de Math.max()

// Constantes
console.log(Math.PI * 9 ** 2); // pirraio ao quadrado, fórmula da área do círculo

// Números Aleatórios
console.log(Math.random()); // Número aleatório entre 0 e 1

/**
 * Gera um número aleatório no intervalo
 * @param {Number} from Valor mínimo
 * @param {Number} to Valor máximo
 * @returns Um número aleatório no intervalo from-to (inclusivo)
 */
function randInt(from, to) {
  return from + Math.trunc(Math.random() * (1 + to - from));
}

console.log(randInt(5, 10));
console.log(randInt(5, 10));

// Arredondamento
console.log(Math.trunc(23.3)); // remove a parte fracionária
console.log(Math.floor(23.3)); // rarredonda pra baixo. Decrementa números negativos, enquanto trunc não decrementa
console.log(Math.round(1.5)); // arredondamento normal
console.log(Math.ceil(3.1)); // arredonda pra cima

// Arredondamento ponto flutuante
// Atenção: .toFixed() retorna string!!!
console.log(Math.PI.toFixed(2)); // Arredonda PI pra duas casas decimais
console.log((2.7).toFixed(2)); // Adiciona zeros caso não tenha casas decimais suficientes
console.log(+(1 / 3).toFixed(3)); // Pra ter um número, converta de volta

/**
 * 181. O operador restante
 */

console.log(5 % 4); // Retorna o restante de uma divisão

const isEven = n => n % 2 === 0;
console.log(isEven(180));

// Exemplo: cores alternadas nas linhas de movimentação
labelBalance.addEventListener('dblclick', function (event) {
  event.preventDefault();
  [...document.querySelectorAll('.movements__row')].forEach((row, index) => {
    if (index % 2 === 0) row.style.backgroundColor = 'gainsboro'; //cinza clarinho
  });
});

/**
 * 182. Separadores numéricos
 */

// Facilita a escrita de números grandes
// Use underscore entre números. Javascript ignora.

// Exemplo: Um bilhão
const billion = 1_000_000_000;

// coca cola de dez reais
const cocacola2l = 10_00;

// Atenção: Só use um underscore entre números!
// Atenção: Não use no começo, nem no final, nem antes ou depois do ponto decimal! (heh, rimou)
// const _E = 2._71828; // isso dá erro
// const _E = 2_.71828; // isso dá erro
// const _E = _2.71828; // isso dá erro
// const _E = 2.71828_; // isso dá erro
// const _E = 2.718__28; // isso dá erro
const _E = 2.7_1_8_2_8; // não faz muito sentido, mas funciona

// Atenção: Só use em literais numéricos! Conversão de literais string não vai funcionar!
console.log(Number('69_900')); // NaN

/**
 * 183. Trabalhando com BigInt
 */

// Números são representados com 64 bits, nos quais 53 são usados para a parte inteira
console.log(`The biggest integer is: ${Number.MAX_SAFE_INTEGER}`); // 2 ** 53 - 1

// Números maiores podem não ser representados corretamente
console.log(`MAX + 1: ${Number.MAX_SAFE_INTEGER + 1}`);
console.log(`MAX + 2: ${Number.MAX_SAFE_INTEGER + 2}`);
console.log(`MAX + 3: ${Number.MAX_SAFE_INTEGER + 3}`);

// Para números maiores, use BigInt ou o sufixo n para literais
console.log(`MAX * 2: ${BigInt(Number.MAX_SAFE_INTEGER) * 2n}`);

// Atenção: Misturar números normais com BigInt não é permitido
// const num = 2n * 2; // vai dar erro

// Exceções são comparação e concatenação com string
console.log(7 > 6n); // true
console.log(10n === 10); // false, não são do mesmo tipo
console.log(10n == 10); // true
console.log(2n + ' is a BigInt');

// Atenção: BigInt não possui casas decimais
// Divisão sempre retorna números truncados
console.log(10n / 3n); // 3n
console.log(10 / 3);

/**
 * 184. Criando datas
 */

// Criar uma data do momento atual
console.log(new Date()); // data e hora nesse exato momento

// A partir de uma data e hora
console.log(new Date('Jan 03 2025 19:25:00')); // string com data e hora como argumento
console.log(new Date('January 03, 2025')); // outra forma
console.log(new Date('2025-03-01T19:25:00.000Z')); // forma mais confiável (ISO time)
console.log(new Date(2025, 3, 1, 19, 25, 0, 0)); // cada membro como um argumento
console.log(new Date(0)); // ms desde Epoch

// Métodos de Date
const now = new Date();

console.log(now.getFullYear()); // ano
// console.log(now.getYear()); // não use!
console.log(now.getMonth()); // mês (0-11)
console.log(now.getDate()); // dia do mês
console.log(now.getDay()); // dia da semana
console.log(now.getHours()); // hora
console.log(now.getMinutes()); // minuto
console.log(now.getSeconds()); // segundo
console.log(now.getTime()); // ms desde Epoch

console.log(now.toISOString()); // formato ISO

// Observação: Todos os métodos acima também possuem os respectivos set...()

// Para recuperar o timestamp, não é necessário criar um objeto Date
console.log(Date.now()); // timestamp desse momento

/**
 * 186. Operações com datas
 */

// Datas podem ser convertidas para números
// Atenção: Em operações, datas são convertidas para timestamp desde Epoch
const millenium = new Date(2000, 1, 1, 0, 0, 0, 0); // exatamente 2000
console.log(`01/01/2000: ${+millenium}`); // Epoch timestamp

// Exemplo: calcular dias passados entre duas datas
const calcDaysPassed = (dateA, dateB) =>
  Math.abs(dateA - dateB) / (1000 * 60 * 60 * 24);

console.log(
  `${calcDaysPassed(Date.now(), millenium).toFixed(
    2
  )} days passed since 01/01/2000.`
);

/**
 * 188. Internacionalizando datas
 */
// API de internacionalização (Intl) permite ajustar a diferentes idiomas
// Exemplo: formatar datas
const timeNow = new Date();

console.log(
  'Today is (en-us):',
  new Intl.DateTimeFormat('en-us').format(timeNow)
);
console.log(
  'Today is (ja-jp):',
  new Intl.DateTimeFormat('ja-jp').format(timeNow)
);
console.log(
  'Today is (pt-br):',
  new Intl.DateTimeFormat('pt-br').format(timeNow)
);
console.log(
  'Today is (es-ar):',
  new Intl.DateTimeFormat('es-ar').format(timeNow)
);
console.log(
  'Today is (fr-fr):',
  new Intl.DateTimeFormat('fr-fr').format(timeNow)
);
console.log(
  'Today is (ru-ru):',
  new Intl.DateTimeFormat('ru-ru').format(timeNow)
);
console.log(
  'Today is (zh-HK):',
  new Intl.DateTimeFormat('zh-hk').format(timeNow)
);

// É possível passar um objeto de opções como segundo argumento para o construtor
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

console.log(
  'Now is (en-GB):',
  new Intl.DateTimeFormat('en-GB', options).format(timeNow)
);

// Para obter o idioma usado no browser use a propriedade navigator.language
const lang = navigator.language;

console.log(
  `Now is (${lang}, took from the browser):`,
  new Intl.DateTimeFormat(lang, options).format(timeNow)
);

/**
 * 189. Internacionalizando números
 */

console.log('US:', new Intl.NumberFormat('en-US').format(Math.PI));
console.log('BR:', new Intl.NumberFormat('pt-BR').format(Math.PI));
console.log('AR:', new Intl.NumberFormat('es-AR').format(Math.PI));
console.log('RU:', new Intl.NumberFormat('ru-RU').format(Math.PI));
console.log('JP:', new Intl.NumberFormat('ja-JP').format(Math.PI));
console.log('ES:', new Intl.NumberFormat('es-ES').format(Math.PI));
console.log(
  `Browser (${navigator.language}):`,
  new Intl.NumberFormat(navigator.language).format(Math.PI)
);

// Para usar opções, forneça um objeto como segundo argumento
const unitOptions = {
  style: 'unit',
  unit: 'mile-per-hour',
};

console.log('MX:', new Intl.NumberFormat('es-MX', unitOptions).format(Math.PI));

unitOptions.style = 'currency';
unitOptions.currency = 'EUR';

console.log('UK:', new Intl.NumberFormat('en-GB', unitOptions).format(Math.PI));

/**
 * 190. Timers
 */

// dois tipos de timers
// setTimeout() aceita uma função callback como argumento, sem argumentos e o tempo em milissegundos
// a função callback é executada após a pausa
setTimeout(() => console.log('Three seconds passed.'), 3000);

// Atenção: A função não bloqueia a execução. A função é assíncrona

// Se for necessário passar argumentos para o callback, adicione como argumentos adicionais para setTimeout()
setTimeout(
  (one, two) =>
    console.log(
      `Three seconds passed and I got the arguments \"${one}\" and \"${two}\".`
    ),
  3000,
  1,
  2
);

// Para cancelar o timer use a função clearTimeout(), passando o id do timer como argumento
const timer = setTimeout(() => console.log('Boo!'), 5000); // Armazenando o id do timer em uma variável
clearTimeout(timer);

// setInterval() executa a função múltiplas vezes em um intervalo
// aceita dois argumentos: a função callback e o intervalo, opcionalmente argumentos extras serão passados para a função callback
setInterval(() => console.log(new Date()), 3000);
