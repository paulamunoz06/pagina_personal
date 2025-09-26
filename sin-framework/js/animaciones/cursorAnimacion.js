const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorInner = document.querySelector('.cursor-inner');
const tooltipImg = document.querySelector('.tooltip.image');
const tooltip = document.querySelector('.tooltip');
const tooltipDescripcion = document.querySelector('.tooltip .tooltip-descripcion');
const tooltipImgDescripcion = document.querySelector('.tooltip.image .tooltip-descripcion');
const imgToolTip = document.querySelector('.tooltip.image img');

const iconoMenu = document.querySelector('#icono-menu');
const letras = document.querySelectorAll(".letras div");
const opcionesMenu = document.querySelectorAll(".opcion");
const nuestrosProyectos = document.querySelectorAll('.proyectos');

const infoProyectosCard = [
  {
    srcImg: "assets/images/portafolio.svg",
    descripcion: "Nuestro sitio web de portafolio personal"
  },
  {
    srcImg: "assets/images/parkingZone.svg",
    descripcion: "Gestión de parqueaderos del grupo Éxito"
  },
  {
    srcImg: "assets/images/spartanBox.svg",
    descripcion: "Gestión del gimnasio Spartan Box"
  },
  {
    srcImg: "assets/images/manageSoft.svg",
    descripcion: "Gestión del gimnasio Spartan Box"
  }
];

const suavizado = 0.08;

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

// animación suave para el círculo
function animate() {
  cursorX += (mouseX - cursorX) * suavizado;
  cursorY += (mouseY - cursorY) * suavizado;

  cursorInner.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}

animate();


// Hover sobre las letras del nombre
letras.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    cursorHoverActivado();
  });
  e.addEventListener("mouseleave", () => {
    cursorHoverDesactivado();
  });
});


// Hover sobre el icono del menu
iconoMenu.addEventListener("mouseenter", () => {
  tooltipActivado("Menú");
});

iconoMenu.addEventListener("mouseleave", () => {
  tooltipDesactivado();
});


// Hover sobre las opciones del menu
opcionesMenu.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    cursorHoverActivado();
  });
  e.addEventListener("mouseleave", () => {
    cursorHoverDesactivado();
  });
});

// Hover sobre los proyectos
nuestrosProyectos.forEach((e, index) => {
  e.addEventListener("mouseenter", () => {
    let informacion = infoProyectosCard[index];

    cursor.classList.add("tooltip-active");
    cursorDot.classList.add("tooltip-active");
    cursorInner.classList.add("tooltip-active");
    tooltipImg.classList.add("active");

    imgToolTip.src = `${informacion.srcImg}`;
    tooltipImgDescripcion.innerText = "";
    tooltipImgDescripcion.innerText = `${informacion.descripcion}`;
  });
  e.addEventListener("mouseleave", () => {
    cursor.classList.remove("tooltip-active");
    cursorDot.classList.remove("tooltip-active");
    cursorInner.classList.remove("tooltip-active");
    tooltipImg.classList.remove("active");
  });
});


// Hover sobre el boton de cerrar informacion del proyecto
btnClose.addEventListener("mouseenter", () => {
  tooltipActivado("Cerrar");
});

btnClose.addEventListener("mouseleave", () => {
  tooltipDesactivado();
});


function cursorHoverActivado() {
  cursor.classList.add("active");
  cursorDot.classList.add("active");
  cursorInner.classList.add("active");
}

function cursorHoverDesactivado() {
  cursor.classList.remove("active");
  cursorDot.classList.remove("active");
  cursorInner.classList.remove("active");
}

function tooltipActivado(descripcion) {
  cursor.classList.add("tooltip-active");
  cursorDot.classList.add("tooltip-active");
  cursorInner.classList.add("tooltip-active");
  tooltip.classList.add("active");
  tooltipDescripcion.innerText = "";
  tooltipDescripcion.innerText = `${descripcion}`;
}

function tooltipDesactivado() {
  cursor.classList.remove("tooltip-active");
  cursorDot.classList.remove("tooltip-active");
  cursorInner.classList.remove("tooltip-active");
  tooltip.classList.remove("active");
}

