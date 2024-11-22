document.addEventListener('DOMContentLoaded', () => {
    verificarSesion(); // Verifica la sesión al cargar la página

    // Espera a que los datos se carguen antes de continuar
    document.addEventListener('dataLoaded', () => {
        // Obtiene el email del usuario
        const correoUsuario = getUserEmail();
        const storageKey = `${correoUsuario}_likedProducts`;

        // Obtiene los productos "liked" desde el localStorage
        const likedProductIds = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Combina todos los productos de las diferentes categorías en un solo array
        let allProducts = [];
        for (let category in globalData) {
            allProducts = allProducts.concat(globalData[category]);
        }

        // Filtra los productos "liked" por ID
        const likedProducts = allProducts.filter(product => likedProductIds.includes(product.id));

        // Selecciona el contenedor de productos en el HTML
        const productsContainer = document.querySelector('.products');

        // Crea una tarjeta HTML para cada producto "liked" y la agrega al contenedor
        likedProducts.forEach(productData => {
            const product = new Product(
                productData.id,
                productData.nombre,
                productData.marca,
                productData.precio,
                productData.disponible,
                productData.rating,
                productData.imagen,
                productData.descripcion
            );
            productsContainer.innerHTML += product.cardHtml(); // Agrega la tarjeta del producto al contenedor
        });

        // Actualiza la información del perfil con los datos almacenados en el localStorage
        const usernameDisplay = document.getElementById('usernameDisplay');
        const descripcionDisplay = document.getElementById('descripcionDisplay');
        const emailDisplay = document.getElementById('emailDisplay');
        const linkedinDisplay = document.getElementById('linkedinDisplay');

        // Obtiene los datos del usuario desde localStorage
        const nombreUsuario = localStorage.getItem(`${correoUsuario}_nombreUsuario`);
        const descripcionUsuario = localStorage.getItem(`${correoUsuario}_descripcionUsuario`);
        const linkedinUsuario = localStorage.getItem(`${correoUsuario}_linkedinUsuario`);

        // Muestra los datos del usuario si existen en localStorage
        if (nombreUsuario) usernameDisplay.innerText = nombreUsuario;
        if (descripcionUsuario) descripcionDisplay.innerText = descripcionUsuario;
        if (correoUsuario) emailDisplay.innerText = correoUsuario;
        if (linkedinUsuario) linkedinDisplay.innerText = linkedinUsuario;
    });
});

// Función que redirige a la página de detalles del producto al hacer clic
function productSelected(id) {
    window.location.href = `./detalleproducto.html?id=${id}`; // Redirige a la página de detalles del producto con el id en la URL
}

// Función que verifica si el usuario está logueado
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    // Si el usuario no está logueado y está en la página de perfil
    if (!usuarioLogueado) {
        window.location.href = 'iniciarsesion.html'; // Redirige a la página de inicio de sesión si no está logueado
    }
}

// Función para obtener el email del usuario (debes implementar esta función según tu lógica)
function getUserEmail() {
    return localStorage.getItem('userEmail'); // Ejemplo: obtener el email del localStorage
}

function closeSection() {
    const correoUsuario = localStorage.getItem('userEmail');
    if (correoUsuario) {
        localStorage.removeItem(`${correoUsuario}_likedProducts`);
        console.log(`Se han eliminado los productos "me gusta" para el usuario: ${correoUsuario}`);
    }
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}
