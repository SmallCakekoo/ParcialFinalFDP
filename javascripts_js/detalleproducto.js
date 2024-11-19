// Selecciona el elemento con la clase '.imgproduct' para manipularlo
const imgProduct = document.querySelector('.imgproduct');

// Añade un evento de escucha para el mouseenter (cuando el cursor entra en el área de la imagen del producto)
imgProduct.addEventListener('mouseenter', () => {
    // Elimina la clase 'animate__zoomIn' de la imagen del producto cuando el cursor entra
    imgProduct.classList.remove('animate__zoomIn');
});

// Función para encontrar un producto por su ID
function findProductById(id) {
    // Itera sobre todas las categorías en el objeto 'data'
    for (let category of data) {
        // Busca el producto cuyo 'id' coincida con el valor proporcionado
        let foundProduct = category.find(product => product.id === parseInt(id));
        // Si se encuentra el producto, lo retorna
        if (foundProduct) {
            return foundProduct;
        }
    }
    // Si no se encuentra el producto, retorna null
    return null;
}

// Función para cargar los detalles del producto desde la URL
function loadProductDetails() {
    // Obtiene los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    // Extrae el 'id' del producto desde los parámetros de la URL
    const productId = params.get('id');
    
    console.log("Product ID from URL:", productId); // Muestra el ID del producto en la consola
    
    // Si se proporciona un 'id' de producto en la URL
    if (productId) {
        // Llama a la función para buscar el producto con ese ID
        let product = findProductById(productId);
        
        // Si el producto se encuentra, actualiza los detalles en el HTML
        if (product) {
            document.getElementById('tituloproduct').textContent = product.nombre;
            document.getElementById('descripcionproduct').textContent = product.descripcion;
            document.getElementById('precioproduct').textContent = "$" + product.precio + " COP";
            document.getElementById('imgproduct').src = product.imagen;
        } else {
            console.error("Producto no encontrado"); // Muestra un error si no se encuentra el producto
        }
    } else {
        console.error("No se proporcionó el id del producto en la URL."); // Muestra un error si no se encuentra el ID en la URL
    }
}

// Función para manejar el "me gusta" de un producto
function likeProduct(id, event) {
    // Evita que el evento se propague (para evitar que se active un evento en un contenedor padre)
    event.stopPropagation();

    // Obtiene el botón que fue presionado
    const button = event.currentTarget; 

    // Cambia el estado de "me gusta" (agrega o elimina la clase 'liked')
    button.classList.toggle('liked');

    // Muestra el ID del producto en la consola para depuración
    console.log("Producto ID:", id); 
}

// Llama a la función 'loadProductDetails' cuando la página se ha cargado completamente
window.onload = loadProductDetails;
