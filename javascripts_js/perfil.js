document.addEventListener('DOMContentLoaded', () => {
    verificarSesion(); // Verifica la sesión al cargar la página

    let allProducts = [...tecno, ...materialDibujo, ...papeleria, ...accesoriosComputadora, ...herramientas, ...software, ...impresion3D, ...plantillasOnline];

    function getRandomProducts(arr, num) {
        let shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    let randomProducts = getRandomProducts(allProducts, 16);
    const productsContainer = document.querySelector('.products');

    randomProducts.forEach(productData => {
        const product = new Product(productData.id, productData.nombre, productData.marca, productData.precio, productData.disponible, productData.rating, productData.imagen, productData.descripcion);
        productsContainer.innerHTML += product.cardHtml();
    });

    // Actualizar información de perfil
    const usernameDisplay = document.getElementById('usernameDisplay');
    const descripcionDisplay = document.getElementById('descripcionDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const linkedinDisplay = document.getElementById('linkedinDisplay');

    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const descripcionUsuario = localStorage.getItem('descripcionUsuario');
    const correoUsuario = localStorage.getItem('correoUsuario');
    const linkedinUsuario = localStorage.getItem('linkedinUsuario');

    if (nombreUsuario) usernameDisplay.innerText = nombreUsuario;
    if (descripcionUsuario) descripcionDisplay.innerText = descripcionUsuario;
    if (correoUsuario) emailDisplay.innerText = correoUsuario;
    if (linkedinUsuario) linkedinDisplay.innerText = linkedinUsuario;
});

function productSelected(id) {
    window.location.href = `./detalleproducto.html?id=${id}`;
}

function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    // Si el usuario no está logueado y está en la página de perfil
    if (!usuarioLogueado) {
        window.location.href = 'iniciarsesion.html'; // Redirige a la página de inicio de sesión
    }
}
