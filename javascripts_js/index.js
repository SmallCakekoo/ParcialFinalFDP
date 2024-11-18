// Selecciona el contenedor de productos en el HTML
const productsContainer = document.querySelector('.products');

// Función para seleccionar productos aleatorios
function seleccionarProductosAleatorios(data, cantidad) {
    const productosAleatorios = [];
    const productosDisponibles = [...data].flat(); 
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

// Renderiza productos en el contenedor HTML
function renderizarProductos(productos) {
    const html = productos.map(producto => producto.cardHtml()).join('');
    productsContainer.innerHTML = html;
}

// Selecciona y renderiza productos aleatorios
const productosAleatorios = seleccionarProductosAleatorios(data, 4);
renderizarProductos(productosAleatorios);

// Configuración de búsqueda en el input
const searchInput = document.getElementById('inputs');
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `tienda.html?search=${searchTerm}`;
        }
    }
});

// Redirige a la página de detalles del producto con el ID en la URL
function productSelected(id) {
    window.location.href = `./detalleproducto.html?id=${id}`;
}


function likeProduct(id, event) {
  event.stopPropagation();

  const button = event.currentTarget; // Obtén el botón que se presionó

  // Alternar la clase 'liked'
  button.classList.toggle('liked');

  // Si en algún momento necesitas usar el id, puedes hacerlo aquí
  console.log("Producto ID:", id); // Por ahora, solo para mostrar el id en consola
}





