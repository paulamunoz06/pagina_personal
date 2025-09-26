export class ContactRepository {
    // Clave para almacenar los datos en localStorage
    constructor(storageKey = "contacts") {
        this.storageKey = storageKey;
    }

    // Cargar datos desde localStorage
    _load() {
        // Intentar obtener los datos del localStorage
        const data = localStorage.getItem(this.storageKey);

        // Si no hay datos, devolver un array vacío
        // Si hay datos, convierte el string de vuelta a un arreglo
        return data ? JSON.parse(data) : [];
    }

    // Guardar datos en localStorage
    _save(data) {
        // Convertir el arreglo a string y guardarlo en localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Obtener todos los contactos
    getAll() {
        // Cargar los contactos desde localStorage
        return this._load();
    }

    // Obtener un contacto por su ID
    getById(id) {
        // Cargar los contactos existentes
        let contacts = this._load();
        // Buscar el contacto con el ID especificado
        return contacts.find(contact => contact.id === id) || null;
    }

    // Agregar un nuevo contacto
    add(contact) {
        // Cargar los contactos existentes
        let contacts = this._load();
        // Agregar el nuevo contacto al arreglo
        contacts.push(contact);
        // Guardar el arreglo actualizado en localStorage
        this._save(contacts);
    }

    // Actualizar un contacto existente
    update(updatedContact) {
        // Cargar los contactos existentes
        let contacts = this._load();

        // Se utiliza map para crear un nuevo arreglo con el contacto actualizado
        // Si el id coincide con el del updatedContact, devuelve el objeto updatedContact
        // Si no, devuelve el mismo contact
        contacts = contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact);

        // Guardar el arreglo actualizado en localStorage
        this._save(contacts);
    }

    // Eliminar un contacto por su ID
    remove(id) {
        // Cargar los contactos existentes
        let contacts = this._load();
        // Filtrar los contactos que no coinciden con el ID
        contacts = contacts.filter(contact => contact.id !== id);
        // Guardar el arreglo actualizado en localStorage
        this._save(contacts);
    }

    // Eliminar todos los contactos
    clear() {
        localStorage.removeItem(this.storageKey);
    }
}
