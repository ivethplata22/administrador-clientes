class DB {
    constructor() {
        this.data = null;
    }

    crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = () => {
            console.log('Hubo un error al crear DB');
        }

        crearDB.onsuccess = () => {
            console.log('DB Creada');
            this.data = crearDB.result;
        }

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('Columnas creadas');
        }
    }
}

export default DB;