class ContactFacade {
    // Inyección de la dependencia del repositorio
    constructor() {
        this.repository = new ContactRepository();
    }

    // Guardar un nuevo contacto
    guardarContacto(id, nombre, email, telefono, motivo, mensaje, aceptaTerminos, preferenciaContacto) {
        const contact = { id, nombre, email, telefono, motivo, mensaje, aceptaTerminos, preferenciaContacto, fechaCreacion: new Date(), fechaActualizacion: new Date() };
        this.repository.add(contact);
        return contact;
    }

    // Consultar todos los contactos
    listarContactos() {
        return this.repository.getAll();
    }

    // Eliminar un contacto por su ID
    eliminarContacto(id) {
        this.repository.remove(id);
    }

    // Eliminar todos los contactos
    borrarTodosContactos() {
        this.repository.clear();
    }

    // Buscar un contacto por su ID
    buscarContacto(id) {
        return this.repository.getById(id);
    }

    // Actualizar un contacto
    actualizarContacto(id, nuevoNombre, nuevoEmail, nuevoTelefono, nuevoMotivo, nuevoMensaje, nuevoAceptaTerminos, nuevoPreferenciaContacto) {
        const contact = this.repository.getById(id);
        if (contact) {
            contact.nombre = nuevoNombre;
            contact.email = nuevoEmail;
            contact.telefono = nuevoTelefono;
            contact.motivo = nuevoMotivo;
            contact.mensaje = nuevoMensaje;
            contact.aceptaTerminos = nuevoAceptaTerminos;
            contact.preferenciaContacto = nuevoPreferenciaContacto;
            contact.fechaActualizacion = new Date();
            this.repository.update(contact);
            return true;
        }
        return false;
    }
}

