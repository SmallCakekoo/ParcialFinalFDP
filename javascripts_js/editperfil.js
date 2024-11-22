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

    // Cargar la imagen de perfil desde el Local Storage.
    const savedProfilePicture = localStorage.getItem(`${storedEmail}_profilePicture`);
    const profileImage = document.getElementById('profileImage');
    if (savedProfilePicture) {
        profileImage.src = savedProfilePicture;
        console.log(`Imagen de perfil cargada desde Local Storage con clave: ${storedEmail}_profilePicture`);
    }

    document.querySelector('.btnsave').addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón.

        // Elemento para mensajes de error.
        const errorElement = document.getElementById('error-message'); 
        if (!errorElement) {
            console.error("No se encontró el elemento para mostrar mensajes de error.");
            return;
        }

        const newPassword = newPasswordInput.value;

        // Validar la contraseña.
        if (newPassword && newPassword.length < 6) {
            errorElement.textContent = "La nueva contraseña debe tener al menos 6 caracteres.";
            errorElement.style.color = "rgb(95, 0, 0)";
            return; // No continúa con la lógica de guardado.
        }

        // Limpiar el mensaje de error si la validación pasa.
        errorElement.textContent = "";

        const newVisualEmail = emailInput.value;

        // Actualizar la información del usuario en localStorage sin importar si se guarda uno solo.
        localStorage.setItem(`${storedEmail}_nombreUsuario`, usernameInput.value);
        localStorage.setItem(`${storedEmail}_descripcionUsuario`, descriptionInput.value);
        localStorage.setItem(`${storedEmail}_linkedinUsuario`, linkedinInput.value);
        localStorage.setItem(`${storedEmail}_visualEmail`, newVisualEmail);

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

    // Obtener elementos (esto es para importar la foto de perfil).
    const fileInput = document.getElementById('file-input');

    // Escuchar el cambio del input de archivo.
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            // Cargar la imagen seleccionada.
            reader.onload = function (e) {
                const imageData = e.target.result;
                profileImage.src = imageData;

                // Guardar la imagen en Local Storage por usuario.
                localStorage.setItem(`${storedEmail}_profilePicture`, imageData);
                console.log(`Imagen guardada en Local Storage con clave: ${storedEmail}_profilePicture`);
            };

            reader.readAsDataURL(file);  
        }
    });
});

// Función para cerrar sesión.
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}
