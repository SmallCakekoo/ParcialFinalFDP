const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorEmailDisplay = document.querySelector('.erroremail');
const errorPasswordDisplay = document.querySelector('.errorpassword');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    element.innerText = message;
    element.classList.remove('animate__fadeOut');
    element.classList.add('animate__animated', 'animate__fadeIn');
};

const clearError = (element) => {
    element.classList.remove('animate__fadeIn');
    element.classList.add('animate__fadeOut');
};

const clearErrors = () => {
    clearError(errorEmailDisplay);
    clearError(errorPasswordDisplay);
};

const validateInputs = () => {
    clearErrors();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let isValid = true;

    // Obtener la lista de usuarios del localStorage.
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario existe y la contraseña es correcta.
    const user = users.find(user => user.email === emailValue && user.password === passwordValue);

    // Validación del email.
    if (emailValue === '') {
        setError(errorEmailDisplay, 'Correo requerido');
        isValid = false;
    } else if (!user) {
        setError(errorEmailDisplay, 'Correo o contraseña incorrectos');
        isValid = false; // Si no existe el usuario, marca como inválido.
    }

    // Validación de la contraseña.
    if (passwordValue === '') {
        setError(errorPasswordDisplay, 'Contraseña requerida');
        isValid = false;
    } else if (user && passwordValue !== user.password) {
        setError(errorPasswordDisplay, 'Contraseña incorrecta');
        isValid = false; // Si la contraseña no coincide, marca como inválido.
    }

    // Si ambos son válidos, redirige y almacena el estado de sesión.
    if (isValid) {
        localStorage.setItem("usuarioLogueado", 'true'); // Almacena el estado de sesión.
        localStorage.setItem("userEmail", emailValue); // Almacena el correo del usuario logueado.
        window.location.href = "perfil.html"; // Redirige al perfil.
    }
};
