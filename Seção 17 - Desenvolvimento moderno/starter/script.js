// Módulo principal
// Importação de módulo

// import './shoppingCart.js'; // também funciona sem a extensão de arquivo
// import { addToCart } from './shoppingCart'; // pra importar named exports use o mesmo

// pra importar __todos__ os exports de um módulo use *
// import * from './shoppingCart';

// import * as ShoppingCart from './shoppingCart.js'; // convenção é renomear tudo
// acima coloca dentro de um namespace ao invés de poluir o contexto global
// nesse caso a extensão é necessária

// é possível misturar default exports e named imports
// import banana, {addToCart, cart} from './shoppingCart.js'; // não é recomendado
console.log('Importing module.');
