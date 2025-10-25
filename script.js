const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');
const icon = mobileBtn.querySelector('.fa-solid');
const carrosseisArea = document.querySelectorAll('.carrossel');

// --- Lógica de Expansão dos Cards de Projeto ---
const projectCards = document.querySelectorAll('#project-grid .project-card');
const detailButtons = document.querySelectorAll('#project-grid .btn-details');

// --- Lógica da Seção Sobre Interativa ---
const aboutSection = document.getElementById('about-interactive');
//Seleciona o container principal da interação.

//EVENTO DE FADEIN NAS SECTIONS

const sectionObserver = document.querySelectorAll('.reveal');

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

// --- Lógica da Seção Sobre Interativa ---

if (aboutSection) {
  //Só executa o código abaixo se a seção existir nesta página
  //pegar todos os gatilhos clicaveis com uma constante que pega todos

  const aboutTriggers = aboutSection.querySelectorAll('.trigger');

  //Pega todos os elementos com a classe '.topic-content' DENTRO da seção 'about'.
  const topicContents = aboutSection.querySelectorAll('.topic-content');

  //Pega o elemento da imagem pelo seu ID DENTRO da seção 'about'.

  const aboutImage = aboutSection.querySelector('#about-image');

  const topicsData = {
    empresa: {
      imgSrc: './assets/cards-sobrenos/fachadac3t.png',
      textId: 'topic-empresa',
    },
    civil: {
      imgSrc: './assets/cards-sobrenos/civil.png', // << SUBSTITUA PELA SUA IMAGEM
      textId: 'topic-civil',
    },
    mecanica: {
      imgSrc: './assets/cards-sobrenos/mecanica.png', // << SUBSTITUA PELA SUA IMAGEM
      textId: 'topic-mecanica',
    },
    eletrica: {
      // Chave entre aspas por causa do hífen
      imgSrc: './assets/cards-sobrenos/eletrica.png', // << SUBSTITUA PELA SUA IMAGEM
      textId: 'topic-eletrica', // ID corresponde ao data-topic
    },
    necessidade: {
      imgSrc: './assets/cards-sobrenos/documentacao.png', // << SUBSTITUA PELA SUA IMAGEM
      textId: 'topic-necessidade',
    },
    equipe: {
      imgSrc: './assets/cards-sobrenos/equipe.png', // << SUBSTITUA PELA SUA IMAGEM
      textId: 'topic-equipe',
    },
  };

  //função que baixe todas as imagens
  function preloadAllImages() {
    Object.values(topicsData).forEach(topic => {
      const img = new Image();
      img.src = topic.imgSrc;
    });
  }

  preloadAllImages();

  aboutTriggers.forEach(trigger => {
    //Itera sobre todos os triggers e adiciona um listener de clique
    trigger.addEventListener('click', () => {
      const topic = trigger.dataset.topic; //Lê o valor do atributo 'data-topic' do trigger clicado

      if (!topicsData[topic] || trigger.classList.contains('active')) {
        //Verifica se o 'topic' existe no 'topicsData' E se o trigger clicado NÃO tem a classe 'active'.
        return;
      }

      //encontra os elementos que TÊM a classe 'active' e a remove
      const currentActiveTrigger =
        aboutSection.querySelector('.trigger.active');

      const currentActiveContent = aboutSection.querySelector(
        '.topic-content.active',
      );

      if (currentActiveTrigger) currentActiveTrigger.classList.remove('active');
      if (currentActiveContent) currentActiveContent.classList.remove('active');

      const isMobile = window.innerWidth <= 992;

      if (isMobile) {
        const newContent = aboutSection.querySelector(
          '#' + topicsData[topic].textId,
        );

        if (newContent) newContent.classList.add('active');
        trigger.classList.add('active');
      } else {
        //iniciar a animação de fade-out da imagem.

        if (aboutImage) aboutImage.classList.add('fading');

        setTimeout(() => {
          if (aboutImage) aboutImage.src = topicsData[topic].imgSrc;

          const newContent = aboutSection.querySelector(
            '#' + topicsData[topic].textId,
          );
          if (newContent) newContent.classList.add('active');

          trigger.classList.add('active');
          if (aboutImage) aboutImage.classList.remove('fading');
        }, 600);
      }
    });
  });
}

//EVENTO DE FADEIN NAS SECTIONS
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeIn');
    } else {
      entry.target.classList.remove('fadeIn');
    }
  });
};

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);
sectionObserver.forEach(section => {
  observer.observe(section);
});
