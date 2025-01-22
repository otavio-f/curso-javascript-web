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
