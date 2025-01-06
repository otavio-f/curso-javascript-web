'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * 196. Selecionando, criando e deletando elementos
 */

//// Selecionando elementos ////

// use propriedades do objeto document pra selecionar elementos mais gerais da página

console.log('Document:', document.documentElement); // O documento inteiro

console.log('Head:', document.head); // o cabeçalho <head>

console.log('Body:', document.body); // o corpo <body>

// pra selecionar elementos mais específicos, é possível usar outros métodos

console.log('class="header":', document.querySelector('.header')); // O primeiro elemento com class="header"
console.log('All class="section":', document.querySelectorAll('.section')); // Todos os elementos com class="section"
// Atenção: O argumento deve seguir o mesmo padrão de seleção de elementos em CSS!!
// Atenção: querySelectorAll retorna uma NodeList, que --não-- acompanha as alterações feitas na página

console.log('class="section--1":', document.getElementById('section--1')); // Só retorna um elemento
console.log('All <button>:', document.getElementsByTagName('button')); // Todos os <button> da página
console.log('All class="btn":', document.getElementsByClassName('btn')); // Todos os elementos com class="btn"
// Atenção: getElements... retorna HTMLCollection, que acompanha as alterações feitas na página

//// Criando e adicionando elementos ////

// .insertAdjacentHTML // adiciona um elemento em uma posição relativa a outro
const message = document.createElement('div'); // cria um <div> (ainda não está na página!)
message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
const header = document.querySelector('.header');

header.prepend(message); // adiciona como primeiro elemento filho
// header.apppend(message); // adiciona como último elemento filho
// Atenção: Somente um pode ser usado com o mesmo elemento. Usando mais que um vai mover o elemento, não copiar

// header.append(message.cloneNode(true)); // use .cloneNode(true) pra copiar o elemento
// header.before(message); // adiciona antes do elemento
// header.after(message); // adiciona depois do elemento

//// Deletar elementos ////
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (event) {
    event.preventDefault();
    // message.remove(); // deleta o elemento, maneira nova
    message.parentElement.removeChild(message); // maneira mais antiga, só se pode remover um elemento filho
  });
