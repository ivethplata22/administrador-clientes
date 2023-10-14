import DB from './classes/DB.js';
import UI from './classes/UI.js';
import Cliente from './classes/Cliente.js';
import { inputNombre, inputEmail, inputTelefono, inputEmpresa } from './selectores.js';

// Instanciar
export const db = new DB();
export const ui = new UI();

// Funiones Event Listeners
export function validarCLiente(e) {
    e.preventDefault();

    // Leer ID
    const parmetrosURL = new URLSearchParams(window.location.search);
    const idCliente = parmetrosURL.get('id');

    // Leer los inputs
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();
    const empresa = inputEmpresa.value.trim();

    if(
        nombre === '' ||
        email === '' ||
        telefono === '' ||
        empresa === ''
    ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Clase Cliente
    const cliente = new Cliente({nombre, email, telefono, empresa, id: idCliente});

    // Crear o Actualizar Cliente
    if(!idCliente)
        cliente.crearNuevoCliente();
    else
        cliente.actualizarCliente();
}

export function cargarDatosCliente() {
    const parmetrosURL = new URLSearchParams(window.location.search);
    const idCliente = parmetrosURL.get('id');

    // Obtener Cliente por ID
    Cliente.obtenerCliente(idCliente);
}