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
            <div class="product" onclick="productSelected(${this.id})" style="cursor: pointer">
                <img src="${this.imagen}" alt="${this.nombre}" />
                <div class="details" style="text-decoration: none;">
                    <h3 style="color: black;">${this.nombre}</h3>
                    <p>$${this.precio} COP</p>
                </div>
            </div>
        `;
    }
}
