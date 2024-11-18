let products = [];

function parseDataToProducts() {
    for (let i = 0; i < data.length; i++) {
        let categoria = data[i];
        for (let j = 0; j < categoria.length; j++) {
            let productData = categoria[j];
            let product = new Product(
                productData.id, productData.nombre, productData.marca, productData.precio, productData.disponible, productData.rating, productData.imagen, productData.descripcion);
            products.push(product);
        }
    }
}

function renderAllProducts() {
    let container = document.getElementById("productos");
    container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        container.innerHTML += product.cardHtml();
        let productElement = container.children[i];
        productElement.addEventListener("click", function() {
            productSelected(product.id);
        });
    }
}

function productSelected(id) {
    window.location = "./detalleproducto.html?id=" + id;
}

parseDataToProducts();
renderAllProducts();

let searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function() {
    let searchTerm = searchInput.value.toLowerCase();
    let filteredProducts = products.filter(function(product) {
        return product.nombre.toLowerCase().includes(searchTerm) || product.descripcion.toLowerCase().includes(searchTerm);
    });
    renderFilteredProducts(filteredProducts);
});

function renderFilteredProducts(filteredProducts) {
    let container = document.getElementById("productos");
    let noResultsMessage = document.getElementById("no-results-message");
    container.innerHTML = "";  
    if (filteredProducts.length === 0) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
        for (let i = 0; i < filteredProducts.length; i++) {
            let product = filteredProducts[i];
            container.innerHTML += product.cardHtml();
            let productElement = container.children[i];
            productElement.addEventListener("click", function() {
                productSelected(product.id);
            });
        }
    }
}

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = searchTerm;

    let filteredProducts = products.filter(function(product) {
        return product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    });
    renderFilteredProducts(filteredProducts);
}

function likeProduct(id, event) {
    event.stopPropagation();
  
    const corazon = event.target;
  
    if (corazon.classList.contains('activo')) {
        corazon.classList.remove('activo');
    } else {
        corazon.classList.add('activo');
    }

    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    if (likedProducts.includes(id)) {
        likedProducts.splice(likedProducts.indexOf(id), 1);
    } else {
        likedProducts.push(id);
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

window.onload = function() {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
  
    likedProducts.forEach(id => {
        const corazon = document.querySelector(`.corazonlogoproducto[data-id="${id}"]`);
        if (corazon) {
            corazon.classList.add('activo');
            corazon.style.backgroundColor = 'red';
        }
    });
};
