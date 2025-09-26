// Selecciona todos los elementos con la clase 'proyectos'
const proyectos = document.querySelectorAll('.proyectos');

// Selecciona el contenedor de la tarjeta de información del proyecto
const card = document.querySelector('#card-info-proyecto');

// Selecciona el botón de cerrar la tarjeta
const btnClose = document.querySelector('#btn-close-card');

// Selecciona el campo donde se mostrará el nombre del proyecto
const campoNombre = document.querySelector('#card-titulo');

// Selecciona el campo donde se mostrará la descripción del proyecto
const campoDescripcion = document.querySelector('.proyecto-descripcion');

// Selecciona el contenedor donde se mostrarán las tecnologías del proyecto
const campoTecnologias = document.querySelector('.proyecto-tecnologias');

// Array con la información de los proyectos (nombre, descripción y tecnologías)
const infoProyectos = [
    {
        nombre: "Portafolio",
        descripcion: "Se desarrolló un portafolio web como proyecto personal con el propósito de demostrar conocimientos en tecnologías web, exhibir proyectos realizados y generar visibilidad dentro de la industria.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
        nombre: "Parking Zone",
        descripcion: "Se desarrolló un aplicativo web para optimizar la gestión de los parqueaderos del Grupo Éxito.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Tailwind", "Node", "Express"]
    },
    {
        nombre: "Spartan Box",
        descripcion: "Se desarrolló una aplicación de gestión para el gimnasio Spartan Box con el objetivo de optimizar la administración de clientes, entrenadores y planes de entrenamiento, mejorando la eficiencia operativa y la experiencia del usuario.",
        tecnologias: ["HTML", "CSS", "C#", "ASP.Net"]
    },
    {
        nombre: "Manage Soft",
        descripcion: "Se desarrolló un aplicativo de escritorio para una universidad con el objetivo de agilizar el proceso de inscripción a pasantías por parte de los estudiantes y brindar a los coordinadores de cada facultad herramientas para gestionar de manera eficiente las solicitudes.",
        tecnologias: ["Java", "Spring Boot", "Docker", "MySql", "RabbitMQ", "KeyCloak"]
    }
];

// Recorre todos los elementos con clase 'proyectos'
proyectos.forEach((proyecto, index) => {
    // Agrega un evento 'click' a cada proyecto
    proyecto.addEventListener("click", () => {
        // Obtiene la información correspondiente al proyecto clicado
        let informacion = infoProyectos[index];

        // Inserta el nombre del proyecto en el campo correspondiente
        campoNombre.innerText = `${informacion.nombre}`;

        // Inserta la descripción del proyecto
        campoDescripcion.innerText = `${informacion.descripcion}`;

        // Limpia el contenedor de tecnologías
        campoTecnologias.innerHTML = "";

        // Recorre el array de tecnologías y las inserta como elementos <div>
        informacion.tecnologias.forEach(tecnologia => {
            campoTecnologias.innerHTML += `<div>${tecnologia}</div>`
        });

        // Muestra la tarjeta añadiendo la clase 'activade'
        card.classList.add("activade");
    });
});

// Evento para el botón de cerrar la tarjeta
btnClose.addEventListener("click", () => {
    // Oculta la tarjeta quitando la clase 'activade'
    card.classList.remove("activade");
});