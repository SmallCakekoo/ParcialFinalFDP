class Product {
    constructor(id, nombre, marca, precio, disponible, rating, imagen, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.disponible = disponible;
        this.rating = rating;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

    cardHtml() {
        return `
            <div class="containermayor wow animate__animated animate__fadeInUp" onclick="productSelected(${this.id})">
                <div class="img-container">
                    <img src="${this.imagen}" alt="${this.nombre}" class="imgprod">
                </div>
                <div class="textocardprod">
                    <h2 class="product-title">${this.nombre}</h2>
                    <p class="product-description">${this.descripcion}</p>
                </div>
                <div class="ctaproduct">
                    <div class="precioproduct">$${this.precio} COP</div>
                    <div class="btnproduct">
                      <img class="carritologoproducto btnproductact" src="img/cart2.png" alt="Añadir al carrito">
                      <img class="corazonlogoproducto btnproductact" src="img/love2.png" alt="Añadir a favoritos" onclick="likeProduct(${this.id}, event)">
                    </div>
                </div>
            </div>
        `;
    }
}