const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

// percorrendo os cards de vídeos e adicionando um evento de clique para cada um deles:
for (let card of cards) {
  card.addEventListener('click', function() {
    const videoId = card.getAttribute('id'); // pegando o id de cada vídeo
    window.location.href = `/video?id=${videoId}`;
    // modalOverlay.classList.add('active'); // ativando a overlay de opacidade para escurecer o fundo da view
    // modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`; // exibindo o vídeo na modal dinamicamente
  });
}

/*
// fechando a modal e o overlay ao clicar no ícone de "X"
document.querySelector('.close-modal').addEventListener('click', function() {
  modalOverlay.classList.remove('active');
  modalOverlay.querySelector('iframe').src = ''; // removendo o vídeo, fazendo com que ele deixe de ser reproduzido
});
*/