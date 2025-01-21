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

/**
 * 265. Disparando erros manualmente
 */

/**
 * Fetches data from a url
 * @param {String} url
 * @return {Promise<JSON>} Promise for JSON data
 */
function fetchJSON(url, errorMsg = 'Something went wrong.') {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}: ${errorMsg}`);
    }
  });
}

/**
 * Mostra os dados de um país e o vizinho mais próximo
 * A ordem não é mantida
 * @param {String} country País
 */
function getCountryDataPromise4(country) {
  fetchJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found.'
  )
    .then(([data]) => {
      showCountry(data);

      const neighborCode = data.borders?.[0];
      if (!neighborCode) throw new Error('There is no neighbors.'); // deve dar erro

      // Atenção: não use .then imediatamente no fetch
      // retorne promise e não encadeie .then pra evitar o inferno de callback!
      return fetchJSON(
        `https://restcountries.com/v2/alpha/${neighborCode}`,
        'Neighbor not found.'
      );
    })
    .then(data => showCountry(data, 'neighbour'))
    .catch(err => {
      showError(`Something went wrong. ${err.message} Try again later.`);
    })
    .finally(() => {
      // executa após a promise ser rejeitada ou completada
      countriesContainer.style.opacity = 1;
    });
}

// btn.addEventListener('click', () => getCountryDataPromise4('australia'));

/**
 * 266. Desafio de código #1
 */

/**
 * Faz geocoding reverso.
 * Busca um local pelas coordenadas.
 * @param {String} lat A latitude
 * @param {String} long A longitude
 */
function whereAmI(lat, long) {
  // return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`).then(
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`An error occurred (${response.code}).`);
    }
  });
}

window.addEventListener('keyup', event => {
  if (event.code === 'Space')
    //whereAmI('52.508', '13.381')
    // whereAmI('19.037', '72.873')
    whereAmI('-33.933', '18.474')
      .then(geoData => {
        console.log(geoData);
        getCountryDataPromise4(geoData.countryName);
        console.log(`You are in ${geoData.city}, ${geoData.countryName}`);
      })
      .catch(err => console.log(err));
});

/**
 * 268. O loop de eventos na prática
 */

// console.log('Test start.');

// Timer de zero segundos

// //// Atenção: Não use timeout para eventos de alta precisão
// // Garantido que vai executar pelo menos zero segundos depois, não zero segundos exatos
// setTimeout(() => console.log('Zero second timer.'), 0);

// // Promise vai ser executada primeiro pois tem prioridade
// Promise.resolve('Resolved promise 1').then(value => console.log(value));

// // Promise que demora a executar
// Promise.resolve('Resolved promise 2').then(value => {
//   for (let i = 0; i < 1_000_000; i++) {}
//   console.log(value);
// });

// console.log('Test end.\n\n');

/**
 * 269. Construindo uma Promise
 */

// Construtor de Promise aceita uma função como argumento.
// A função recebe dois argumentos, uma função que marca a promise como aceita, e a outra que marca a promise como rejeitada
// const lottery = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('WIN!'); // marca como fullfilled
//     } else {
//       reject(new Error('You lose!')); // marca como rejected
//     }
//   }, 1500);
// });

// console.log('Lottery draw!');
// lottery.then(won => console.log(won)).catch(lost => console.warn(lost));

// Promisifying é transformar uma função assíncrona em uma promise

// Promisifying setTimeout
function wait(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// espera dois segundos e espera um segundo
// wait(2)
//   .then(() => {
//     console.log('Waited for two seconds.');
//     return wait(1);
//   })
//   .then(() => console.log('Waited for another second.'));

//// Para criar uma Promise já resolvida
// Promise.resolve('ok').then(res => console.info(res));
// Promise.reject(new Error('error')).catch(err => console.error(err));

/**
 * 270. Promisifying a API de geolocalização
 */

// Função pega a localização atual
// Aceita duas funções callback como argumentos: uma em caso de sucesso, outra em caso de erro
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

/**
 * Obtém a posição atual
 * @returns {Promise<GeolocationPosition>} a localização atual
 */
function getCurrentPosition() {
  // cria uma nova promise com o local atual
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // retorna a posição atual
      position => resolve(position),
      // retorna o erro
      error => reject(new Error(error))
    );

    // chama automaticamente
    // navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// getCurrentPosition()
//   .then(position => console.log(position))
//   .catch(err => console.log(err));

/**
 * Faz geocoding reverso da posição atual
 * Busca um local pelas coordenadas atuais
 */
function realWhereAmI() {
  return getCurrentPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
      );
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`An error occurred (${response.code}).`);
      }
    });
}

// btn.addEventListener('click', () => {
//   realWhereAmI()
//     .then(geoData => {
//       getCountryDataPromise4(geoData.countryName);
//       console.log(`You are in ${geoData.city}, ${geoData.countryName}`);
//     })
//     .catch(err => console.error(err));
// });

/**
 * 271. Desafio de código #2
 */

const imageContainer = document.querySelector('.images');

//// 1. Crie uma função que recebe um caminho de imagem e retorna um elemento <img>

/**
 * Cria uma imagem
 * @param {String} imgPath a fonte da imagem
 * @returns {Promise<HTMLImageElement>} um elemento \<img\>
 */
function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const result = document.createElement('img');
    result.src = imgPath;
    result.addEventListener('load', () => resolve(result));
    result.addEventListener('error', ev => reject(new Error(ev.message)));
  });
}

//// 2. Consuma a promise e adicione um tratador de erros
(function () {
  let currentImage;

  createImage('img/img-1.jpg')
    .then(imgEl => {
      currentImage = imgEl;
      imageContainer.insertAdjacentElement('beforeend', imgEl);
    })
    //// 3. Depois que a imagem carregou, espere dois segundos
    .then(() => wait(2))
    //// 4. Esconda a imagem e carregue a segunda depois de dois segundos
    .then(() => {
      currentImage.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    //// 5. Depois que a segunda imagem carregou, pause por dois segundos
    .then(imgEl => {
      currentImage = imgEl;
      imageContainer.insertAdjacentElement('beforeend', imgEl);
    })
    .then(() => wait(2))
    //// 6. Depois que passaram os dois segundos, esconda a imagem
    .then(() => (currentImage.style.display = 'none'))
    //// Teste o erro passando uma imagem inexistente
    .then(() => {
      currentImage.style.display = 'none';
      return createImage('dasjdanfopadjnfpdo'); // erro
    })
    .catch(err => console.error(err));
}); // ();

/**
 * 272. Consumindo promises com async/await
 */
/**
 * Mostra os dados de um país de modo assíncrono
 * @param {String} country O país alvo
 */
async function whereAmIAsync() {
  // Pega local atual
  const pos = await getCurrentPosition();
  const { latitude: lat, longitude: long } = pos.coords;

  // Geocoding reverso
  const geo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
  );
  if (!geo.ok) throw new Error('Something went wrong.');
  const geoData = await geo.json();

  // Pega dados do país
  const result = await fetch(
    `https://restcountries.com/v2/name/${geoData.countryName}`
  );
  console.log(result);
  const data = await result.json();
  showCountry(data[0]);
  countriesContainer.style.opacity = 1;
}

// btn.addEventListener('click', whereAmIAsync);

/**
 * 273. Lidando com erros usando try... catch
 */

// Use try/catch pra pegar erros antes que eles quebrem o programa
// Try/catch também funciona pra async/await
/**
 * Mostra os dados de um país de modo assíncrono
 * @param {String} country O país alvo
 */
async function whereAmIAsync2() {
  try {
    // Pega local atual
    const pos = await getCurrentPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Geocoding reverso
    const geo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
    );
    const geoData = await geo.json();

    // Pega dados do país
    const result = await fetch(
      `https://restcountries.com/v2/name/${geoData.countryName}`
    );
    console.log(result);
    const data = await result.json();
    showCountry(data[0]);
    countriesContainer.style.opacity = 1;
  } catch (err) {
    console.warn(err.message);
  }
}

btn.addEventListener('click', whereAmIAsync2);

/**
 * 274. Retornando valores de funções async
 */

// Funções async retornam promises
// Para usar valores retornados de funções async, use .then()
// No exemplo acima a promise retornada pela função whereAmIAsync2() sempre será fullfilled porque qualquer erro é pego no bloco catch(err) {...}
// Para usar .catch(), lance o erro de novo no bloco catch() {...}

// Instruções await só podem estar dentro de funções async
// então para converter código com .then(), .catch() e .finally() é necessário criar uma função async
// é possível usar async IIFEs para esse propósito

/**
 * 275. Rodando promises em paralelo
 */

async function getCountriesData(...countries) {
  try {
    //// fazendo as chamadas à api em sequência
    // const allData = [];
    // for (let country of countries) {
    //   const countryData = await fetchJSON(
    //     `https://restcountries.com/v2/name/${country}`
    //   );
    //   allData.push(countryData[0]);
    // }
    // console.log(allData.map(c => c.capital));

    // fazendo chamadas à api paralelamente com Promise.all
    // Atenção: Em promise.all, se uma promise falha, todas falham
    const allData = await Promise.all(
      countries.map(country =>
        fetchJSON(`https://restcountries.com/v2/name/${country}`)
      )
    );
    console.log(allData.map(c => c[0].capital));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

getCountriesData('portugal', 'france', 'spain');
