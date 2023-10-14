import Cliente from '../classes/Cliente.js';
import { db, validarCLiente, cargarDatosCliente } from "../funciones.js";
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

            // Cargamos clientes
            if( window.location.href.includes("index.html") ) {
                setTimeout(() => {
                    Cliente.imprimirClientes();
                }, 100);
            }

            // Cargamos cliente
            if( window.location.href.includes("editar-cliente.html") ) {
                setTimeout(() => {
                    cargarDatosCliente();
                }, 100)
            }
        }
    }

    eventListeners() {
        if(formulario) formulario.addEventListener('submit', validarCLiente);
    }
}

export default App;