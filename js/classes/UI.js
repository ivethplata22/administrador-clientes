import { listadoClientes, inputNombre, inputEmail, inputTelefono, inputEmpresa } from '../selectores.js';

class UI {
    constructor() {}

    imprimirAlerta(mensaje, tipo, elemento) {

        this.limpiarAlertas();

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'mensaje-error-success');
        divMensaje.textContent = mensaje;

        if(tipo === 'error')
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        else 
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');

        // Agregar al DOM
        elemento.appendChild(divMensaje);

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

    dibujarCliente(cliente) {
        const { id, nombre, email, telefono, empresa } = cliente;

        listadoClientes.innerHTML += `<tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
        </tr>`;
    }

    llenarFormulario(cliente) {
        const { nombre, email, telefono, empresa } = cliente;

        inputNombre.value = nombre;
        inputEmail.value = email;
        inputTelefono.value = telefono;
        inputEmpresa.value = empresa;
    }
}

export default UI;