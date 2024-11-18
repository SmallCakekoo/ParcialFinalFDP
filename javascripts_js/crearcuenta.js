// Selección de elementos de entrada y errores
const username = document.getElementById('username');
const newEmail = document.getElementById('newEmail');
const newPassword = document.getElementById('newPassword');
const repeatPassword = document.getElementById('repeatPassword');

const errorUsername = document.querySelector('.errorusername');
const errorNewEmail = document.querySelector('.errornewEmail');
const errorNewPassword = document.querySelector('.errornewPassword');
const errorRepeatPassword = document.querySelector('.errorrepeatPassword');

function setError(element, message) {
    element.innerText = message;
    element.classList.remove('animate__fadeOut');
    element.classList.add('animate__animated', 'animate__fadeIn', 'visible');
}

function clearError(element) {
    element.classList.remove('animate__fadeIn');
    element.classList.add('animate__fadeOut');
    element.classList.remove('visible');
}

function clearAllErrors() {
    clearError(errorUsername);
    clearError(errorNewEmail);
    clearError(errorNewPassword);
    clearError(errorRepeatPassword);
}

function createAccount() {
    clearAllErrors(); // Limpia errores antes de validar

    const usernameValue = username.value.trim();
    const emailValue = newEmail.value.trim();
    const passwordValue = newPassword.value.trim();
    const repeatPasswordValue = repeatPassword.value.trim();

    let isValid = true;

    // Validación del nombre de usuario
    if (usernameValue === '') {
        setError(errorUsername, 'Nombre de usuario requerido');
        isValid = false;
    }

    // Validación del email
    if (emailValue === '') {
        setError(errorNewEmail, 'Correo requerido');
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
        setError(errorNewEmail, 'Formato de correo incorrecto');
        isValid = false;
    }

    // Validación de la contraseña
    if (passwordValue === '') {
        setError(errorNewPassword, 'Contraseña requerida');
        isValid = false;
    } else if (passwordValue.length < 6) {
        setError(errorNewPassword, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }

    // Validación de repetición de contraseña
    if (repeatPasswordValue === '') {
        setError(errorRepeatPassword, 'Repetir contraseña es requerido');
        isValid = false;
    } else if (passwordValue !== repeatPasswordValue) {
        setError(errorRepeatPassword, 'Las contraseñas no coinciden');
        isValid = false;
    }

    // Si todas las validaciones pasan, crear cuenta
    if (isValid) {
        // Obtener la lista de usuarios del localStorage o inicializar un array vacío
        let users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Agregar el nuevo usuario al array
        users.push({
            username: usernameValue, // Agrega el nombre de usuario
            email: emailValue,       // Agrega el correo electrónico
            password: passwordValue   // Recuerda que esto no es seguro en una aplicación real
        });
    
        // Guardar el array actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(users));
    
        // Guardar el nombre de usuario y el correo en localStorage
        localStorage.setItem('nombreUsuario', usernameValue);
        localStorage.setItem('correoUsuario', emailValue);
    
        // Guardar estado de sesión
        localStorage.setItem('usuarioLogueado', 'true');
    
        alert("Cuenta creada exitosamente");
        window.location = "perfil.html"; // Redirección después del registro
    }
}
