document.addEventListener('DOMContentLoaded', () => {
    verificarSesion(); // Verifica la sesión al cargar la página.

    // Espera a que los datos se carguen antes de continuar.
    document.addEventListener('dataLoaded', () => {
        // Obtiene el email del usuario.
        const correoUsuario = getUserEmail();
        const storageKey = `${correoUsuario}_likedProducts`;

        // Obtiene los productos "liked" desde el localStorage.
        const likedProductIds = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Combina todos los productos de las diferentes categorías en un solo array.
        let allProducts = [];
        for (let category in globalData) {
            allProducts = allProducts.concat(globalData[category]);
        }

        // Filtra los productos "liked" por ID.
        const likedProducts = allProducts.filter(product => likedProductIds.includes(product.id));

        // Selecciona el contenedor de productos en el HTML.
        const productsContainer = document.querySelector('.products');

        // Crea una tarjeta HTML para cada producto "liked" y la agrega al contenedor.
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
            productsContainer.innerHTML += product.cardHtml(); // Agrega la tarjeta del producto al contenedor.
        });

        // Actualiza la información del perfil con los datos almacenados en el localStorage.
        const usernameDisplay = document.getElementById('usernameDisplay');
        const descripcionDisplay = document.getElementById('descripcionDisplay');
        const emailDisplay = document.getElementById('emailDisplay');
        const linkedinDisplay = document.getElementById('linkedinDisplay');

        // Obtiene los datos del usuario desde localStorage.
        const nombreUsuario = localStorage.getItem(`${correoUsuario}_nombreUsuario`);
        const descripcionUsuario = localStorage.getItem(`${correoUsuario}_descripcionUsuario`);
        const linkedinUsuario = localStorage.getItem(`${correoUsuario}_linkedinUsuario`);
        const visualEmail = localStorage.getItem(`${correoUsuario}_visualEmail`);

        // Muestra los datos del usuario si existen en localStorage.
        if (nombreUsuario) usernameDisplay.innerText = nombreUsuario;
        if (descripcionUsuario) descripcionDisplay.innerText = descripcionUsuario;
        if (correoUsuario) emailDisplay.innerText = visualEmail || correoUsuario;
        if (linkedinUsuario) linkedinDisplay.innerText = linkedinUsuario;

        // Cargar la imagen de perfil desde el Local Storage.
        const savedProfilePicture = localStorage.getItem(`${correoUsuario}_profilePicture`);
        const profilePicture = document.getElementById('profilePicture');
        if (savedProfilePicture) {
            profilePicture.src = savedProfilePicture;  
        }
    });
});

// Función que redirige a la página de detalles del producto al hacer clic.
function productSelected(id) {
    window.location.href = `./detalleproducto.html?id=${id}`; 
}

// Función que verifica si el usuario está logueado
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    // Si el usuario no está logueado y está en la página de perfil.
    if (!usuarioLogueado) {
        window.location.href = 'iniciarsesion.html'; // Redirige a la página de inicio de sesión si no está logueado, creo q repetí esto.
    }
}

// Función para obtener el email del usuario.
function getUserEmail() {
    return localStorage.getItem('userEmail'); 
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



// JavaScript para verificar productos likeados.
document.addEventListener('DOMContentLoaded', function() {
  const correoUsuario = localStorage.getItem('userEmail');
    const likedProductsKey = `${correoUsuario}_likedProducts`;
    const likedProducts = JSON.parse(localStorage.getItem(likedProductsKey)) || [];

    const productsContainer = document.querySelector('.contenedorlikeados');

    if (likedProducts.length === 0) {
        productsContainer.innerHTML = `
            <p>No tienes productos likeados.</p>
            <a href="tienda.html">¿Quieres ver o añadir productos? Presiona aquí</a>
        `;
    }
});