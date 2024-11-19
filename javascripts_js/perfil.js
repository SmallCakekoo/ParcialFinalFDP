document.addEventListener('DOMContentLoaded', () => {
    verificarSesion(); // Verifica la sesión al cargar la página

    // Combina todos los productos de las diferentes categorías en un solo array
    let allProducts = [...tecno, ...materialDibujo, ...papeleria, ...accesoriosComputadora, ...herramientas, ...software, ...impresion3D, ...plantillasOnline];

    // Función para obtener productos aleatorios de un array
    function getRandomProducts(arr, num) {
        let shuffled = arr.sort(() => 0.5 - Math.random()); // Baraja el array de manera aleatoria
        return shuffled.slice(0, num); // Devuelve los primeros 'num' productos
    }

    // Obtiene 16 productos aleatorios de la lista combinada
    let randomProducts = getRandomProducts(allProducts, 16);

    // Selecciona el contenedor de productos en el HTML
    const productsContainer = document.querySelector('.products');

    // Crea una tarjeta HTML para cada producto y la agrega al contenedor
    randomProducts.forEach(productData => {
        const product = new Product(productData.id, productData.nombre, productData.marca, productData.precio, productData.disponible, productData.rating, productData.imagen, productData.descripcion);
        productsContainer.innerHTML += product.cardHtml(); // Agrega la tarjeta del producto al contenedor
    });

    // Actualiza la información del perfil con los datos almacenados en el localStorage
    const usernameDisplay = document.getElementById('usernameDisplay');
    const descripcionDisplay = document.getElementById('descripcionDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const linkedinDisplay = document.getElementById('linkedinDisplay');

    // Obtiene los datos del usuario desde localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const descripcionUsuario = localStorage.getItem('descripcionUsuario');
    const correoUsuario = localStorage.getItem('correoUsuario');
    const linkedinUsuario = localStorage.getItem('linkedinUsuario');

    // Muestra los datos del usuario si existen en localStorage
    if (nombreUsuario) usernameDisplay.innerText = nombreUsuario;
    if (descripcionUsuario) descripcionDisplay.innerText = descripcionUsuario;
    if (correoUsuario) emailDisplay.innerText = correoUsuario;
    if (linkedinUsuario) linkedinDisplay.innerText = linkedinUsuario;
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
