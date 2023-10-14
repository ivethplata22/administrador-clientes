import { db, ui } from '../funciones.js';
import { formulario, listadoClientes } from '../selectores.js';

class Cliente {

    constructor({nombre, email, telefono, empresa, id}) {
        this.id = (!id) ? Date.now() : Number(id);
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.empresa = empresa;
    }

    crearNuevoCliente() {
        const objCliente = {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            empresa: this.empresa
        };

        const transaction = db.data.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        // Agregar Cliente
        objectStore.add(objCliente);

        transaction.onerror = () => ui.imprimirAlerta('Hubo un error el agregar cliente', 'error', formulario);

        transaction.oncomplete = () => {
            ui.imprimirAlerta('Cliente agregado correctamente', 'exito', formulario);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    actualizarCliente() {
        const objCliente = {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            empresa: this.empresa
        };

        const transaction = db.data.transaction(['crm'], 'readwrite');
        
        const objectStore = transaction.objectStore('crm');

        // Actualizar Cliente
        objectStore.put(objCliente);

        transaction.onerror = () => ui.imprimirAlerta('Hubo un error al actualizar cliente', 'error', formulario);

        transaction.oncomplete = () => {
            ui.imprimirAlerta('Cliente actualizado correctamente', 'exito', formulario);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    static imprimirClientes() {
        // Obtener Datos BD
        const objectStore = db.data.transaction('crm').objectStore('crm');

        // Recorrer los Datos
        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;
            const cliente = (cursor) ? cursor.value : null;

            // Dibujar Cliente HTML
            if(cliente) ui.dibujarCliente(cliente);

            // Seguir Iterando
            if(cursor) cursor.continue();
        }
    }

    static obtenerCliente(id) {
        const transaction = db.data.transaction(['crm'], 'readonly');

        const objectStore = transaction.objectStore('crm');

        // Recorrer Datos
        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;

            if(cursor) {
                // Obtener el cliente buscado
                if(cursor.value.id === Number(id)) {
                    ui.llenarFormulario(cursor.value);
                }

                cursor.continue();
            }
        }
    }

    static eliminarCliente(id, elemento) {
        const transaction = db.data.transaction(['crm'], 'readwrite');
        
        const objectStore = transaction.objectStore('crm');

        objectStore.delete(id);

        transaction.onerror = () => ui.imprimirAlerta('Hubo un error al elmiinar usuario', 'error', listadoClientes);

        transaction.oncomplete = () => elemento.parentElement.parentElement.remove();
    }

}

export default Cliente;