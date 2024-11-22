// Selección de elementos de entrada y errores.
const username = document.getElementById('username'); // Campo de nombre de usuario.
const newEmail = document.getElementById('newEmail'); // Campo de correo electrónico.
const newPassword = document.getElementById('newPassword'); // Campo de contraseña.
const repeatPassword = document.getElementById('repeatPassword'); // Campo de repetir contraseña.

// Selección de elementos donde se mostrarán los mensajes de error.
const errorUsername = document.querySelector('.errorusername');
const errorNewEmail = document.querySelector('.errornewEmail');
const errorNewPassword = document.querySelector('.errornewPassword');
const errorRepeatPassword = document.querySelector('.errorrepeatPassword');

// Función para establecer un mensaje de error en un elemento.
function setError(element, message) {
    element.innerText = message; // Establece el mensaje de error.
    element.classList.remove('animate__fadeOut'); // Elimina la animación de desvanecimiento.
    element.classList.add('animate__animated', 'animate__fadeIn', 'visible'); // Añade animación para mostrar el error.
}

// Función para limpiar el mensaje de error de un elemento.
function clearError(element) {
    element.classList.remove('animate__fadeIn'); // Elimina la animación de aparición.
    element.classList.add('animate__fadeOut'); // Añade animación para desvanecer el error.
    element.classList.remove('visible'); // Remueve la clase visible.
}

// Función para limpiar todos los errores de los campos.
function clearAllErrors() {
    clearError(errorUsername);
    clearError(errorNewEmail);
    clearError(errorNewPassword);
    clearError(errorRepeatPassword);
}

// Función para crear una cuenta.
function createAccount() {
    clearAllErrors(); // Limpia errores antes de iniciar las validaciones.

    // Obtención de valores de los campos de entrada.
    const usernameValue = username.value.trim();
    const emailValue = newEmail.value.trim();
    const passwordValue = newPassword.value.trim();
    const repeatPasswordValue = repeatPassword.value.trim();
    let isValid = true; // Variable para verificar si todos los campos son válidos.

    // Validación del nombre de usuario.
    if (usernameValue === '') {
        setError(errorUsername, 'Nombre de usuario requerido'); // Error si el nombre de usuario está vacío.
        isValid = false; // Marca la validación como fallida.
    }

    // Validación del correo electrónico.
    if (emailValue === '') {
        setError(errorNewEmail, 'Correo requerido'); // Error si el correo está vacío.
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) { // Verifica el formato del correo.
        setError(errorNewEmail, 'Formato de correo incorrecto'); // Error si el formato es incorrecto.
        isValid = false;
    }

    // Validación de la contraseña
    if (passwordValue === '') {
        setError(errorNewPassword, 'Contraseña requerida'); // Error si la contraseña está vacía.
        isValid = false;
    } else if (passwordValue.length < 6) { // Verifica si la contraseña tiene al menos 6 caracteres.
        setError(errorNewPassword, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }

    // Validación de la repetición de la contraseña.
    if (repeatPasswordValue === '') {
        setError(errorRepeatPassword, 'Repetir contraseña es requerido'); // Error si el campo de repetir contraseña está vacío.
        isValid = false;
    } else if (passwordValue !== repeatPasswordValue) { // Verifica si las contraseñas coinciden.
        setError(errorRepeatPassword, 'Las contraseñas no coinciden'); // Error si las contraseñas no coinciden.
        isValid = false;
    }

    // Si todas las validaciones pasan, se crea la cuenta.
    if (isValid) {
        // Obtiene la lista de usuarios almacenados en el localStorage o inicializa un array vacío.
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica si el correo ya está registrado.
        if (users.some(user => user.email === emailValue)) {
            setError(errorNewEmail, 'El correo ya está registrado');
            return;
        }

        // Agrega el nuevo usuario al array.
        users.push({
            username: usernameValue, // Agrega el nombre de usuario.
            email: emailValue,       // Agrega el correo electrónico.
            password: passwordValue  // Nota: no es seguro almacenar contraseñas sin cifrado.
        });

        // Guarda el array actualizado en el localStorage.
        localStorage.setItem('users', JSON.stringify(users));

        // Guarda el nombre de usuario y correo en el localStorage para futuras referencias.
        localStorage.setItem(`${emailValue}_nombreUsuario`, usernameValue);
        localStorage.setItem(`${emailValue}_correoUsuario`, emailValue);

        // Marca al usuario como logueado en el localStorage.
        localStorage.setItem('usuarioLogueado', 'true');
        localStorage.setItem('userEmail', emailValue);

        alert("Cuenta creada exitosamente"); // Muestra un mensaje de éxito.
        window.location = "perfil.html"; // Redirige al perfil del usuario después del registro.
    }
}
