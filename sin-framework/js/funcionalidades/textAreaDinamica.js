// Selecciona el elemento <textarea> con id "mensaje"
const textarea = document.getElementById("mensaje");

// Busca el contenedor más cercano con la clase "form-textarea"
const container = textarea.closest(".form-textarea"); // busca el div contenedor

// Agrega un evento que se activa cada vez que cambia el contenido del textarea
textarea.addEventListener("input", function () {
    // Reinicia la altura del textarea a "auto" para recalcularla
    this.style.height = "auto";

    // Ajusta la altura del textarea en función de su contenido (scrollHeight)
    this.style.height = this.scrollHeight + "px";

    // Ajusta la altura del contenedor para que coincida con la del textarea
    container.style.height = this.style.height;
});