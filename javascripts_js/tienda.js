// Array que almacenará todos los productos
let products = [];

// Función que convierte los datos de entrada en objetos de tipo Producto y los agrega al array 'products'
function parseDataToProducts() {
    // Iterar sobre las categorías de productos
    for (let i = 0; i < data.length; i++) {
        let categoria = data[i];
        // Iterar sobre los productos dentro de cada categoría
        for (let j = 0; j < categoria.length; j++) {
            let productData = categoria[j];
            // Crear un nuevo objeto Producto y agregarlo al array 'products'
            let product = new Product(
                productData.id, productData.nombre, productData.marca, productData.precio, productData.disponible, productData.rating, productData.imagen, productData.descripcion);
            products.push(product);
        }
    }
}

// Función que renderiza todos los productos en el contenedor de la página
function renderAllProducts() {
    // Obtener el contenedor de productos
    let container = document.getElementById("productos");
    container.innerHTML = "";  // Limpiar el contenedor antes de agregar los nuevos productos

    // Iterar sobre el array de productos y renderizarlos en la página
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        // Agregar el HTML de cada producto al contenedor
        container.innerHTML += product.cardHtml();
        // Agregar un evento de clic al elemento del producto
        let productElement = container.children[i];
        productElement.addEventListener("click", function() {
            // Redirigir a la página de detalle del producto cuando se hace clic
            productSelected(product.id);
        });
    }
}

// Función que redirige a la página de detalle del producto seleccionado
function productSelected(id) {
    window.location = "./detalleproducto.html?id=" + id;
}

// Ejecutar la función para convertir los datos a productos y renderizarlos
parseDataToProducts();
renderAllProducts();

// Obtener el campo de búsqueda y agregar un evento para filtrar productos a medida que se escribe
let searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function() {
    let searchTerm = searchInput.value.toLowerCase();
    // Filtrar los productos que coinciden con el término de búsqueda
    let filteredProducts = products.filter(function(product) {
        return product.nombre.toLowerCase().includes(searchTerm) || product.descripcion.toLowerCase().includes(searchTerm);
    });
    renderFilteredProducts(filteredProducts);  // Mostrar los productos filtrados
});

// Función para renderizar los productos filtrados
function renderFilteredProducts(filteredProducts) {
    let container = document.getElementById("productos");
    let noResultsMessage = document.getElementById("no-results-message");
    container.innerHTML = "";  // Limpiar el contenedor de productos

    // Mostrar un mensaje si no hay productos que coincidan con la búsqueda
    if (filteredProducts.length === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
        // Renderizar los productos filtrados
        for (let i = 0; i < filteredProducts.length; i++) {
            let product = filteredProducts[i];
            container.innerHTML += product.cardHtml();
            let productElement = container.children[i];
            productElement.addEventListener("click", function() {
                productSelected(product.id);  // Redirigir a la página de detalle al hacer clic
            });
        }
    }
}

// Verificar si hay un término de búsqueda en la URL y filtrarlo
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = searchTerm;

    // Filtrar los productos según el término de búsqueda en la URL
    let filteredProducts = products.filter(function(product) {
        return product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    });
    renderFilteredProducts(filteredProducts);
}

// Función para agregar o quitar productos de la lista de "me gusta"
function likeProduct(id, event) {
    event.stopPropagation();  // Prevenir que el evento de clic se propague

    const corazon = event.target;

    // Alternar la clase 'activo' para el ícono de corazón
    if (corazon.classList.contains('activo')) {
        corazon.classList.remove('activo');
    } else {
        corazon.classList.add('activo');
    }

    // Obtener los productos que el usuario ha marcado como "me gusta" desde el almacenamiento local
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    if (likedProducts.includes(id)) {
        likedProducts.splice(likedProducts.indexOf(id), 1);  // Quitar de la lista de "me gusta"
    } else {
        likedProducts.push(id);  // Agregar a la lista de "me gusta"
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));  // Guardar la lista de "me gusta" en el almacenamiento local
}

// Función que se ejecuta al cargar la página para mostrar los productos "me gusta" previamente guardados
window.onload = function() {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
  
    likedProducts.forEach(id => {
        const corazon = document.querySelector(`.corazonlogoproducto[data-id="${id}"]`);
        if (corazon) {
            corazon.classList.add('activo');
            corazon.style.backgroundColor = 'red';  // Cambiar color de corazón a rojo si está marcado como "me gusta"
        }
    });
};
