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
    countriesContainer.style.opacity = 1;
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
  countriesContainer.style.opacity = 1;
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

getCountryAndNeighbor('portugal');
