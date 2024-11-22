document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('username');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');
    const linkedinInput = document.getElementById('linkedin');
    const newPasswordInput = document.getElementById('new-password'); 

    const storedEmail = localStorage.getItem('userEmail');
    const storedUsername = localStorage.getItem(`${storedEmail}_nombreUsuario`);
    const storedDescription = localStorage.getItem(`${storedEmail}_descripcionUsuario`);
    const storedLinkedin = localStorage.getItem(`${storedEmail}_linkedinUsuario`);
    const visualEmail = localStorage.getItem(`${storedEmail}_visualEmail`);

    if (storedUsername) usernameInput.value = storedUsername;
    if (storedDescription) descriptionInput.value = storedDescription;
    if (storedEmail) emailInput.value = visualEmail || storedEmail;
    if (storedLinkedin) linkedinInput.value = storedLinkedin;

    document.querySelector('.btnsave').addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón

        const errorElement = document.getElementById('error-message'); // Elemento para mensajes de error
        if (!errorElement) {
            console.error("No se encontró el elemento para mostrar mensajes de error.");
            return;
        }

        const newPassword = newPasswordInput.value;

        // Validar la contraseña
        if (newPassword && newPassword.length < 6) {
            errorElement.textContent = "La nueva contraseña debe tener al menos 6 caracteres.";
            errorElement.style.color = "rgb(95, 0, 0)";
            return; // No continúa con la lógica de guardado
        }

        // Limpiar el mensaje de error si la validación pasa
        errorElement.textContent = "";

        localStorage.setItem(`${storedEmail}_nombreUsuario`, usernameInput.value);
        localStorage.setItem(`${storedEmail}_descripcionUsuario`, descriptionInput.value);
        localStorage.setItem(`${storedEmail}_linkedinUsuario`, linkedinInput.value);
        localStorage.setItem(`${storedEmail}_visualEmail`, emailInput.value);

        if (newPassword) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === storedEmail);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }

        alert("Cambios guardados exitosamente.");
        window.location.href = "perfil.html";
    });
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}
