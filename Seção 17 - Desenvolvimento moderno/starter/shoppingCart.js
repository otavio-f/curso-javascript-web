// Use camelCase para nomear módulos auxiliares
// Exportação de módulo

// Todo código é executado antes do módulo principal
console.log('Exporting module.');

// variáveis tem escopo local
// não são visíveis externamente
const shippingCost = 0;
const cart = [];

//// Named export: declare com a palavra chave export
// Para importar use o mesmo nome declarado entre colchetes
// import { addToCart } from "./shoppingCart"; // não esqueça das chaves!!!

// pra importar mais de um named export use vírgula
// import { addToCart, getTotalCost } from "./shoppingCart"; // desse jeito
/**
 * Adiciona um produto ao carrinho
 * @param {*} product
 * @param {*} quantity
 */
export function addToCart(product, quantity) {
  while (quantity--) {
    cart.push(product);
  }
}

// pra exportar depois de declarar use essa sintaxe
// é possível mudar o nome tanto no export quanto no import com palavra chave as
export { shippingCost as sc, cart }; // não esqueça das chaves!!!

//// Default exports usam a palavra chave "export default" seguido do que se deseja exportar
// não é necessário usar o mesmo nome no import, porém só se pode ter um único default export
export default addToCart; // só um

// import banana from './shoppingCart'; // tanto faz o nome usado no import
