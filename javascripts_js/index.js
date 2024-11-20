// Seleccionamos el contenedor de productos en el DOM
const productsContainer = document.querySelector('.products');

// Función que selecciona productos aleatorios de un conjunto de datos
function seleccionarProductosAleatorios(data, cantidad) {
    // Inicializamos un array para almacenar los productos aleatorios seleccionados
    const productosAleatorios = [];
    // Hacemos una copia de los productos disponibles para que no alteremos el array original
    const productosDisponibles = Object.values(data).flat();

    // Iteramos para seleccionar la cantidad deseada de productos aleatorios
    for (let i = 0; i < cantidad; i++) {
        // Seleccionamos un índice aleatorio dentro de los productos disponibles
        const indice = Math.floor(Math.random() * productosDisponibles.length);
        // Extraemos el producto correspondiente al índice aleatorio seleccionado
        const producto = productosDisponibles.splice(indice, 1)[0];

        // Creamos un nuevo objeto Producto con las propiedades del producto seleccionado
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
    // Retornamos el array de productos aleatorios
    return productosAleatorios;
}

// Función para renderizar los productos seleccionados en el contenedor HTML
function renderizarProductos(productos) {
    // Generamos el HTML de las tarjetas de productos usando el método cardHtml() de cada producto
    const html = productos.map(producto => producto.cardHtml()).join('');
    // Insertamos el HTML generado en el contenedor de productos
    productsContainer.innerHTML = html;
}

// Función que maneja la acción de selección de un producto
function productSelected(id) {
    // Redirigimos a la página de detalle del producto, pasando su ID como parámetro
    window.location.href = `./detalleproducto.html?id=${id}`;
}

// Función que maneja la acción de "me gusta" en un producto
function likeProduct(id, event) {
    event.stopPropagation();
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) {
        window.location.href = 'iniciarseccion.html';
        return; 
    }
    
    const button = event.currentTarget; 
    button.classList.toggle('liked');
    const userEmail = localStorage.getItem('userEmail');
    const likedProducts = JSON.parse(localStorage.getItem(`${userEmail}_likedProducts`)) || [];
    
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
    
    localStorage.setItem(`${userEmail}_likedProducts`, JSON.stringify(likedProducts));
    console.log("Producto ID:", id); 
}

// Nueva función para inicializar el estado de los botones de "me gusta"
function initializeLikedButtons() {
    const userEmail = localStorage.getItem('userEmail');
    const likedProducts = JSON.parse(localStorage.getItem(`${userEmail}_likedProducts`)) || [];
    
    // Obtener todos los botones de "me gusta" en la página
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
        const productId = parseInt(button.getAttribute('data-id')); // Suponiendo que cada botón tiene un atributo data-id con el ID del producto
        if (likedProducts.includes(productId)) {
            button.classList.add('liked'); // Agregar la clase 'liked' si el producto está en la lista de favoritos
        }
    });
}

// Llamar a la función al cargar los datos
document.addEventListener('dataLoaded', () => {
    const productosAleatorios = seleccionarProductosAleatorios(globalData, 4);
    renderizarProductos(productosAleatorios);
    initializeLikedButtons(); // Inicializar los botones de "me gusta"
});


// Seleccionamos el campo de búsqueda en el DOM
const searchInput = document.getElementById('inputs');
// Añadimos un evento que se dispara cuando el usuario presiona una tecla dentro del campo de búsqueda
searchInput.addEventListener('keydown', function (event) {
    // Si la tecla presionada es 'Enter'
    if (event.key === 'Enter') {
        // Obtenemos el término de búsqueda ingresado por el usuario
        const searchTerm = searchInput.value.trim();
        // Si el término de búsqueda no está vacío, redirigimos a la página de tienda con el término como parámetro
        if (searchTerm) {
            window.location.href = `tienda.html?search=${searchTerm}`;
        }
    }
});
