

document.addEventListener('DOMContentLoaded', function () {
    const fileUpload = document.getElementById('file-upload');
    const fileInput = document.getElementById('file-input');


    fileUpload.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileUpload.style.borderColor = '#333';
    });

    fileUpload.addEventListener('dragleave', function (e) {
        e.preventDefault();
        fileUpload.style.borderColor = '#ccc';
    });

    fileUpload.addEventListener('drop', function (e) {
        e.preventDefault();
        fileUpload.style.borderColor = '#ccc';
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', function () {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            console.log('Archivo seleccionado:', files[i].name);
            // Aquí puedes agregar la lógica para manejar los archivos, como enviarlos al servidor
        }
    }
});