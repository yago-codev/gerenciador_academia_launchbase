const currentPage = location.pathname; // retorna o caminho da url (ñ incluindo os parâmetros)
const menuItems = document.querySelectorAll('header .links a');

for (item of menuItems) {
  // para incluirmos os parâmetros da url dentro do caminho que foi capturado em currentPage, 
  // será utilizado o includes(), passando como parâmetro o link estático contido nos itens de menu.
  // desse modo, poderemos navegar em páginas que contenham parâmetros, fazendo com que o link ativo funcione corretamente.
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active'); 
  }
}