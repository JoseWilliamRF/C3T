const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');
const icon = mobileBtn.querySelector('.fa-solid');
const carrosseisArea = document.querySelectorAll('.carrossel');

// --- Lógica de Expansão dos Cards de Projeto ---

const detailButtons = document.querySelectorAll('#project-grid .btn-details');

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
detailButtons.forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.project-card');
    if (card) {
      card.classList.toggle('expanded');

      if (card.classList.contains('expanded')) {
        detailButtons.forEach(otherButton => {
          const otherCard = otherButton.closest('.project-card');
          if (otherCard && otherCard !== card) {
            otherCard.classList.remove('expanded');
          }
        });
      }
    } else {
      console.error('Não foi possível encontrar o .project-card pai do botão.');
    }
  });
});

// --- Lógica do Slideshow Automático ---
projectCards.forEach(card => {
  const imagesAttr = card.dataset.images;

  if (!imagesAttr) {
    console.warn("Card encontrado sem o atributo 'data-images':", card);
    return;
  }
  const imagePaths = imagesAttr
    .split(',')
    .map(path => path.trim())
    .filter(path => path);

  const imgElement = card.querySelector('img');
  if (!imgElement || imagePaths.length <= 1) {
    return;
  }

  let currentImageIndex = 0;
  let isAnimating = false; // Variável para evitar sobreposição de animações
  const animationDuration = 1800; // Duração total da animação CSS (ex: 0.8s = 800ms)

  function showNextImage() {
    if (isAnimating) {
      return;
    }
    isAnimating = true; // Marca que a animação começou

    imgElement.classList.add('image-fading');

    setTimeout(() => {
      currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
      imgElement.src = imagePaths[currentImageIndex];
    }, animationDuration / 2);

    setTimeout(() => {
      imgElement.classList.remove('image-fading');
      isAnimating = false;
    }, animationDuration);

    setTimeout(showNextImage, slideInterval);
  }
  setTimeout(showNextImage, slideInterval);
});
