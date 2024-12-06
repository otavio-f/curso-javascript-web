'use strict';

const modal = document.querySelector('.modal');

const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');

// todos botões que abrem o modal
const btnsOpenModal = document.querySelectorAll('.show-modal');

/**
 * Fecha o diálogo modal
 */
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

/**
 * Abre os diálogos modais
 */
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// itera pelos elementos
// for (let i = 0; i < btnsOpenModal.length; i++) {
//   console.log(btnsOpenModal[i].textContent);
// }

// outra maneira mais simples de iterar
// for (let btn of btnsOpenModal) {
//   console.log(btn.textContent);
// }

// ainda outra maneira, desta vez com uma função foreach
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
