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

// header.prepend(message); // adiciona como primeiro elemento filho
header.append(message); // adiciona como último elemento filho
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

/**
 * 197. Estilos, atributos e classes
 */

//// Estilos ////
// Para configurar o estilo de um elemento, use a propriedade .style seguida pelo atributo

// Atenção: Troque o separador-dash por camelCase no atributo CSS
// Atenção: Não esqueça da unidade de medida
// Atenção: O estilo adicionado via Javascript se comporta como estilo inline, tendo prioridade sobre arquivos CSS

message.style.backgroundColor = '#37383d'; // (background-color -> backgroundColor)
message.style.width = '120%'; // sempre adicione a unidade de medida

// Atenção: Leitura do .style só funciona para propriedades que foram configuradas via Javascript
console.log(message.style.height); // retorna string vazia porque não foi configurado via js
console.log(message.style.backgroundColor); // retorna a cor que foi configurada mais acima

// Para obter a folha de estilos final, use o método getComputedStyle(), passando o elemento como argumento
console.log(getComputedStyle(message)); // retorna o estilo do elemento como está sendo mostrado na tela

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// Para mudar variáveis CSS, use o método setProperty(), passando o nome da variável e o valor como argumentos
document.documentElement.style.setProperty('--color-primary', 'cadetblue');

//// Atributos ////

// os atributos dos elementos estão disponíveis como propriedades
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // lendo atributo alt=""
logo.alt = 'Minimalist logo.'; // atribuindo atributo alt=""
console.log(logo.src); // atributo src="", caminho absoluto da imagem
console.log(logo.className); // atributo class="". Não é logo.class por compatibilidade

// Atenção: Atributos que não fazem parte dos atributos padrão retornam undefined, mesmo se tiverem sido configurados no html!
//          Setar atributos não-padrão também não funciona.

// Para ler atributos fora do padrão ou do mesmo modo como foram definidos no html, use .getAttribute(), passando o nome do atributo como argumento
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('src')); // caminho relativo, diferente de logo.src

// Para atribuir atributos fora do padrão, use .setAttribute() com o nome do atributo e o valor como argumentos
logo.setAttribute('company', 'bankist');

// Existem atributos especiais que começam com 'data-'.
// Esses atributos estão disponíveis na propriedade .dataset
console.log(logo.dataset.versionNumber); // lembre de trocar separador-dash por camelCase!

//// Classes ////
logo.classList.add('sample-class'); // adiciona classe a lista de classes. Pode adicionar múltiplas
logo.classList.remove('sample-class'); // remove classe da lista de classes. Pode adicionar múltiplas e se a classe não estiver presente, não faz nada
logo.classList.toggle('sample-class'); // adiciona se não existir ou remove se existir
logo.classList.contains('sample-class'); // verifica se contém uma classe

// Também é possível alterar classe pelo atributo .className, porém não é recomendado
// .className vai substituir todas as classes!
// logo.className = 'sample-class';

/**
 * 198. Implementando rolagem suave
 */

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (event) {
  const coords = section1.getBoundingClientRect(); // pega coordenadas do elemento
  console.log(coords);
  console.log(event.target.getBoundingClientRect()); // event.target é o elemento que disparou o evento
  // console.log(`Current scroll position: ${window.pageXOffset}, ${window.pageYOffset}`); // window.pageXOffset é obsoleto
  console.log(`Current scroll position: ${window.scrollX}, ${window.scrollY}`);
  console.log(
    `Viewport size: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`
  );

  // Role para a primeira seção
  // .top armazena a posição relativa ao viewport, tem que adicionar a posição de rolagem da página pra descobrir a posição absoluta de um elemento relativo ao topo da página
  // window.scrollTo(coords.left + window.scrollX, coords.top + window.scrollY); // suave igual um porco-espinho descarregando um caminhão de brita

  // Para rolagem suave, passe como argumento um objeto com propriedades left, top e behavior
  // window.scrollTo({
  //   left: coords.left + window.scrollX,
  //   top: coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Versão mais moderna (Praticamente aceita em tudo exceto IE)
  section1.scrollIntoView({ behavior: 'smooth' }); // Pronto! Só precisa dessa linha
});
