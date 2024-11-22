// Array que almacenará todos los productos.
let products = [];

// Función que convierte los datos de entrada en objetos de tipo Producto y los agrega al array 'products'
function parseDataToProducts() {
    if (!globalData) {
        console.error('No se han cargado los datos aún.');
        return;
    }

    for (let category in globalData) {
        let categoria = globalData[category];
        for (let productData of categoria) {
            let product = new Product(
                productData.id,
                productData.nombre,
                productData.marca,
                productData.precio,
                productData.disponible,
                productData.rating,
                productData.imagen,
                productData.descripcion
            );
            products.push(product);
        }
    }
}

// Función que renderiza todos los productos en el contenedor de la página.
function renderAllProducts() {
    let container = document.getElementById("productos");
    container.innerHTML = ""; 

    products.forEach((product) => {
        container.innerHTML += product.cardHtml();
    });

    // Agregar eventos de clic para productos y corazones.
    container.querySelectorAll(".containermayor").forEach((productElement, index) => {
        // Evento para redirigir a la página de detalle.
        productElement.addEventListener("click", (event) => {
            // Verificar si el clic fue en el corazón o carrito.
            if (!event.target.classList.contains("corazonlogoproducto") && !event.target.classList.contains("carritologoproducto")) {
                productSelected(products[index].id);
            }
        });

        // Evento para manejar "me gusta" en el corazón.
        let heartIcon = productElement.querySelector(".corazonlogoproducto");
        heartIcon.addEventListener("click", (event) => {
            likeProduct(products[index].id, event);
        });
    });

    // Restaurar el estado de los productos "me gusta".
    restoreLikedProducts();
}

// Función que redirige a la página de detalle del producto seleccionado.
function productSelected(id) {
    window.location = `./detalleproducto.html?id=${id}`;
}

// Función para agregar o quitar productos de la lista de "me gusta"
function likeProduct(id, event) {
    event.stopPropagation(); // Evitar propagación al contenedor padre.
    const heartIcon = event.target;

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) {
        window.location.href = 'iniciarseccion.html';
        return; 
    }

    // Alternar clase activa.
    heartIcon.classList.toggle("activo");

    // Gestionar almacenamiento local con la clave específica.
    const correoUsuario = getcorreoUsuario(); 
    const storageKey = `${correoUsuario}_likedProducts`;

    let likedProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (likedProducts.includes(id)) {
        likedProducts = likedProducts.filter((productId) => productId !== id);
    } else {
        likedProducts.push(id);
    }

    localStorage.setItem(storageKey, JSON.stringify(likedProducts));
}

// Función que muestra el estado de los productos "me gusta" previamente guardados.
function restoreLikedProducts() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const correoUsuario = getcorreoUsuario();
        const likedProducts = JSON.parse(localStorage.getItem(`${correoUsuario}_likedProducts`)) || [];
        likedProducts.forEach((id) => {
            const heartIcon = document.querySelector(`.corazonlogoproducto[data-id="${id}"]`);
            if (heartIcon) {
                heartIcon.classList.add("activo");
            }
        });
    }
}

// Función para inicializar la página.
function init() {
    parseDataToProducts();
    renderAllProducts();

    // Manejar búsqueda si está en la URL.
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");
    if (searchTerm) {
        const searchInput = document.getElementById("search-input");
        searchInput.value = searchTerm;

        const filteredProducts = products.filter((product) =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderFilteredProducts(filteredProducts);
    }
}

// Función para renderizar productos filtrados.
function renderFilteredProducts(filteredProducts) {
    let container = document.getElementById("productos");
    let noResultsMessage = document.getElementById("no-results-message");
    container.innerHTML = "";  

    if (filteredProducts.length === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
        filteredProducts.forEach((product) => {
            container.innerHTML += product.cardHtml();
        });

        container.querySelectorAll(".containermayor").forEach((productElement, index) => {
            // Redirigir al detalle del producto.
            productElement.addEventListener("click", (event) => {
                // Verificar si el clic fue en el corazón o carrito.
                if (!event.target.classList.contains("corazonlogoproducto") && !event.target.classList.contains("carritologoproducto")) {
                    productSelected(filteredProducts[index].id);
                }
            });

            // Manejar "me gusta"
            let heartIcon = productElement.querySelector(".corazonlogoproducto");
            heartIcon.addEventListener("click", (event) => {
                likeProduct(filteredProducts[index].id, event);
            });
        });

        // Restaurar el estado de los productos "me gusta"
        restoreLikedProducts();
    }
}

// Esperar a que los datos se carguen antes de inicializar.
document.addEventListener("dataLoaded", init);

// Manejar el input de búsqueda.
document.getElementById("search-input").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm)
    );
    renderFilteredProducts(filteredProducts);
});

// Restaurar productos "me gusta" al cargar la página.
window.onload = restoreLikedProducts;

// Función para obtener el correo del usuario.
function getcorreoUsuario() {
    return localStorage.getItem("userEmail") || "guest";
}
