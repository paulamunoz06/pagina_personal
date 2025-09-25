const textarea = document.getElementById("mensaje");
const container = textarea.closest(".form-textarea"); // busca el div contenedor

textarea.addEventListener("input", function () {
    this.style.height = "auto"; 
    this.style.height = this.scrollHeight + "px"; // ajusta al contenido

    // también ajusta el contenedor
    container.style.height = this.style.height;
});