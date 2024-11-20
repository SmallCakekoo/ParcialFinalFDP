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
            <div class="containermayor wow animate__animated animate__fadeInUp" data-id="${this.id}">
                <div class="img-container">
                    <img src="${this.imagen}" alt="${this.nombre}" class="imgprod">
                </div>
                <div class="textocardprod">
                    <h2 class="product-title">${this.nombre}</h2>
                    <p class="product-description">${this.descripcion}</p>
                </div>
                <div class="ctaproduct">
                    <div class="precioproduct">$${this.precio} COP</div>
                    <div class="btnproduct" data-id="${this.id}"> 
                    <img class="carritologoproducto btnproductact" src="img/cart2.png" alt="Añadir al carrito">
                    <img class="corazonlogoproducto btnproductact" src="img/love2.png" alt="Añadir a favoritos" data-id="${this.id}">
                     </div>
                </div>
            </div>
        `;
    }
}
