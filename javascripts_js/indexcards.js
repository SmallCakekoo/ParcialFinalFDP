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
            <div class="col-md-3 col-sm-6 d-flex justify-content-center mb-4 wow animate__animated animate__fadeIn">
                <div class="product-card" style="cursor: pointer;" onclick="productSelected(${this.id})">
                    <div class="product-image">
                        <img src="${this.imagen}" alt="${this.nombre}" height="160" width="160">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${this.nombre}</div>
                        <div class="product-price">$${this.precio} COP</div>
                        <div class="product-buttons">
                            <button class="like-button" data-id="${this.id}" onclick="likeProduct(${this.id}, event)">
    <img src="img/love2.png" alt="Me gusta" class="like-icon"> Me gusta
</button>
                            <button class="cart-button">
                                <img src="img/cart2.png" alt="Añadir al Carrito" class="cart-icon"> Comprar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }    
}
