const btnMenu = document.querySelector('#icono-menu');
const menu = document.querySelector('#menu');

btnMenu.addEventListener("click", () => {
    menu.classList.toggle("visible");
});