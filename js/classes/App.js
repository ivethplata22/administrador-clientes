import { db, validarCLiente } from "../funciones.js";
import { formulario } from '../selectores.js';

class App {
    // Patron de Diseño Singleton
    constructor() {
        if (App.instance) {
            return App.instance; // Devuelve la instancia existente
        }

        App.instance = this; // Guarda la instancia en una propiedad estática

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
        if(formulario) formulario.addEventListener('submit', validarCLiente);
    }
}

export default App;