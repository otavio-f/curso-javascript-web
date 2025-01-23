// Módulo principal
// Importação de módulo

// import './shoppingCart.js'; // também funciona sem a extensão de arquivo
import { addToCart as atc, cart as ct } from './shoppingCart.js'; // pra importar named exports use o mesmo

atc('pasta', 9);
console.log(ct);

// pra importar __todos__ os exports de um módulo use *
// import * from './shoppingCart';

// import * as ShoppingCart from './shoppingCart.js'; // convenção é renomear tudo
// acima coloca dentro de um namespace ao invés de poluir o contexto global
// nesse caso a extensão é necessária

// é possível misturar default exports e named imports
// import banana, {addToCart, cart} from './shoppingCart.js'; // não é recomendado
console.log('Importing module.');

/**
 * 283. Await top-level
 */

// ES2022
// Top-level await só funciona em módulos
// Atenção: Await bloqueia a execução, transformando código assíncrono em código sequencial
// const response = await fetch('https://jsonplaceholder.typicode.com/users'); // não vai rodar em paralelo!
// const data = await response.json(); // não vai rodar em paralelo!
// console.log(data);

// Exemplo: ùltimo usuário
/**
 * Obtém o último usuário
 * @returns O último usuário da lista
 */
async function getLastUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return {
    id: data.at(-1).id,
    name: data.at(-1).name,
    username: data.at(-1).username,
  };
}

// obtendo o último usuário com .then()
// const lastUser = getLastUser();
// console.log(lastUser); // promise com último usuário
// lastUser.then(last => console.dir(last)); // não é nada elegante

// obtendo o último usuário com top-level await
// normalmente código iria dentro de um IIFE, mas aqui é permitido
// const lastUser = await getLastUser();
// console.log(lastUser);

// Atenção: se algum módulo tiver top-level await, só será importado após todo o código rodar!
// e o código do módulo principal só irá rodar depois que todo o código de todos os imports rodar!

/**
 * 284. O padrão módulo
 */

// Padrão usado antes de módulos nativos em javascript

// IIFE contém toda a funcionalidade de um módulo
// Só será executado uma vez e vai exportar a funcionalidade
const ShoppingCart2 = (function () {
  // variáveis e funções declaradas aqui são "privadas"
  // não podem ser acessadas pelo ambiente externo a não ser que sejam retornadas
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  /**
   * Adiciona itens ao carrinho
   * @param {*} product Produto a ser adicionado
   * @param {*} quantity Quantidade do produto
   */
  function addToCart(product, quantity) {
    console.log(`${quantity} ${product} added to cart.`);
    while (quantity--) cart.push(product);
  }

  /**
   * Adiciona itens ao estoque
   * @param {*} product Produto a ser adicionado
   * @param {*} quantity Quantidade do produto
   */
  function orderStock(product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier.`);
  }

  // retorna a funcionalidade que queremos que seja vista
  // funciona por causa de closure
  return {
    addToCart,
    /**
     * Retorna o carrinho
     * @returns {[any]} uma cópia dos itens do carrinho
     */
    get cartItems() {
      return [...cart];
    },
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 2);
ShoppingCart2.addToCart('frozen pizza', 8);

console.log(ShoppingCart2);

/**
 * 285. Módulos CommonJS
 */

// Sistema de módulos usado em Node, incompatível com Javascript do browser

// Para exportar funcionalidade, adicione propriedade ao objeto exports
// /**
//  * Adiciona itens ao carrinho
//  * @param {*} product Produto a ser adicionado
//  * @param {*} quantity Quantidade do produto
//  */
// export.addToCart = function (product, quantity) {
//   while (quantity--) cart.push(product);
//   console.log(`${quantity} ${product} added to cart.`);
// };

// Para importar funcionalidade, use o método require()
// const { addToCart } = require('./shoppingCart.js');

/**
 * 286. Introdução à linha de comando
 */

/**
 * 287. Introdução ao NPM
 */

// "npm -v" mostra a versão

// "npm init" inicializa um novo projeto na pasta atual

// "npm install leaflet" ou "npm i leaflet" instala o pacote leaflet no projeto atual
// para instalar uma versão específica use @, "npm i leaflet@1.9.4"
// pacotes são instalados na pasta ./node_modules
// o nome do pacote é adicionado ao campo "dependencies" no arquivo package.json

// "npm install" ou "npm i" (sem nome de pacote) instala todas as dependências contidas no "package.json"

// lodash é uma biblioteca que contém métodos úteis
// para instalar a versão com módulos use "npm install lodash-es"

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'beans', quantity: 1 },
    { product: 'rice', quantity: 3 },
    { product: 'pasta', quantity: 2 },
    { product: 'bread', quantity: 3 },
  ],
  user: { logged: true },
};

// cria uma cópia, mas não verdadeiramente uma cópia
const stateClone = Object.assign({}, state);

// modificar o objeto original afeta essa cópia
console.log(stateClone);

// cria uma cópia verdadeira
const stateDeepClone = cloneDeep(state);

// modificações no original não causará mudanças nessa cópia e vice-versa
console.log(stateDeepClone);

/**
 * 288. Bundle com Parcel e scripts NPM
 */

// Parcel porque é mais fácil, já vem pronto pra usar
// Babel também é uma opção, mais é bem mais complicado de usar (Usado em React)

// pra instalar use o comando
// "npm i parcel --save-dev"

// --save-dev configura como dependência dev, que significa que o módulo não vai ser incluído no bundle final, mas é necessário
// adiciona dependências na chave "devDependencies" ao invés de "dependencies"

// pra rodar parcel use npx
// "npx parcel index.html"
// parcel vai criar bundle na pasta "./dist" e abrir um servidor local, como live-server

// hot module replacement
// quando houver alguma modificação, o novo código será injetado na página sem recarregar a página toda
// use pra não mudar o estado da página quando salvar
if (module.hot) {
  module.hot.accept();
}

// caminhos de biblioteca
// todos os bundlers suportam incluir somente o nome da biblioteca, sem o caminho completo

// Exemplo: cloneDeep da importação mais acima
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// import cloneDeep from 'lodash-es';
// parcel e babel vão achar o caminho completo somente pelo nome da biblioteca
// também conseguem carregar bibliotecas commonjs ou es6

// É possível automatizar o comando para rodar o parcel
// basta adicionar comandos (sem o npx) na chave "scripts" no arquivo ./package.json
// use "npm run <nome do comando>" para rodar o comando
