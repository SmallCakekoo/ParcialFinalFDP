// Seleccionamos el contenedor de productos en el DOM.
const productsContainer = document.querySelector('.products');

// Función que selecciona productos aleatorios de un conjunto de datos.
function seleccionarProductosAleatorios(data, cantidad) {
    const productosAleatorios = [];
    const productosDisponibles = Object.values(data).flat();

    for (let i = 0; i < cantidad; i++) {
        const indice = Math.floor(Math.random() * productosDisponibles.length);
        const producto = productosDisponibles.splice(indice, 1)[0];
        productosAleatorios.push(new Product(
            producto.id,
            producto.nombre,
            producto.marca,
            producto.precio,
            producto.disponible,
            producto.rating,
            producto.imagen,
            producto.descripcion
        ));
    }
    return productosAleatorios;
}

// Función para renderizar los productos seleccionados en el contenedor HTML.
function renderizarProductos(productos) {
    const html = productos.map(producto => producto.cardHtml()).join('');
    productsContainer.innerHTML = html;
}

// Función que maneja la acción de selección de un producto.
function productSelected(id) {
    window.location.href = `./detalleproducto.html?id=${id}`;
}

// Función que maneja la acción de "me gusta" en un producto.
function likeProduct(id, event) {
    event.stopPropagation();
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const correoUsuario = localStorage.getItem('userEmail');
    if (!usuarioLogueado || !correoUsuario) {
        window.location.href = 'iniciarseccion.html';
        return;
    }
   
    const button = event.currentTarget;
    button.classList.toggle('liked');
    const likedProducts = JSON.parse(localStorage.getItem(`${correoUsuario}_likedProducts`)) || [];
   
    if (button.classList.contains('liked')) {
        if (!likedProducts.includes(id)) {
            likedProducts.push(id);  
        }
    } else {
        const index = likedProducts.indexOf(id);
        if (index > -1) {
            likedProducts.splice(index, 1);  
        }
    }
   
    localStorage.setItem(`${correoUsuario}_likedProducts`, JSON.stringify(likedProducts));
}

// Función para inicializar el estado de los botones de "me gusta"
function initializeLikedButtons() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const correoUsuario = localStorage.getItem('userEmail');
    if (usuarioLogueado && correoUsuario) {
        const likedProducts = JSON.parse(localStorage.getItem(`${correoUsuario}_likedProducts`)) || [];
        const likeButtons = document.querySelectorAll('.like-button');
       
        likeButtons.forEach(button => {
            const productId = parseInt(button.getAttribute('data-id'));
            if (likedProducts.includes(productId)) {
                button.classList.add('liked');
            }
        });
    }
}

// Llamar a la función al cargar los datos.
document.addEventListener('dataLoaded', () => {
    const productosAleatorios = seleccionarProductosAleatorios(globalData, 4);
    renderizarProductos(productosAleatorios);
    initializeLikedButtons();
});

// Seleccionamos el campo de búsqueda en el DOM.
const searchInput = document.getElementById('inputs');
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `tienda.html?search=${searchTerm}`;
        }
    }
});
