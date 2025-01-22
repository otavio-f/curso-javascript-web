// Módulo principal
// Importação de módulo

// import './shoppingCart.js'; // também funciona sem a extensão de arquivo
import { addToCart } from './shoppingCart.js'; // pra importar named exports use o mesmo

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
    while (quantity--) cart.push(product);
    console.log(`${quantity} ${product} added to cart.`);
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
