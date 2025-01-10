'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('section');

const slides = document.querySelectorAll('.slide');
const btnLeftSlide = document.querySelector('.slider__btn--left');
const btnRightSlide = document.querySelector('.slider__btn--right');
const dots = document.querySelector('.dots');

//=============================================================================
//-| Modal window |----------------------------------------------------
//=============================================================================

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

// Cookies popup
const cookieMessage = document.createElement('div'); // cria um <div> (ainda não está na página!)
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

// header.prepend(message); // adiciona como primeiro elemento filho
header.append(cookieMessage); // adiciona como último elemento filho

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (event) {
    event.preventDefault();
    // message.remove(); // deleta o elemento, maneira nova
    cookieMessage.parentElement.removeChild(cookieMessage); // maneira mais antiga, só se pode remover um elemento filho
  });

//=============================================================================
//-| Navegação de página |-----------------------------------------------------
//=============================================================================

/**
 * 198. Implementando rolagem suave
 */

btnScrollTo.addEventListener('click', function (event) {
  // const coords = section1.getBoundingClientRect(); // pega coordenadas do elemento
  // console.log(coords);
  // console.log(event.target.getBoundingClientRect()); // event.target é o elemento que disparou o evento
  // console.log(`Current scroll position: ${window.pageXOffset}, ${window.pageYOffset}`); // window.pageXOffset é obsoleto
  // console.log(`Current scroll position: ${window.scrollX}, ${window.scrollY}`);
  // console.log(
  //   `Viewport size: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`
  // );

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

/**
 * 202. Delegação de eventos
 */
// Navegação de pelos links do topo da página

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (event) {
//     // Âncoras são um tipo especial de href (atributo do elemento <a>) que apontam para um outro elemento da página
//     // por exemplo, o primeiro link possui href="#section--1", então quando for clicado ele vai redirecionar para o elemento que possui esse id

//     event.preventDefault(); // impede navegação por âncora

//     const anchor = this.getAttribute('href'); // pega o atributo como está no html
//     // this.href retornaria a url absoluta
//     document.querySelector(anchor).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Problema: é muito ineficiente pq cria uma função para cada elemento (pode impactar negativamente a performance)
// Solução: Delegar os eventos de clique para um elemento pai comum

// Adicionando evento a um elemento comum
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    // escolhendo links baseado nas classes
    if (!event.target.classList.contains('nav__link')) {
      return; // saída adiantada
    }

    event.preventDefault();
    const anchor = event.target.getAttribute('href');
    if (anchor === '#') {
      return; // saída adiantada
    }

    const target = document.querySelector(anchor);
    target.scrollIntoView({ behavior: 'smooth' });
  });

/**
 * 204. Construindo um componente tabulado
 */

tabsContainer.addEventListener('click', function (event) {
  const clickedTab = event.target.closest('.operations__tab'); // seleciona aba
  console.log(clickedTab);
  if (!clickedTab) {
    // condição de guarda
    // se não foi clicado em uma aba, ignore o clique
    return;
  }

  tabs.forEach(t => t.classList.remove('operations__tab--active')); // desative todas abas
  clickedTab.classList.add('operations__tab--active'); // ative a aba clicada

  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  ); // esconda o conteúdo de todas as abas
  const content = document.querySelector(
    `.operations__content--${clickedTab.dataset.tab}`
  ); // seleciona o conteúdo da aba clicada
  content.classList.add('operations__content--active'); // mostre o conteúdo da aba clicada
});

/**
 * 205. Passando argumentos para tratadores de eventos
 */

/**
 * Muda a opacidade dos links do topo da página
 * @param {HTMLElement} targetLink o elemento sendo focado
 * @param {Number} outOfFocusOpacity a opacidade dos elementos irmãos
 * @returns
 */
function changeLinksOpacity(targetLink, outOfFocusOpacity) {
  if (!targetLink.classList.contains('nav__link')) {
    // não clicou em um link
    return;
  }
  const parent = targetLink.closest('.nav');
  const siblings = parent.querySelectorAll('.nav__link');
  const logo = parent.querySelector('img');

  siblings.forEach(element => {
    if (element !== targetLink) {
      element.style.opacity = outOfFocusOpacity;
      logo.style.opacity = outOfFocusOpacity;
    }
  });
}

nav.addEventListener('mouseover', e => changeLinksOpacity(e.target, 0.5));
nav.addEventListener('mouseout', e => changeLinksOpacity(e.target, 1));

/**
 * 206. Implementando uma barra de navegação "sticky"
 */

//// versão 1: usando o evento "scroll"
// const scrollPos = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // evento 'scroll' só está disponível em window.
//   // Atenção: Evite usar esse evento por questão de performance
//   // console.log(window.scrollY, scrollPos);
//   if (window.scrollY > scrollPos.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

/**
 * 207. Uma maneira melhor: API de observação de intersecção
 */
// function obsCallback(entries, observer) {
//   entries.forEach(ent => console.log(ent));
// }

// const obsOptions = {
//   root: null, // A janela inteira
//   threshold: [0, 0.2], //quando não estiver visível e quando estiver visível 20%
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

function stickyNav(entries) {
  // const [entry] = entries;
  const entry = entries[0];
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
}

const stickyNavOptions = {
  root: null, // a janela toda
  threshold: 0, // toda vez que a visibilidade for 0, ou seja sair ou entrar na tela
  rootMargin: `-${nav.getBoundingClientRect().height}px`, // quando a barra couber entre o topo da tela e a segunda seção
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);

/**
 * 208. Revelando elementos na rolagem
 */

// Não vou modificar o html
// Adicionando a classe "section--hidden" nas seções

function revealSection(entries, observer) {
  // const [entry] = entries;
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const section = entry.target; // use entry.target para selecionar o elemento que está sendo observado
    section.classList.remove('section--hidden'); // torne a seção visível
    observer.unobserve(section); // deixe de observar a seção visível (ajuda na performance)
  });
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/**
 * 210. Imagens lazy loading
 */

// Especifica dois atributos na tag <img>: src e data-src
// src é uma versão de baixa resolução
// a imagem normalmente seria pixelada pela baixa resolução, uma classe aplica um filtro blur
// data-src corresponde ao atributo dataset.src que vai ser carregado aqui
// Ajuda bastante na performance!

// seleciona tags img que contém o atributo 'data-src'
const lazyImages = document.querySelectorAll('img[data-src]');

function loadImage(entries, observer) {
  // const [entry] = entries;
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  const target = entry.target;
  // substitui src por data-src
  target.src = target.dataset.src;
  // remove filtro
  // img solta um evento 'load' quando carrega a imagem totalmente
  target.addEventListener('load', () => target.classList.remove('lazy-img'));
  observer.unobserve(target);
}

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(img => imageObserver.observe(img));

/**
 * 211 e 212. Construindo um componente deslizante
 */

// Cada slide está ao lado do outro
// Quando a seta é clicada, o atributo CSS "translateX" muda para o próximo/anterior ser centralizado e os outros moverem de acordo
// O atributo CSS "overflow" é alterado para "hidden" para esconder os slides não centralizados

// IIFE cria componente deslizante
(function () {
  let currentSlide = 0; // índice do slide atual

  /**
   * Move os slides da parte de baixo da página e configura os botões prox/anterior de necessário
   * @param {Number} current O slide atual
   */
  function moveSlides(current) {
    makeDots(-current);
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index + current)}%)`)
    );

    // se estiver no primeiro slide esconda o botão anterior
    btnLeftSlide.style.display = current === 0 ? 'none' : '';

    // se estiver no último slide esconda o botão próximo
    btnRightSlide.style.display =
      current === -(slides.length - 1) ? 'none' : '';
  }

  /**
   * Cria o indicador de página
   * @param {Number} activeDot O índice do indicador ativo
   */
  function makeDots(activeDot) {
    dots.innerHTML = '';
    slides.forEach((_, index) => {
      const activeClass = activeDot === index ? ' dots__dot--active' : '';
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot${activeClass}" data-slide="${index}"></button>`
      );
    });
  }

  // clique slide anterior
  btnLeftSlide.addEventListener('click', function () {
    currentSlide++;
    moveSlides(currentSlide);
  });

  // clique próximo slide
  btnRightSlide.addEventListener('click', function () {
    currentSlide--;
    moveSlides(currentSlide);
  });

  //// Navegação com setas do teclado
  document.addEventListener('keydown', function (e) {
    // if (e.key === 'ArrowLeft' && currentSlide < 0) btnLeftSlide.click();
    e.key === 'ArrowLeft' && currentSlide < 0 && btnLeftSlide.click(); // move para a esquerda

    // if (e.key === 'ArrowRight' && currentSlide > -(slides.length - 1)) btnRightSlide.click();
    e.key === 'ArrowRight' &&
      currentSlide > -(slides.length - 1) &&
      btnRightSlide.click(); // move para a direita
  });

  dots.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    currentSlide = -e.target.dataset.slide; // implicitamente converte pra número
    moveSlides(currentSlide);
  });

  // move slides para as posições iniciais
  moveSlides(0);
})();
//=============================================================================
//-| Experimentos e aulas |----------------------------------------------------
//=============================================================================

/**
 * 196. Selecionando, criando e deletando elementos
 */

//// Selecionando elementos ////

// use propriedades do objeto document pra selecionar elementos mais gerais da página

// console.log('Document:', document.documentElement); // O documento inteiro

// console.log('Head:', document.head); // o cabeçalho <head>

// console.log('Body:', document.body); // o corpo <body>

// pra selecionar elementos mais específicos, é possível usar outros métodos

// console.log('class="header":', document.querySelector('.header')); // O primeiro elemento com class="header"
// console.log('All class="section":', document.querySelectorAll('.section')); // Todos os elementos com class="section"
// Atenção: O argumento deve seguir o mesmo padrão de seleção de elementos em CSS!!
// Atenção: querySelectorAll retorna uma NodeList, que --não-- acompanha as alterações feitas na página

// console.log('class="section--1":', document.getElementById('section--1')); // Só retorna um elemento
// console.log('All <button>:', document.getElementsByTagName('button')); // Todos os <button> da página
// console.log('All class="btn":', document.getElementsByClassName('btn')); // Todos os elementos com class="btn"
// Atenção: getElements... retorna HTMLCollection, que acompanha as alterações feitas na página

//// Criando e adicionando elementos ////

// .insertAdjacentHTML // adiciona um elemento em uma posição relativa a outro
// const message = document.createElement('div'); // cria um <div> (ainda não está na página!)
// message.classList.add('cookie-message');
// message.textContent =
// 'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// const header = document.querySelector('.header');

// header.prepend(message); // adiciona como primeiro elemento filho
// header.append(message); // adiciona como último elemento filho
// Atenção: Somente um pode ser usado com o mesmo elemento. Usando mais que um vai mover o elemento, não copiar

// header.append(message.cloneNode(true)); // use .cloneNode(true) pra copiar o elemento
// header.before(message); // adiciona antes do elemento
// header.after(message); // adiciona depois do elemento

//// Deletar elementos ////
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function (event) {
//     event.preventDefault();
//     // message.remove(); // deleta o elemento, maneira nova
//     message.parentElement.removeChild(message); // maneira mais antiga, só se pode remover um elemento filho
//   });

/**
 * 197. Estilos, atributos e classes
 */

//// Estilos ////
// Para configurar o estilo de um elemento, use a propriedade .style seguida pelo atributo

// Atenção: Troque o separador-dash por camelCase no atributo CSS
// Atenção: Não esqueça da unidade de medida
// Atenção: O estilo adicionado via Javascript se comporta como estilo inline, tendo prioridade sobre arquivos CSS

// message.style.backgroundColor = '#37383d'; // (background-color -> backgroundColor)
// message.style.width = '120%'; // sempre adicione a unidade de medida

// Atenção: Leitura do .style só funciona para propriedades que foram configuradas via Javascript
// console.log(message.style.height); // retorna string vazia porque não foi configurado via js
// console.log(message.style.backgroundColor); // retorna a cor que foi configurada mais acima

// Para obter a folha de estilos final, use o método getComputedStyle(), passando o elemento como argumento
// console.log(getComputedStyle(message)); // retorna o estilo do elemento como está sendo mostrado na tela

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// Para mudar variáveis CSS, use o método setProperty(), passando o nome da variável e o valor como argumentos
// document.documentElement.style.setProperty('--color-primary', 'cadetblue');

//// Atributos ////

// os atributos dos elementos estão disponíveis como propriedades
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // lendo atributo alt=""
// logo.alt = 'Minimalist logo.'; // atribuindo atributo alt=""
// console.log(logo.src); // atributo src="", caminho absoluto da imagem
// console.log(logo.className); // atributo class="". Não é logo.class por compatibilidade

// Atenção: Atributos que não fazem parte dos atributos padrão retornam undefined, mesmo se tiverem sido configurados no html!
//          Setar atributos não-padrão também não funciona.

// Para ler atributos fora do padrão ou do mesmo modo como foram definidos no html, use .getAttribute(), passando o nome do atributo como argumento
// console.log(logo.getAttribute('designer'));
// console.log(logo.getAttribute('src')); // caminho relativo, diferente de logo.src

// Para atribuir atributos fora do padrão, use .setAttribute() com o nome do atributo e o valor como argumentos
// logo.setAttribute('company', 'bankist');

// Existem atributos especiais que começam com 'data-'.
// Esses atributos estão disponíveis na propriedade .dataset
// console.log(logo.dataset.versionNumber); // lembre de trocar separador-dash por camelCase!

//// Classes ////
// logo.classList.add('sample-class'); // adiciona classe a lista de classes. Pode adicionar múltiplas
// logo.classList.remove('sample-class'); // remove classe da lista de classes. Pode adicionar múltiplas e se a classe não estiver presente, não faz nada
// logo.classList.toggle('sample-class'); // adiciona se não existir ou remove se existir
// logo.classList.contains('sample-class'); // verifica se contém uma classe

// Também é possível alterar classe pelo atributo .className, porém não é recomendado
// .className vai substituir todas as classes!
// logo.className = 'sample-class';

/**
 * 199. Tipos de eventos e handlers
 */

// Evento é um sinal emitido por um nó DOM

// const h1 = document.querySelector('h1');

// Maneira tradicional de reagir a um evento
// h1.addEventListener('mouseenter', function (event) {
//   console.log('Mouse In! Mouse In!');
// });

// Outro modo de adicionar uma função a um evento é usar a propriedade .on... do elemento
// h1.onmouseenter = function (event) { // não use isso! somente para referência!
//   console.log('Mouse In! Mouse In!');
// };

// Uma terceira maneira é adicionar o evento no html, através do atributo on...
// Mas não é recomendado usar essa maneira
// <h1 onmouseenter="alert('Mouse In!')">...</h1>

// .addEventListener permite múltiplas funções reagindo a um único evento
// também é possível remover a função, basta chamar .removeEventListener, passando os mesmos argumentos usados para adicionar
// function alertOnMouse(event) {
//   alert("Oh no! There's mice!");
//   h1.removeEventListener('mouseenter', alertOnMouse);
// }

// h1.addEventListener('mouseenter', alertOnMouse); // vai funcionar somente uma vez

/**
 * 201. Propagação de evento na prática
 */

// gerador de cor aleatória

/**
 * Cria um número aleatório em um intervalo
 * @param {Number} min O valor mínimo
 * @param {Number} max O valor máximo
 * @returns Um número entre o valor mínimo e máximo, incluindo os dois
 */
// function randInt(min, max) {
//   return min + Math.floor(Math.random() * (max - min + 1));
// }

/**
 * Gera uma cor rgb aleatória
 * @returns Uma cor no formato rgb
 */
// function randomColor() {
//   const randColor = () => randInt(0, 255);
//   return `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
// }

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     // espera por clique no primeiro link do topo da página
//     this.style.backgroundColor = randomColor();
//     // event.target é o elemento onde se originou o evento
//     // this é esse elemento
//     // event.currentTarget é o elemento atrelado ao evento
//     console.log(event.target === this);
//     console.log(event.currentTarget === this);
//     console.log(this);
//     console.log(event.target);
//     console.log(event.currentTarget);

//     // Pra parar a propagação do evento use o método a seguir
//     // event.stopPropagation();
//   });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (event) {
//     // espera por clique na área de links (a área com os links rápidos)
//     this.style.backgroundColor = randomColor();
//     console.log(event.target === this);
//     console.log(event.currentTarget === this);
//     console.log(this);
//     console.log(event.target);
//     console.log(event.currentTarget);
//   });

// Para esperar por eventos na fase de captura, mude o terceiro argumento de .addEventListener para true
// Quando false, os eventos são tratados na fase de borbulha (bubbling)
// Quando true, os eventos são tratados na fase de captura
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (event) {
//     // espera por clique na área de navegação (a área com o logo e os links)
//     this.style.backgroundColor = randomColor();
//     console.log(event.target === this);
//     console.log(event.currentTarget === this);
//     console.log(this);
//     console.log(event.target);
//     console.log(event.currentTarget);
//   },
//   true // quando true, o evento é capturado nos elementos pais primeiro
// );

// Observação: Parece que event.currentTarget === this, segundo https://stackoverflow.com/questions/5125926/javascript-event-currenttarget-vs-this

/**
 * 203. DOM Traversing
 */

// Selecionar elementos baseados em outros elementos, ou selecionar elementos desconhecidos

// const h1 = document.querySelector('h1');

//// Indo pra baixo, selecionando elementos filhos

// console.log(h1.querySelectorAll('.highlight')); // .querySelector(All) pode ser usado em qualquer elemento
// quando usado em um elemento, .querySelector(All) só busca nos nós filhos do elemento

// console.log(h1.childNodes); // retorna todos os nós filhos desse elemento, incluindo textos e comentários
// console.log(h1.children); // retorna somente os elementos HTML filhos diretos desse elemento

// firstElementChild/lastElementChild retorna o primeiro/último elemento filho
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

//// Indo para cima, selecionando elemento pai
// console.log(h1.parentNode); // retorna o nó pai
// console.log(h1.parentElement); // retorna o elemento HTML pai

// console.log(h1.closest('.header')); // retorna o elemento mais próximo que obedece à query, como .querySelector()
// Atenção: pode .closest() vai retornar o próprio elemento se ele atender à query!
// Atenção: .closest() só percorre a árvore DOM para cima (filho -> pai), ao contrário de .querySelector() (pai->filho)

//// Indo de lado igual caranguejo, selecionando elementos irmãos

// Só é possível acessar o elemento irmão mais próximo
// console.log(h1.previousSibling); // pode ser qualquer coisa, incluindo texto, elemento HTML ou comentário
// console.log(h1.nextSibling); // pode ser qualquer coisa, incluindo texto, elemento HTML ou comentário
// console.log(h1.previousElementSibling); // que nomão
// console.log(h1.nextElementSibling); // que nomão

// Para selecionar todos elementos irmãos, é necessário "andar" para o elemento pai e selecionar todos os elementos filhos

// console.log([...h1.parentElement.children].filter(element => element !== h1));

/**
 * 213. Eventos do ciclo de vida do DOM
 */

//// DOMContentLoaded: Disparado quando o html e javascript foram baixados e a árvore DOM foi construída
// Atenção: Não leva em conta imagens e outras mídias!
// Use quando houver código que depende da DOM para ser executado, quando o script for carregado no head, etc.
document.addEventListener('DOMContentLoaded', e =>
  console.log('HTML parsed and DOMTree built!', e)
);
// Nesse caso não é necessário, pois a tag <script> é a última tag do <body>
//     ou seja, o script só vai ser executado depois do html ser carregado

//// load: Disparado pela janela quando a página foi carregada completamente
// Inclui tudo que estiver no html
window.addEventListener('load', e => console.log('Page fully loaded', e));

//// beforeunload: Disparado pela janela antes da página ser fechada
// Atenção: Não abuse desse evento, pois pode ser bem intrusivo e irritante para o usuário!
let confirm = false;
window.addEventListener('beforeunload', function (e) {
  if (!confirm) {
    e.preventDefault(); // impede janela de fechar e mostra confirmação de saída
    confirm = true;
    e.returnValue = ''; // mostra confirmação de saída
  }
  console.log(e);
});
