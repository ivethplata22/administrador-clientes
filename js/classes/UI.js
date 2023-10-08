import { formulario } from '../selectores.js';

class UI {
    constructor() {}

    imprimirAlerta(mensaje, tipo) {

        this.limpiarAlertas();

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'mensaje-error-success');
        divMensaje.textContent = mensaje;

        if(tipo === 'error')
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        else 
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');

        // Agregar al DOM
        formulario.appendChild(divMensaje);

        // Eliminar Alerta despues de 2 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);

    }

    limpiarAlertas() {
        const mensajes = document.querySelectorAll('.mensaje-error-success');

        for(const mensaje of mensajes) {
            mensaje.remove();
        }
    }
}

export default UI;