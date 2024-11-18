document.addEventListener('DOMContentLoaded', () => {
    const userIconLink = document.getElementById('userIconLink');

    userIconLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace

        const usuarioLogueado = localStorage.getItem('usuarioLogueado');

        // Verifica si el usuario está logueado
        if (usuarioLogueado) {
            // Si está logueado, redirige al perfil
            window.location.href = 'perfil.html';
        } else {
            // Si no está logueado, redirige a la página de inicio de sesión
            window.location.href = 'iniciarseccion.html';
        }
    });
});