// ===============================
// Importaciones y configuración
// ===============================
import { ContactFacade } from '../contacto/facade/ContactFacade.js';

// Instancia del facade para manejar la lógica de contactos
const facade = new ContactFacade(); 


// ===============================
// Funciones de validación
// ===============================

// Valida que el campo no esté vacío
function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje; // Muestra mensaje de error
        campo.classList.remove("is-valid"); // Quita estilo válido
        campo.classList.add("is-invalid"); // Marca como inválido
        return false;
    } else {
        errorElement.textContent = ''; // Limpia mensaje de error
        campo.classList.remove("is-invalid"); // Quita estilo inválido
        campo.classList.add("is-valid"); // Marca como válido
        return true;
    }
}

// Valida que el campo tenga longitud entre un mínimo y máximo
function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}

// Valida que el correo tenga dominio @gmail.com
function validarCorreo(campo, errorElement, mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Expresión regular

    if (!correoRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
        return false;
    } else {
        errorElement.textContent = '';
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        return true;
    }
}

// Valida que se haya seleccionado una forma de contacto (radio buttons)
function validarFormaContacto(formaContacto, errorElement, mensaje) {
    let seleccionado = false;

    for (let i = 0; i < formaContacto.length; i++) {
        if (formaContacto[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

// ===============================
// Funciones de utilidades
// ===============================

// Muestra un mensaje de éxito con Toastify
function mostrarMensajeExito(textMostrar) {
    alert(textMostrar);
}

// Obtiene referencias a inputs y etiquetas de error
function obtenerDatos() {
    return {
        inputs: {
            idContacto: document.getElementById('id-contacto'),
            nombres: document.getElementById('nombres'),
            correo: document.getElementById('correo-electronico'),
            telefono: document.getElementById('telefono'),
            motivo: document.getElementById('motivo-contacto'),
            mensaje: document.getElementById('mensaje'),
            aceptaTerminos: document.getElementById('acepta-terminos'),
            preferencia: document.getElementsByName('preferencia-contacto')
        },
        errores: {
            idContacto: document.getElementById('errorIdContacto'),
            nombres: document.getElementById('errorNombres'),
            correo: document.getElementById('errorCorreo'),
            telefono: document.getElementById('errorTelefono'),
            motivo: document.getElementById('errorMotivoContacto'),
            mensaje: document.getElementById('errorMensaje'),
            aceptaTerminos: document.getElementById('errorAceptaTerminos'),
            preferencia: document.getElementById('errorPreferenciaContacto')
        }
    };
}

// Función para formatear
function formatearFecha(fecha) {
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // meses 0-11
  const año = fecha.getFullYear();

  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  return `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;
}

// ===============================
// Validación principal del formulario
// ===============================

// Hace accesible la función al HTML
window.validarFormulario = validarFormulario;

function validarFormulario() {
    // Previene que se recargue
    event.preventDefault();

    // Obtener inputs y errores
    const { inputs, errores } = obtenerDatos();

    // Validaciones de cada campo
    const idObligatorio = validarCampoObligatorio(inputs.idContacto, errores.idContacto, 'El ID del contacto es obligatorio');
    const idValido = idObligatorio && validarLongitud(inputs.idContacto, errores.idContacto, 1, 10, 'El ID debe tener entre 1 y 10 caracteres');
    const nombresValidos = validarLongitud(inputs.nombres, errores.nombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    const correoObligatorio = validarCampoObligatorio(inputs.correo, errores.correo, 'El correo es obligatorio');
    const correoValido = correoObligatorio && validarCorreo(inputs.correo, errores.correo, 'El correo debe tener el dominio @gmail.com');
    const telefonoObligatorio = validarCampoObligatorio(inputs.telefono, errores.telefono, 'El teléfono es obligatorio');
    const telefonoValido = telefonoObligatorio && validarLongitud(inputs.telefono, errores.telefono, 10, 10, 'El teléfono debe tener 10 caracteres');
    const preferenciaContactoObligatorio = validarFormaContacto(inputs.preferencia, errores.preferencia, 'La preferencia de contacto es obligatoria');
    const motivoContactoObligatorio = validarCampoObligatorio(inputs.motivo, errores.motivo, 'El motivo de contacto es obligatorio');
    const motivoContactoValido = motivoContactoObligatorio && validarLongitud(inputs.motivo, errores.motivo, 1, 100, 'El motivo debe tener entre 1 y 100 caracteres');
    const mensajeValido = validarLongitud(inputs.mensaje, errores.mensaje, 0, 500, 'El mensaje no debe exceder los 500 caracteres');
    const aceptaTerminosValido = inputs.aceptaTerminos.checked;

    if (!aceptaTerminosValido) {
        errores.aceptaTerminos.textContent = 'Debe aceptar los términos y condiciones';
    }
    
    // Si todas las validaciones son correctas
    if (idObligatorio && idValido && correoObligatorio && telefonoObligatorio && motivoContactoObligatorio && nombresValidos && correoValido && telefonoValido && motivoContactoValido && mensajeValido && aceptaTerminosValido && preferenciaContactoObligatorio) {
        let text;
        let preferenciaSeleccionada = "";

        // Buscar cuál radio está seleccionado
        inputs.preferencia.forEach(input => {
            if (input.checked) {
                preferenciaSeleccionada = input.value;
            }
        });

        // Si existe el contacto, actualizar, si no, crear
        if(facade.buscarContacto(inputs.idContacto.value)){
            facade.actualizarContacto(inputs.idContacto.value, inputs.nombres.value, inputs.correo.value, inputs.telefono.value, inputs.motivo.value, inputs.mensaje.value, inputs.aceptaTerminos.value, preferenciaSeleccionada);
            text='Contacto actualizado, nos contactaremos pronto';
        }
        else{
            facade.guardarContacto(inputs.idContacto.value, inputs.nombres.value, inputs.correo.value, inputs.telefono.value, inputs.motivo.value, inputs.mensaje.value, inputs.aceptaTerminos.value, preferenciaSeleccionada);
            text='Contacto creado, nos contactaremos pronto';
        }

        // Refrescar tabla y mostrar mensaje
        renderizarTabla();
        mostrarMensajeExito(text);

        // Resetear el formulario después de 2 segundos
        setTimeout(() => {
            // Resetear el formulario
            document.getElementById('formularioContacto').reset();

            // Quitar clases de validación
            const inputs = document.querySelectorAll("#formularioContacto input, #formularioContacto select, #formularioContacto textarea");
            inputs.forEach(input => {
                input.classList.remove("is-valid", "is-invalid", "input-exito");
            });

            // Limpiar errores
            const errores = document.querySelectorAll(".error");
            errores.forEach(e => e.textContent = "");
        }, 2000);
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }
}


// ===============================
// Validación al perder el foco
// ===============================
function validarCamposAlCambiarFoco() {

    // Obtener inputs y errores
    const { inputs, errores } = obtenerDatos();

    inputs.idContacto.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.idContacto, errores.idContacto, 'El ID es obligatorio') &&
        validarLongitud(inputs.idContacto, errores.idContacto, 1, 10, 'El ID debe tener entre 1 y 10 caracteres');
    });
    inputs.nombres.addEventListener('blur', () => validarLongitud(inputs.nombres, errores.nombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres'));
    inputs.correo.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.correo, errores.correo, 'El correo es obligatorio') &&
        validarCorreo(inputs.correo, errores.correo, 'El correo debe tener el dominio @gmail.com');
    });
    inputs.telefono.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.telefono, errores.telefono, 'El teléfono es obligatorio') &&
        validarLongitud(inputs.telefono, errores.telefono, 10, 10, 'El teléfono debe tener 10 caracteres');
    });
    inputs.motivo.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.motivo, errores.motivo, 'El motivo es obligatorio') &&
        validarLongitud(inputs.motivo, errores.motivo, 1, 100, 'El motivo debe tener entre 1 y 100 caracteres');
    });
    inputs.mensaje.addEventListener('blur', () => validarLongitud(inputs.mensaje, errores.mensaje, 0, 500, 'El mensaje no debe exceder los 500 caracteres'));
    inputs.aceptaTerminos.addEventListener('change', () => {
        errores.aceptaTerminos.textContent = inputs.aceptaTerminos.checked ? '' : 'Debe aceptar los términos y condiciones';
    });

    Array.from(inputs.preferencia).forEach(input =>
        input.addEventListener('blur', () => validarFormaContacto(inputs.preferencia, errores.preferencia, 'La preferencia es obligatoria'))
    );
}

// Ejecuta la validación al cargar la página
document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);


// ===============================
// Manejo de tabla de contactos
// ===============================
const idContactoInput = document.getElementById('id-contacto');
const nombresInput = document.getElementById('nombres');
const correoInput = document.getElementById('correo-electronico');
const telefonoInput = document.getElementById('telefono');
const motivoInput = document.getElementById('motivo-contacto');
const mensajeInput = document.getElementById('mensaje');
const aceptaTerminosInput = document.getElementById('acepta-terminos');
const preferenciaInputs = document.getElementsByName('preferencia-contacto');

// Hace accesible eliminar todos los contactos
window.eliminarTodos = eliminarTodos;

// Eliminar todos los contactos
function eliminarTodos() {
    // Llama al método del facade para borrar todos los contactos guardados
    facade.borrarTodosContactos();

    // Vuelve a renderizar la tabla para reflejar los cambios
    renderizarTabla();

    // Muestra un mensaje de éxito al usuario
    mostrarMensajeExito('Contactos eliminados con éxito');

    // Retorna true para permitir que el formulario (si lo hay) se envíe correctamente
    return true;
}

// Renderizar la tabla de contactos
function renderizarTabla() {
    // Selecciona el <tbody> de la tabla donde irán las filas
    const tablaBody = document.querySelector("#tablaContactos tbody");

    // Limpia el contenido previo para evitar duplicados
    tablaBody.innerHTML = "";

    // Obtiene la lista de contactos desde el facade
    const contactos = facade.listarContactos();

    // Recorre cada contacto y crea dinámicamente una fila
    contactos.forEach(contacto => {
    const fila = document.createElement("tr");

    // Convertir a objeto Date
    const fechaCreacion = new Date(contacto.fechaCreacion);
    const fechaActualizacion = new Date(contacto.fechaActualizacion);

    // Genera las celdas con la información del contacto
    fila.innerHTML = `
        <td>${contacto.id}</td>
        <td>${contacto.nombre}</td>
        <td>${contacto.email}</td>
        <td>${contacto.telefono}</td>
        <td>${contacto.motivo}</td>
        <td>${contacto.mensaje}</td>
        <td>${contacto.preferenciaContacto}</td>
        <td>${formatearFecha(fechaCreacion)}</td>
        <td>${formatearFecha(fechaActualizacion)}</td>
        <td>
        <!-- Botones de acción para editar o eliminar -->
        <button class="btn btn-editar" onclick="editar('${contacto.id}')">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminar('${contacto.id}')">Eliminar</button>
        </td>
    `;

    // Agrega la fila recién creada al cuerpo de la tabla
        tablaBody.appendChild(fila);
    });
}

// Ejecuta la renderización de la tabla automáticamente al cargar la página
window.onload = () => renderizarTabla();

// Editar contacto desde la tabla
window.editar = function(id) {
    // Busca el contacto en base al id recibido
    const contacto = facade.buscarContacto(id);

    // Si el contacto existe, se rellenan los inputs del formulario
    if (contacto) {
        idContactoInput.value = contacto.id;
        nombresInput.value = contacto.nombre;
        correoInput.value = contacto.email;
        telefonoInput.value = contacto.telefono;
        motivoInput.value = contacto.motivo;
        mensajeInput.value = contacto.mensaje;
        aceptaTerminosInput.checked = contacto.aceptaTerminos;

        // Marca el radio button correspondiente a la preferencia de contacto
        Array.from(preferenciaInputs).forEach(input => {
            input.checked = (input.value === contacto.preferenciaContacto);
        });

        // Opcional: alerta para avisar al usuario qué contacto se está editando
        alert(`Editando contacto con ID: ${id}`);
    }
};

// Eliminar contacto desde la tabla
window.eliminar = function(id) {
    // Busca el contacto en base al id recibido
    const contacto = facade.buscarContacto(id);

    // Si existe, se pide confirmación al usuario antes de borrarlo
    if (contacto) {
        if (confirm(`¿Seguro que quieres eliminar el contacto con ID: ${id}?`)) {
            // Se elimina el contacto
            facade.borrarContacto(id);

            // Se vuelve a renderizar la tabla para actualizar la vista
            renderizarTabla();
        }
    } else {
        // Si el contacto no existe, se muestra un mensaje de error
        alert("El contacto no existe");
    }
};