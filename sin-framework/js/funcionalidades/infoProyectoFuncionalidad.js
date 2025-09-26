const proyectos = document.querySelectorAll('.proyectos');
const card = document.querySelector('#card-info-proyecto');
const btnClose = document.querySelector('#btn-close-card');


const campoNombre = document.querySelector('#card-titulo');
const campoDescripcion = document.querySelector('.proyecto-descripcion');
const campoTecnologias = document.querySelector('.proyecto-tecnologias');

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
        descripcion: "Descripcion spartan box dolor sit amet consectetur adipisicing elit. At inventore, eveniet tenetur quam sapiente quas dolorem repellat eligendi optio necessitatibus hic, obcaecati veniam in autem. Unde rerum est autem omnis?",
        tecnologias: ["HTML", "CSS", "C#", "ASP.Net"]
    },
    {
        nombre: "Manage Soft",
        descripcion: "Se desarrolló un aplicativo de escritorio para una universidad con el objetivo de agilizar el proceso de inscripción a pasantías por parte de los estudiantes y brindar a los coordinadores de cada facultad herramientas para gestionar de manera eficiente las solicitudes.",
        tecnologias: ["Java", "Spring Boot", "Docker", "MySql", "RabbitMQ", "KeyCloak"]
    }
];

proyectos.forEach((proyecto, index) => {
    proyecto.addEventListener("click", () => {
        let informacion = infoProyectos[index];
        campoNombre.innerText = `${informacion.nombre}`;
        campoDescripcion.innerText = `${informacion.descripcion}`;
        campoTecnologias.innerHTML = "";
        informacion.tecnologias.forEach(tecnologia => {
            campoTecnologias.innerHTML += `<div>${tecnologia}</div>`
        });
        card.classList.add("activade");
    });
});


btnClose.addEventListener("click", () => {
    card.classList.remove("activade");
});