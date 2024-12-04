'use strict';

const modal = document.querySelector('.modal');

const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');

// todos botões que abrem o modal
const btnsOpenModal = document.querySelectorAll('.show-modal');

console.log(btnsOpenModal); // nodelist que contém os botões

// itera pelos elementos
for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
}

// outra maneira mais simples de iterar, porém menos flexível
for (let btn of btnsOpenModal) {
  console.log(btn.textContent);
}
