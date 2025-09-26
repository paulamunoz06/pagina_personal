// ===== Selección de elementos del DOM =====
const cursor = document.querySelector('.cursor');                 // Cursor externo
const cursorDot = document.querySelector('.cursor-dot');          // Punto central del cursor
const cursorInner = document.querySelector('.cursor-inner');      // Círculo que sigue al cursor con suavizado
const tooltipImg = document.querySelector('.tooltip.image');      // Tooltip de imagen
const tooltip = document.querySelector('.tooltip');               // Tooltip de texto
const tooltipDescripcion = document.querySelector('.tooltip .tooltip-descripcion'); // Texto del tooltip simple
const tooltipImgDescripcion = document.querySelector('.tooltip.image .tooltip-descripcion'); // Texto del tooltip con imagen
const imgToolTip = document.querySelector('.tooltip.image img');  // Imagen dentro del tooltip

// Elementos de la interfaz
const iconoMenu = document.querySelector('#icono-menu');
const letras = document.querySelectorAll(".letras div");          // Letras del nombre
const opcionesMenu = document.querySelectorAll(".opcion");        // Opciones del menú
const nuestrosProyectos = document.querySelectorAll('.proyectos');// Lista de proyectos

// Información que se mostrará al pasar sobre los proyectos
const infoProyectosCard = [
  { srcImg: "assets/images/portafolio.svg", descripcion: "Nuestro sitio web de portafolio personal" },
  { srcImg: "assets/images/parkingZone.svg", descripcion: "Gestión de parqueaderos del grupo Éxito" },
  { srcImg: "assets/images/spartanBox.svg", descripcion: "Gestión del gimnasio Spartan Box" },
  { srcImg: "assets/images/manageSoft.svg", descripcion: "Gestión del gimnasio Spartan Box" }
];

// ===== Variables para animación suave del cursor =====
const suavizado = 0.08;  // Factor de interpolación para que el círculo siga con retraso
let mouseX = 0, mouseY = 0;    // Coordenadas actuales del mouse
let cursorX = 0, cursorY = 0;  // Coordenadas suavizadas del cursor interno

// ===== Movimiento del cursor =====
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Cursor externo y punto central siguen directamente al mouse
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

// Animación continua para suavizar el movimiento del cursor interno
function animate() {
  cursorX += (mouseX - cursorX) * suavizado;
  cursorY += (mouseY - cursorY) * suavizado;

  cursorInner.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

  requestAnimationFrame(animate); // Llamada recursiva para mantener la animación
}
animate();

// ===== Interacciones =====

// Hover sobre letras del nombre
letras.forEach((e) => {
  e.addEventListener("mouseenter", cursorHoverActivado);
  e.addEventListener("mouseleave", cursorHoverDesactivado);
});

// Hover sobre el ícono del menú
iconoMenu.addEventListener("mouseenter", () => tooltipActivado("Menú"));
iconoMenu.addEventListener("mouseleave", tooltipDesactivado);

// Hover sobre las opciones del menú
opcionesMenu.forEach((e) => {
  e.addEventListener("mouseenter", cursorHoverActivado);
  e.addEventListener("mouseleave", cursorHoverDesactivado);
});

// Hover sobre proyectos (muestra tooltip con imagen y descripción)
nuestrosProyectos.forEach((e, index) => {
  e.addEventListener("mouseenter", () => {
    let informacion = infoProyectosCard[index];

    // Activa tooltip con imagen
    cursor.classList.add("tooltip-active");
    cursorDot.classList.add("tooltip-active");
    cursorInner.classList.add("tooltip-active");
    tooltipImg.classList.add("active");

    // Carga imagen y descripción en el tooltip
    imgToolTip.src = `${informacion.srcImg}`;
    tooltipImgDescripcion.innerText = informacion.descripcion;
  });

  e.addEventListener("mouseleave", () => {
    // Desactiva tooltip con imagen
    cursor.classList.remove("tooltip-active");
    cursorDot.classList.remove("tooltip-active");
    cursorInner.classList.remove("tooltip-active");
    tooltipImg.classList.remove("active");
  });
});

// Hover sobre el botón de cerrar proyecto
btnClose.addEventListener("mouseenter", () => tooltipActivado("Cerrar"));
btnClose.addEventListener("mouseleave", tooltipDesactivado);

// ===== Funciones auxiliares =====

// Activar estado hover del cursor
function cursorHoverActivado() {
  cursor.classList.add("active");
  cursorDot.classList.add("active");
  cursorInner.classList.add("active");
}

// Desactivar estado hover del cursor
function cursorHoverDesactivado() {
  cursor.classList.remove("active");
  cursorDot.classList.remove("active");
  cursorInner.classList.remove("active");
}

// Activar tooltip de texto
function tooltipActivado(descripcion) {
  cursor.classList.add("tooltip-active");
  cursorDot.classList.add("tooltip-active");
  cursorInner.classList.add("tooltip-active");
  tooltip.classList.add("active");
  tooltipDescripcion.innerText = descripcion;
}

// Desactivar tooltip de texto
function tooltipDesactivado() {
  cursor.classList.remove("tooltip-active");
  cursorDot.classList.remove("tooltip-active");
  cursorInner.classList.remove("tooltip-active");
  tooltip.classList.remove("active");
}
