import { ContactRepository } from '../repository/ContactRepository.js';

export class ContactFacade {
    // Inyección de la dependencia del repositorio
    constructor() {
        this.repository = new ContactRepository();
    }

    // Guardar un nuevo contacto
    guardarContacto(id, nombre, email, telefono, motivo, mensaje, aceptaTerminos, preferenciaContacto) {
        let contact = this.repository.getById(id);
        if (!contact) {
            contact = { id, nombre, email, telefono, motivo, mensaje, aceptaTerminos, preferenciaContacto, fechaCreacion: new Date(), fechaActualizacion: new Date() };
            this.repository.add(contact);
            return true;
        }
        return false;
    }

    // Consultar todos los contactos
    listarContactos() {
        return this.repository.getAll();
    }

    // Eliminar un contacto por su ID
    borrarContacto(id) {
        const contact = this.repository.getById(id);
        if (contact) {
            this.repository.remove(id);
            return true;
        }
        return false;
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

