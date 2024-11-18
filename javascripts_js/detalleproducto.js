const imgProduct = document.querySelector('.imgproduct');

imgProduct.addEventListener('mouseenter', () => {
    imgProduct.classList.remove('animate__zoomIn');
});
 

function findProductById(id) {
    for (let category of data) {
        let foundProduct = category.find(product => product.id === parseInt(id));
        if (foundProduct) {
            return foundProduct;
        }
    }
    return null;
}

// Función que ejecuta al cargar la página
function loadProductDetails() {
    // Obtener el parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    console.log("Product ID from URL:", productId);
    
    if (productId) {
        let product = findProductById(productId);
        
        if (product) {
            document.getElementById('tituloproduct').textContent = product.nombre;
            document.getElementById('descripcionproduct').textContent = product.descripcion;
            document.getElementById('precioproduct').textContent = "$" + product.precio + " COP";
            document.getElementById('imgproduct').src = product.imagen;
        } else {
            console.error("Producto no encontrado");
        }
    } else {
        console.error("No se proporcionó el id del producto en la URL.");
    }
}


function likeProduct(id, event) {
    event.stopPropagation();

    const button = event.currentTarget; // Obtén el botón que se presionó

    // Alternar la clase 'liked'
    button.classList.toggle('liked');

    // Si en algún momento necesitas usar el id, puedes hacerlo aquí
    console.log("Producto ID:", id); // Por ahora, solo para mostrar el id en consola
}


window.onload = loadProductDetails;


