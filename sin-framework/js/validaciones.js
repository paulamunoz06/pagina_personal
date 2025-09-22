// Valida que el campo no esté vacío
function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        // Muestra mensaje de error
        errorElement.textContent = mensaje;
        // Quita estilo válido
        campo.classList.remove("is-valid");
        // Marca como inválido
        campo.classList.add("is-invalid");
        return false;
    } else {
        // Limpia mensaje de error
        errorElement.textContent = '';
        // Quita estilo inválido
        campo.classList.remove("is-invalid");
        // Marca como válido
        campo.classList.add("is-valid");
        return true;
    }
}

// Función que valida la longitud de un campo entre un mínimo y máximo
function validarLongitud(campo, errorElement, min, max, mensaje) {
    // Verifica si la longitud no está dentro del rango permitido
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

// Función que valida que el correo tenga dominio @gmail.com
function validarCorreo(campo, errorElement, mensaje) {
    // Expresión regular para validar el correo institucional
    const correoRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Verifica si el correo no cumple con el formato
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

// Función que valida que se haya seleccionado una forma de contacto    
function validarFormaContacto(formaContacto, errorElement, mensaje) {
    // Bandera para verificar selección
    let seleccionado = false;

    // Recorre todas las opciones
    for (let i = 0; i < formaContacto.length; i++) {
        if (formaContacto[i].checked) {
            seleccionado = true;
            break;
        }
    }

    // Si no hay selección, muestra error
    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        // Limpia error si se seleccionó una opción
        errorElement.textContent = '';
        return true;
    }
}

// Función que muestra un mensaje de éxito
function mostrarMensajeExito() {
    // Configuración de la notificación
    Toastify({
        text: "¡Registro del producto exitoso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "rgb(98, 76, 158, 0.8)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px"
        },
        stopOnFocus: true,
    }).showToast();
}

function obtenerDatos() {
    return {
        inputs: {
            idContacto: document.getElementById('id-contacto'),
            nombres: document.getElementById('nombres'),
            apellidos: document.getElementById('apellidos'),
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
            apellidos: document.getElementById('errorApellidos'),
            correo: document.getElementById('errorCorreo'),
            telefono: document.getElementById('errorTelefono'),
            motivo: document.getElementById('errorMotivoContacto'),
            mensaje: document.getElementById('errorMensaje'),
            aceptaTerminos: document.getElementById('errorAceptaTerminos'),
            preferencia: document.getElementById('errorPreferenciaContacto')
        }
    };
}

// Función principal que valida todo el formulario
function validarFormulario() {
    // Obtener datos y errores
    const { inputs, errores } = obtenerDatos();

    // Validaciones de campos
    const idObligatorio = validarCampoObligatorio(inputs.idContacto, errores.idContacto, 'El ID del contacto es obligatorio');
    const idValido = idObligatorio && validarLongitud(inputs.idContacto, errores.idContacto, 1, 10, 'El ID del contacto debe tener entre 1 y 10 caracteres');
    const nombresValidos = validarLongitud(inputs.nombres, errores.nombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    const apellidosValidos = validarLongitud(inputs.apellidos, errores.apellidos, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
    const correoObligatorio = validarCampoObligatorio(inputs.correo, errores.correo, 'El correo es obligatorio');
    const correoValido = correoObligatorio && validarCorreo(inputs.correo, errores.correo, 'El correo debe tener el dominio @gmail.com');
    const telefonoObligatorio = validarCampoObligatorio(inputs.telefono, errores.telefono, 'El teléfono es obligatorio');
    const telefonoValido = telefonoObligatorio && validarLongitud(inputs.telefono, errores.telefono, 10, 10, 'El teléfono debe tener 10 caracteres');
    const motivoContactoObligatorio = validarCampoObligatorio(inputs.motivo, errores.motivo, 'El motivo de contacto es obligatorio');
    const motivoContactoValido = motivoContactoObligatorio && validarLongitud(inputs.motivo, errores.motivo, 1, 100, 'El motivo de contacto debe tener entre 1 y 100 caracteres');
    const mensajeValido = validarLongitud(inputs.mensaje, errores.mensaje, 0, 500, 'El mensaje no debe exceder los 500 caracteres');
    const aceptaTerminosValido = inputs.aceptaTerminos.checked;
    if (!aceptaTerminosValido) {
        errores.aceptaTerminos.textContent = 'Debe aceptar los términos y condiciones';
    }
    const preferenciaContactoObligatorio = validarFormaContacto(inputs.preferencia, errores.preferencia, 'La preferencia de contacto es obligatoria');

    // Si todas las validaciones son correctas
    if (idObligatorio && idValido && correoObligatorio && telefonoObligatorio && motivoContactoObligatorio && nombresValidos && apellidosValidos && correoValido && telefonoValido && motivoContactoValido && mensajeValido && aceptaTerminosValido && preferenciaContactoObligatorio) {
        // Mostrar mensaje de éxito
        mostrarMensajeExito();

        // Resetear el formulario después de un tiempo
        setTimeout(() => {
            // Reinicia los valores
            document.getElementById('formularioContacto').reset();

            // Quita estilos de validación
            const inputs = document.querySelectorAll("#formularioContacto input, #formularioContacto select, #formularioContacto textarea");
            inputs.forEach(input => {
                input.classList.remove("is-valid", "is-invalid", "input-exito");
            });

            // Limpia mensajes de error
            const errores = document.querySelectorAll(".error");
            errores.forEach(e => e.textContent = "");
        }, 2000);

        return false;
    } else {
        // Muestra alerta si el formulario no está completo
        alert('Por favor, complete correctamente el formulario.');
        return false;
    }
}

// Función que valida los campos al perder el foco
function validarCamposAlCambiarFoco() {
    // Obtener los inputs y errores
    const { inputs, errores } = obtenerDatos();

    // Validaciones al perder el foco
    inputs.idContacto.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.idContacto, errores.idContacto, 'El ID del contacto es obligatorio') &&
        validarLongitud(inputs.idContacto, errores.idContacto, 1, 10, 'El ID del contacto debe tener entre 1 y 10 caracteres');
    });
    inputs.nombres.addEventListener('blur', () => validarLongitud(inputs.nombres, errores.nombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres'));
    inputs.apellidos.addEventListener('blur', () => validarLongitud(inputs.apellidos, errores.apellidos, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres'));
    inputs.correo.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.correo, errores.correo, 'El correo es obligatorio') &&
        validarCorreo(inputs.correo, errores.correo, 'El correo debe tener el dominio @gmail.com');
    });
    inputs.telefono.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.telefono, errores.telefono, 'El teléfono es obligatorio') &&
        validarLongitud(inputs.telefono, errores.telefono, 10, 10, 'El teléfono debe tener 10 caracteres');
    });
    inputs.motivo.addEventListener('blur', () => {
        validarCampoObligatorio(inputs.motivo, errores.motivo, 'El motivo de contacto es obligatorio') &&
        validarLongitud(inputs.motivo, errores.motivo, 1, 100, 'El motivo de contacto debe tener entre 1 y 100 caracteres');
    });
    inputs.mensaje.addEventListener('blur', () => validarLongitud(inputs.mensaje, errores.mensaje, 0, 500, 'El mensaje no debe exceder los 500 caracteres'));
    inputs.aceptaTerminos.addEventListener('change', () => {
        if (inputs.aceptaTerminos.checked) {
            errores.aceptaTerminos.textContent = '';
        } else {
            errores.aceptaTerminos.textContent = 'Debe aceptar los términos y condiciones';
        }   
    });

    //inputs.preferencia.forEach(input => input.addEventListener('change', () => validarFormaContacto(inputs.preferencia, errores.preferencia, 'La preferencia de contacto es obligatoria')));

    // Validar categoría al perder foco
    Array.from(inputs.preferencia).forEach(input => input.addEventListener('blur', () => validarFormaContacto(inputs.preferencia, errores.preferencia, 'La categoría es obligatoria')));
}

// Ejecuta la validación al cargar la página
document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);