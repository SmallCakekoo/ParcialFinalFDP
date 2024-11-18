document.addEventListener("DOMContentLoaded", function() {
    // Selección de elementos del formulario de edición
    const usernameInput = document.getElementById('username');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');
    const linkedinInput = document.getElementById('linkedin');

    // Cargar datos desde el localStorage al cargar la página
    const storedUsername = localStorage.getItem('nombreUsuario');
    const storedDescription = localStorage.getItem('descripcionUsuario');
    const storedEmail = localStorage.getItem('correoUsuario');
    const storedLinkedin = localStorage.getItem('linkedinUsuario');

    if (storedUsername) usernameInput.value = storedUsername;
    if (storedDescription) descriptionInput.value = storedDescription;
    if (storedEmail) emailInput.value = storedEmail;
    if (storedLinkedin) linkedinInput.value = storedLinkedin;

    // Guardar cambios en el localStorage cuando se hace clic en el botón "Guardar cambios"
    document.querySelector('.btnsave').addEventListener('click', function() {
        localStorage.setItem('nombreUsuario', usernameInput.value);
        localStorage.setItem('descripcionUsuario', descriptionInput.value);
        localStorage.setItem('correoUsuario', emailInput.value);
        localStorage.setItem('linkedinUsuario', linkedinInput.value);
        
        alert("Cambios guardados exitosamente.");
        window.location.href = "perfil.html"; // Redirigir a la página de perfil después de guardar
    });
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado'); // Elimina el indicador de sesión
    window.location.href = 'index.html'; // Redirige a la página principal
}
