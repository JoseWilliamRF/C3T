const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');
const icon = mobileBtn.querySelector('.fa-solid');
const carrosseisArea = document.querySelectorAll('.carrossel');

// --- Lógica de Expansão dos Cards de Projeto ---

// --- Lógica do Slideshow Automático ---
const slideInterval = 4000;
const projectCards = document.querySelectorAll('#project-grid .project-card');

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-x');
});

// JS PARA BOTÕES PAGINA CARROSEL

carrosseisArea.forEach(carrossel => {
  const containerPai = carrossel.parentElement;
  if (!containerPai) {
    console.error('Contêiner pai não encontrado para o carrossel:', carrossel);
    return;
  }

  const botaoAnterior = document.createElement('button');
  const botaoProximo = document.createElement('button');

  botaoAnterior.classList.add('btn-carousel', 'btn-prev');
  botaoProximo.classList.add('btn-carousel', 'btn-next');

  botaoAnterior.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  botaoProximo.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

  function atualizacaoStatusBotao() {
    const scrollLeft = carrossel.scrollLeft;
    const scrollWidth = carrossel.scrollWidth;
    const offsetWidth = carrossel.offsetWidth;
    const tolerancia = 10;
    if (scrollLeft <= tolerancia) {
      botaoAnterior.classList.add('disabled');
      botaoAnterior.disabled = true;
    } else {
      botaoAnterior.classList.remove('disabled');
      botaoAnterior.disabled = false;
    }

    if (scrollLeft + offsetWidth >= scrollWidth - tolerancia) {
      botaoProximo.classList.add('disabled');
      botaoProximo.disabled = true;
    } else {
      botaoProximo.classList.remove('disabled');
      botaoProximo.disabled = false;
    }
  }

  setTimeout(atualizacaoStatusBotao, 100);
  carrossel.addEventListener('scroll', atualizacaoStatusBotao);

  containerPai.appendChild(botaoAnterior);
  containerPai.appendChild(botaoProximo);

  botaoProximo.addEventListener('click', () => {
    const larguraVisivel = carrossel.offsetWidth;
    carrossel.scrollLeft += larguraVisivel * 0.8;
  });

  botaoAnterior.addEventListener('click', () => {
    const larguraVisivel = carrossel.offsetWidth;
    carrossel.scrollLeft -= larguraVisivel * 0.8;
  });
});

// --- Lógica de Expansão dos Cards de Projeto ---
// detailButtons.forEach(button => {
//   button.addEventListener('click', event => {
//     const card = event.target.closest('.project-card');
//     if (card) {
//       card.classList.toggle('expanded');

//       if (card.classList.contains('expanded')) {
//         detailButtons.forEach(otherButton => {
//           const otherCard = otherButton.closest('.project-card');
//           if (otherCard && otherCard !== card) {
//             otherCard.classList.remove('expanded');
//           }
//         });
//       }
//     } else {
//       console.error('Não foi possível encontrar o .project-card pai do botão.');
//     }
//   });
// });

// --- Lógica do Slideshow Automático ---
projectCards.forEach(card => {
  //Itera sobre cada card encontrado
  const imagesAttr = card.dataset.images; //Pega a string do atributo data

  if (!imagesAttr) {
    //Verifica se o atributo existe
    console.warn("Card encontrado sem o atributo 'data-images':", card); //Aviso se faltar
    return; //Pula este card
  }
  const imagePaths = imagesAttr //Correto: Começa a processar a string
    .split(',') //Divide em um array pelas vírgulas
    .map(path => path.trim()) //Remove espaços em branco antes/depois
    .filter(path => path); //Remove entradas vazias

  const imgElement = card.querySelector('img'); //Encontra a tag img dentro deste card específico
  if (!imgElement || imagePaths.length <= 1) {
    //Verifica se img existe e se há mais de um caminho de imagem
    return; //Não precisa de slideshow
  }

  let currentImageIndex = 0; //Inicializa o índice para este card
  let slideShowTimerId = null; //Inicializa o ID do timer para o slideshow deste card
  let isAnimating = false; // inicializa a flag de animação para este card
  const animationDuration = 1800; // Duração total da animação CSS (ex: 0.8s = 800ms)

  function showNextImage() {
    //Define a função para trocar a imagem
    if (!slideShowTimerId || isAnimating) {
      //Só executa se o slideshow estiver ativo E não estiver no meio de um fade
      return; //Impede múltiplas execuções ou rodar quando parado
    }
    isAnimating = true; // Marca que a animação começou

    imgElement.classList.add('image-fading'); //Adiciona a classe CSS para disparar a animação de fade

    setTimeout(() => {
      //Espera o fade-out
      currentImageIndex = (currentImageIndex + 1) % imagePaths.length; //Calcula o próximo índice, voltando ao início
      imgElement.src = imagePaths[currentImageIndex]; //Atualiza a fonte da imagem
    }, animationDuration * 0.5); //Espera metade do tempo da animação

    setTimeout(() => {
      //Espera o fade-in completar
      imgElement.classList.remove('image-fading'); //Remove a classe da animação, pronto para a próxima vez
      isAnimating = false; //Reseta a flag de animação
    }, animationDuration); //Espera o tempo total da animação

    slideShowTimerId = setTimeout(showNextImage, slideInterval); //Agenda a *próxima* chamada a si mesma, continuando o loop
  }

  //Função para INICIAR o slideshow

  function startSlideshow() {
    //Define a função para iniciar
    if (imagePaths.length > 1 && !slideShowTimerId) {
      //Verifica condições (múltiplas imagens, não está rodando)
      slideShowTimerId = setTimeout(showNextImage, slideInterval); //Agenda a *primeira* chamada e guarda o ID
    }
  }
  //Função para PARAR o slideshow
  function stopSlideshow() {
    //Define a função para parar
    clearTimeout(slideShowTimerId); //Cancela qualquer chamada agendada de 'showNextImage'
    slideShowTimerId = null; //Reseta o ID para null, indicando que parou
    if (imagePaths.length > 0) {
      //Verifica se há imagens
      imgElement.src = imagePaths[0]; //Reseta a imagem para a primeira
      currentImageIndex = 0; //Reseta o índice
      imgElement.classList.remove('image-fading'); //Garante que a classe de animação seja removida se parou no meio do fade
      isAnimating = false; //Reseta a flag de animação
    }
  }

  //Lógica do Clique no Botão "Veja Mais" (Modificada para controlar slideshow)
  const detailButtons = card.querySelector('.btn-details'); //Seleciona o botão DESTE card

  if (detailButtons) {
    //Verifica se o botão existe
    detailButtons.addEventListener('click', () => {
      card.classList.toggle('expanded');

      if (card.classList.contains('expanded')) {
        startSlideshow();

        //Fecha e PARA slideshows de outros cards
        projectCards.forEach(otherCard => {
          if (otherCard !== card && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded');

            if (otherCard.stopSlideshow) {
              otherCard.stopSlideshow();
            }
          }
        });
      } else {
        stopSlideshow();
      }
    });
  }
  card.stopSlideshow = stopSlideshow;
});
