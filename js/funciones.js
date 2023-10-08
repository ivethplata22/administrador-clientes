import DB from './classes/DB.js';
import UI from './classes/UI.js';

// Instanciar
export const db = new DB();
export const ui = new UI();

// Funiones Event Listeners
export function validarCLiente(e) {
    e.preventDefault();

    // Leer los inputs
    const nombre = document.querySelector('#nombre').value.trim();
    const email = document.querySelector('#email').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const empresa = document.querySelector('#empresa').value.trim();

    if(
        nombre === '' ||
        email === '' ||
        telefono === '' ||
        empresa === ''
    ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    console.log('Cliente valido');
}