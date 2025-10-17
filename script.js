const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');
const icon = mobileBtn.querySelector('.fa-solid');
const carrosseisArea = document.querySelectorAll('.carrossel');

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
