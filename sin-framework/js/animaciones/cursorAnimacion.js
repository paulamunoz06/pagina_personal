const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorInner = document.querySelector('.cursor-inner');
const iconoMenu = document.querySelector('#icono-menu');
const letras = document.querySelectorAll(".letras div");
const opcionesMenu = document.querySelectorAll(".opcion");

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
  cursorHoverActivado();
});

iconoMenu.addEventListener("mouseleave", () => {
  cursorHoverDesactivado();
});


// Hover sobre las opciones
opcionesMenu.forEach((e) => {
  e.addEventListener("mouseenter", () => {
    cursorHoverActivado();
  });
  e.addEventListener("mouseleave", () => {
    cursorHoverDesactivado();
  });
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

