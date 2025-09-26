// Selecciona el botón que contiene el icono del menú
const btnMenu = document.querySelector('#icono-menu');

// Selecciona el contenedor del menú
const menu = document.querySelector('#menu');

// Agrega un evento 'click' al botón del menú
btnMenu.addEventListener("click", () => {
    // Alterna la clase 'visible' en el menú para mostrarlo u ocultarlo
    menu.classList.toggle("visible");
});