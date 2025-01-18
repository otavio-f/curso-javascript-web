'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/**
 * Aula 257
 */

// API URL
// https://countries-api-836d.onrender.com/countries/

/**
 * Aula 258
 */

// APIs públicas em  https://github.com/public-apis/public-apis
// Prefira as que têm CORS

//// Modo antigo

// https://restcountries.com/v2/name/portugal

/**
 * Mostra os dados de um país na tela
 * A ordem não é mantida
 * @param {String} country País
 */
function showCountryData(country) {
  const request = new XMLHttpRequest();

  // Para fazer um request
  request.open(
    'GET',
    `https://restcountries.com/v2/name/${country.toLowerCase()}`
  );
  request.send();

  // Para obter a resposta use o evento 'load'
  request.addEventListener('load', function () {
    // this é o objeto request acima
    // resposta está em .responseText
    const data = JSON.parse(this.responseText)[0];
    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>Pop.</span>${(
      data.population / 1_000_000
    ).toFixed(1)}M</p>
    <p class="country__row"><span>Lang.</span>${data.languages[0].name}</p>
    <p class="country__row"><span>Cur.</span>${data.currencies[0].symbol} - ${
      data.currencies[0].name
    }</p>
  </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
  });
}

// showCountryData('argentina');
// showCountryData('thailand');
// showCountryData('france');

/**
 * 260. Bem vindo ao inferno de callbacks
 */

/**
 * Mostra os dados de um país na janela
 * @param {Object} countryData
 * @param {String} countryClass
 */
function showCountry(data, countryClass = '') {
  const html = `
    <article class="country ${countryClass}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>Pop.</span>${(
        data.population / 1_000_000
      ).toFixed(1)}M</p>
      <p class="country__row"><span>Lang.</span>${data.languages[0].name}</p>
      <p class="country__row"><span>Cur.</span>${data.currencies[0].symbol} - ${
    data.currencies[0].name
  }</p>
    </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}
/**
 * Mostra os dados de um país e o vizinho mais próximo
 * A ordem não é mantida
 * @param {String} country País
 */
function getCountryAndNeighbor(country) {
  const request = new XMLHttpRequest();

  // Para fazer um request
  request.open(
    'GET',
    `https://restcountries.com/v2/name/${country.toLowerCase()}`
  );
  request.send();

  // Para obter a resposta use o evento 'load'
  request.addEventListener('load', function () {
    //// CALLBACK HELL
    // acontece quando múltiplas callbacks assíncronas são aninhadas para executar em sequência
    const data = JSON.parse(this.responseText)[0];
    showCountry(data);

    const neighbor = data.borders?.[0];
    if (!neighbor) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      showCountry(data, 'neighbour');
    });
  });
}

// getCountryAndNeighbor('portugal');

/**
 * 261. Promises e API Fetch
 */

//// Modo atualizado de fazer uma requisição GET
// const request = fetch('https://restcountries.com/v2/name/portugal'); // retorna uma Promise
// console.log(request);

// Promise é um objeto usado para armazenar o resultado de uma operação assíncrona
// Várias promises podem ser encadeadas, o que evita callback hell

/*
 * Promises tem um ciclo de vida:
 * - Pending: significa que o resultado ainda não está disponível;
 * - Fullfilled: a Promise obteve o resultado de modo esperado;
 * - Rejected: Um erro ocorreu e resultado não pôde ser produzido;
 */

// Promises tem que ser produzidas para serem consumidas

/**
 * 262. Consumindo promises
 */

/**
 * Mostra os dados de um país e o vizinho mais próximo
 * A ordem não é mantida
 * @param {String} country País
 */
function getCountryDataPromise(country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`); // retorna uma Promise
  // Promises possuem um método .then() para o caso de a promessa ter sido fullfilled
  // A função callback é executada
  request.then(response => {
    // código de status está em response.status
    // corpo da resposta está em response.json()
    const json = response.json();
    console.log(json);

    // response.json() retorna outra promise, então é necessário usar .then de novo
    json.then(([data]) => {
      showCountry(data);

      const neighborCode = data.borders?.[0];
      if (!neighborCode) return;

      // Um exemplo de como encadear .then()
      fetch(`https://restcountries.com/v2/alpha/${neighborCode}`)
        .then(response => response.json())
        .then(data => showCountry(data));
    });
  });
}

// getCountryDataPromise('portugal');

/**
 * 263. Encadeando promises
 */

/**
 * Mostra os dados de um país e o vizinho mais próximo
 * A ordem não é mantida
 * @param {String} country País
 */
function getCountryDataPromise2(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(([data]) => {
      showCountry(data);

      const neighborCode = data.borders?.[0];
      if (!neighborCode) return; // deve dar erro

      // Atenção: não use .then imediatamente no fetch
      // retorne promise e não encadeie .then pra evitar o inferno de callback!
      return fetch(`https://restcountries.com/v2/alpha/${neighborCode}`);
    })
    .then(response => response.json())
    .then(data => showCountry(data, 'neighbour'));
}

//// Atenção: .then() sempre retorna uma Promise!

// getCountryDataPromise2('portugal');

/**
 * 264. Lidando com promises rejeitadas
 */

// Uma promise na qual ocorreu um erro é uma promise rejected

/**
 * Mostra uma mensagem de erro
 * @param {String} msg
 */
function showError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

/**
 * Mostra os dados de um país e o vizinho mais próximo
 * A ordem não é mantida
 * @param {String} country País
 */
function getCountryDataPromise3(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => response.json()
      // err => alert(err) // use o segundo argumento para tratar o erro em uma promise
    )
    .then(([data]) => {
      showCountry(data);

      const neighborCode = data.borders?.[0];
      if (!neighborCode) return; // deve dar erro

      // Atenção: não use .then imediatamente no fetch
      // retorne promise e não encadeie .then pra evitar o inferno de callback!
      return fetch(`https://restcountries.com/v2/alpha/${neighborCode}`);
    })
    .then(response => response.json())
    .then(data => showCountry(data, 'neighbour'))
    .catch(err => {
      // use catch para pegar qualquer erro (rejected promise)
      console.error(err);
      showError(`Something went wrong. ${err.message} Try again later.`);
    })
    .finally(() => {
      // executa após a promise ser rejeitada ou completada
      countriesContainer.style.opacity = 1;
      console.log('Ended!');
    });
}

btn.addEventListener('click', () => getCountryDataPromise3('portugal'));
