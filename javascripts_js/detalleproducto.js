// Selecciona el elemento con la clase '.imgproduct' para manipularlo
const imgProduct = document.querySelector('.imgproduct');

if (imgProduct) {
    // Añade un evento de escucha para el mouseenter (cuando el cursor entra en el área de la imagen del producto)
    imgProduct.addEventListener('mouseenter', () => {
        // Elimina la clase 'animate__zoomIn' de la imagen del producto cuando el cursor entra
        imgProduct.classList.remove('animate__zoomIn');
    });
} else {
    console.error('Elemento .imgproduct no encontrado');
}

// Función para encontrar un producto por su ID
function findProductById(id) {
    if (!globalData || typeof globalData !== 'object') {
        console.error('globalData no está disponible o no es un objeto');
        return null;
    }

    // Itera sobre todas las categorías en el objeto 'globalData'
    for (let categoryKey in globalData) {
        if (globalData.hasOwnProperty(categoryKey)) {
            let category = globalData[categoryKey];
            // Busca el producto cuyo 'id' coincida con el valor proporcionado
            let foundProduct = category.find(product => product.id === parseInt(id));
            // Si se encuentra el producto, lo retorna
            if (foundProduct) {
                return foundProduct;
            }
        }
    }
    // Si no se encuentra el producto, retorna null
    return null;
}

function createProductButtons(productId) {
    const container = document.getElementById('productButtonsContainer');
    if (container) {
        container.innerHTML = `
            <button class="btncomprar wow animate__animated animate__jello">Comprar</button>
            <button class="btnadf like-button" data-product-id="${productId}" id="likeButton_${productId}" onclick="likeProduct(event)">
                <img class="likeimg" src="img/love.png" alt="Like">
                Me gusta
            </button>
        `;
    } else {
        console.error('Contenedor de botones no encontrado');
    }
}

// Función para cargar los detalles del producto desde la URL
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        let product = findProductById(productId);

        if (product) {
            document.getElementById('tituloproduct').textContent = product.nombre;
            document.getElementById('descripcionproduct').textContent = product.descripcion;
            document.getElementById('precioproduct').textContent = "$" + product.precio + " COP";
            document.getElementById('imgproduct').src = product.imagen;

            // Crear los botones dinámicamente
            createProductButtons(productId);

            // Verificar si el producto está en la lista de productos "me gusta"
            const userEmail = getUserEmail();
            let likedProducts = JSON.parse(localStorage.getItem(`${userEmail}_likedProducts`)) || [];
            
            const likeButton = document.getElementById(`likeButton_${productId}`);
            if (likeButton && likedProducts.includes(parseInt(productId))) {
                likeButton.classList.add('liked'); // Activar el botón si el producto está en la lista
            }
        } else {
            console.error("Producto no encontrado");
        }
    } else {
        console.error("No se proporcionó el id del producto en la URL.");
    }
}

// Función para manejar el "me gusta" de un producto
function likeProduct(event) {
    const button = event.currentTarget; // Obtener el botón que se hizo clic
    const productId = button.getAttribute('data-product-id'); // Recuperar el productId desde el atributo data-*

    // Evitar que el evento se propague
    event.stopPropagation();

    // Alternar la clase 'liked' para cambiar el estado visual del botón (fondo rojo)
    button.classList.toggle('liked');

    // Obtener el email del usuario
    const userEmail = getUserEmail();

    // Obtener la lista de productos "me gusta" del localStorage
    let likedProducts = JSON.parse(localStorage.getItem(`${userEmail}_likedProducts`)) || [];

    // Si el botón tiene la clase 'liked', agregar el producto a la lista de "me gusta"
    if (button.classList.contains('liked')) {
        // Agregar el producto a la lista de productos "me gusta"
        likedProducts.push(parseInt(productId));
    } else {
        // Si el botón no tiene la clase 'liked', eliminar el producto de la lista
        likedProducts = likedProducts.filter(id => id !== parseInt(productId));
    }

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem(`${userEmail}_likedProducts`, JSON.stringify(likedProducts));
}

// Función para obtener el correo del usuario desde el localStorage
function getUserEmail() {
    return localStorage.getItem("userEmail") || "guest"; // Si no hay email, devuelve "guest"
}

// Espera a que los datos estén listos antes de cargar los detalles del producto
document.addEventListener('dataLoaded', loadProductDetails);
