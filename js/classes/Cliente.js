import { db, ui } from '../funciones.js';

class Cliente {

    constructor({nombre, email, telefono, empresa}) {
        this.id = Date.now();
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

        transaction.onerror = () => ui.imprimirAlerta('Hubo un error el agregar cliente', 'error');

        transaction.oncomplete = () => {
            ui.imprimirAlerta('Cliente agregado correctamente', 'exito');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    static imprimirClientes() {

        // Limpiar HTML

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

}

export default Cliente;