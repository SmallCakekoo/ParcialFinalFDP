// Declaración de una variable global para almacenar los datos obtenidos desde la API.
let globalData = null;

// Función asíncrona para obtener datos de una URL específica.
async function getData() {
    try {
        // Realiza una solicitud.
        const response = await fetch('https://raw.githubusercontent.com/SmallCakekoo/ParcialFinalFDP/refs/heads/main/javascripts_js/data.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Arroja un error si hay problemas con la red o el gitHub.
        }

        // Convierte la respuesta en un objeto JSON y lo almacena en la globalData.
        globalData = await response.json();

        // Despacha el 'dataLoaded' para notificar que los datos se han cargado.
        document.dispatchEvent(new Event('dataLoaded'));
    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre algún problema.
        console.error('Pailas con el fetch:', error);
    }
}

// Llama a la función getData para iniciar el proceso de obtención de datos y almacenamiento en globalData.
getData();
