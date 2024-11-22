// Esta es una vaina extra que puse.
// Se ejecuta cuando el contenido de la página ha cargado completamente.
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos de carga de archivo
    const fileUpload = document.getElementById('file-upload');
    const fileInput = document.getElementById('file-input');

    // Evento que se dispara cuando el usuario arrastra un archivo sobre el área de carga.
    fileUpload.addEventListener('dragover', function (e) {
        e.preventDefault(); // Prevenir la acción predeterminada del navegador.
        fileUpload.style.borderColor = '#333'; // Cambiar el color del borde cuando el archivo está siendo arrastrado.
    });

    // Evento que se dispara cuando el archivo deja de estar sobre el área de carga.
    fileUpload.addEventListener('dragleave', function (e) {
        e.preventDefault(); // Prevenir la acción predeterminada del navegador.
        fileUpload.style.borderColor = '#ccc'; // Restaurar el color del borde.
    });

    // Evento que se dispara cuando el archivo es soltado sobre el área de carga.
    fileUpload.addEventListener('drop', function (e) {
        e.preventDefault(); // Prevenir la acción predeterminada del navegador.
        fileUpload.style.borderColor = '#ccc'; // Restaurar el color del borde.
        const files = e.dataTransfer.files; // Obtener los archivos que se soltaron.
        handleFiles(files); // Llamar a la función para manejar los archivos.
    });

    // Evento que se dispara cuando el usuario selecciona un archivo mediante el input.
    fileInput.addEventListener('change', function () {
        const files = fileInput.files; // Obtener los archivos seleccionados.
        handleFiles(files); // Llamar a la función para manejar los archivos.
    });

    // Función para manejar los archivos seleccionados o soltados.
    function handleFiles(files) {
        // Iterar sobre los archivos seleccionados o soltados.
        for (let i = 0; i < files.length; i++) {
            console.log('Archivo seleccionado:', files[i].name); // Mostrar el nombre de cada archivo en la consola.
        }
    }
});
