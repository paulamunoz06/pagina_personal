const proyectos = document.querySelectorAll('.proyectos');
const card = document.querySelector('#card-info-proyecto');
const btnClose = document.querySelector('#btn-close-card');


const campoNombre = document.querySelector('#card-titulo');
const campoDescripcion = document.querySelector('.proyecto-descripcion');
const campoTecnologias = document.querySelector('.proyecto-tecnologias');

const infoProyectos = [
    {
        nombre: "Portafolio",
        descripcion: "Descripcion portafolio dolor sit amet consectetur adipisicing elit. At inventore, eveniet tenetur quam sapiente quas dolorem repellat eligendi optio necessitatibus hic, obcaecati veniam in autem. Unde rerum est autem omnis?",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
        nombre: "Parking Zone",
        descripcion: "Descripcion parking zone dolor sit amet consectetur adipisicing elit. At inventore, eveniet tenetur quam sapiente quas dolorem repellat eligendi optio necessitatibus hic, obcaecati veniam in autem. Unde rerum est autem omnis?",
        tecnologias: ["HTML", "CSS", "JavaScript", "Tailwind", "Node", "Express"]
    },
    {
        nombre: "Spartan Box",
        descripcion: "Descripcion spartan box dolor sit amet consectetur adipisicing elit. At inventore, eveniet tenetur quam sapiente quas dolorem repellat eligendi optio necessitatibus hic, obcaecati veniam in autem. Unde rerum est autem omnis?",
        tecnologias: ["HTML", "CSS", "C#", "ASP.Net"]
    },
    {
        nombre: "Manage Fit",
        descripcion: "Descripcion manage fit dolor sit amet consectetur adipisicing elit. At inventore, eveniet tenetur quam sapiente quas dolorem repellat eligendi optio necessitatibus hic, obcaecati veniam in autem. Unde rerum est autem omnis?",
        tecnologias: ["Java", "Spring Boot", "Docker", "MySql", "RabbitMQ", "KeyCloak"]
    }
];


proyectos.forEach((proyecto, index) => {
    proyecto.addEventListener("click", () => {
        informacion = infoProyectos[index]; 
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