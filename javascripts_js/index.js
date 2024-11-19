// Seleccionamos el contenedor de productos en el DOM
const productsContainer = document.querySelector('.products');

// Función que selecciona productos aleatorios de un conjunto de datos
function seleccionarProductosAleatorios(data, cantidad) {
    // Inicializamos un array para almacenar los productos aleatorios seleccionados
    const productosAleatorios = [];
    // Hacemos una copia de los productos disponibles para que no alteremos el array original
    const productosDisponibles = [...data].flat(); 
    
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

// Seleccionamos 4 productos aleatorios de los datos disponibles y los renderizamos
const productosAleatorios = seleccionarProductosAleatorios(data, 4);
renderizarProductos(productosAleatorios);

// Seleccionamos el campo de búsqueda en el DOM
const searchInput = document.getElementById('inputs');
// Añadimos un evento que se dispara cuando el usuario presiona una tecla dentro del campo de búsqueda
searchInput.addEventListener('keydown', function(event) {
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

// Función que maneja la acción de selección de un producto
function productSelected(id) {
    // Redirigimos a la página de detalle del producto, pasando su ID como parámetro
    window.location.href = `./detalleproducto.html?id=${id}`;
}

// Función que maneja la acción de "me gusta" en un producto
function likeProduct(id, event) {
    // Detenemos la propagación del evento para evitar que se dispare algún otro evento relacionado
    event.stopPropagation();

    // Obtenemos el botón donde se hizo clic
    const button = event.currentTarget; 

    // Alternamos la clase 'liked' en el botón para indicar si el producto fue marcado como favorito o no
    button.classList.toggle('liked');

    // Imprimimos en consola el ID del producto al que se le dio "me gusta"
    console.log("Producto ID:", id); 
}
