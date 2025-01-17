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

showCountryData('argentina');
showCountryData('thailand');
showCountryData('france');
