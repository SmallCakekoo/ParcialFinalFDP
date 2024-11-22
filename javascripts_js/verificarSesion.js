document.addEventListener('DOMContentLoaded', () => {
    const userIconLink = document.getElementById('userIconLink');
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const correoUsuario = localStorage.getItem('userEmail');
    if (usuarioLogueado && correoUsuario) {
        const userLikes = JSON.parse(localStorage.getItem(`${correoUsuario}_likedProducts`)) || [];
        const heartIcons = document.querySelectorAll('.corazonlogoproducto');
        heartIcons.forEach(heartIcon => {
            const productId = heartIcon.dataset.productId;
            if (userLikes.includes(parseInt(productId))) {
                heartIcon.classList.add('activo');
            } else {
                heartIcon.classList.remove('activo');
            }
        });
    } else {
        // Si no hay usuario logueado, limpia los estilos de los íconos "activo"
        const heartIcons = document.querySelectorAll('.corazonlogoproducto');
        heartIcons.forEach(heartIcon => {
            heartIcon.classList.remove('activo');
        });
    }
    // Maneja el clic en el icono de usuario.
    userIconLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace.
        if (usuarioLogueado) {
            // Si está logueado, redirige al perfil.
            window.location.href = 'perfil.html';
        } else {
            // Si no está logueado, redirige a la página de inicio de sesión.
            window.location.href = 'iniciarseccion.html';
        }
    });
});


// Este documentos se inicia al comienzo de los HTML y en perfil.js debe ser llamado.