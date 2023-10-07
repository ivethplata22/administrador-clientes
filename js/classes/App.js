import { db } from "../funciones.js";

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        window.onload = () => {
            // Ejecutamos los eventos
            this.eventListeners();

            // Creamos Base de Datos
            db.crearDB();
        }
    }

    eventListeners() {

    }
}

export default App;