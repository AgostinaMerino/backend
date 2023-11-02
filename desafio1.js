class ProductManager {
  
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
        if (this.products.length === 0) {
        product.id = 1;
      } else {
        // Autoincremental
        product.id = this.products[this.products.length - 1].id + 1;
      }
  
      this.products.push(product);
    }
  
    getProductById(idProduct) {
      const product = this.products.find((product) => product.id === idProduct);
  
      if (!product) {
        console.error("not found");
      }
      else(this.products)
    }
  }
  
  class product {
    constructor(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    ) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }
  
  //Pruebas
  const manejadorProducts = new ProductManager();
  
  console.log(
    "agregando producto 1"
  );
  manejadorProducts.addProduct(
    new product("Remera", "Remera de hombre, color negro, cuello redondo", 10000, "https://acdn.mitiendanube.com/stores/002/140/898/products/remera-negra-puesta1-31db72ce57958b34ee16511807977199-640-0.webp", 134, 50)
  );
  
  console.log(
    "mostrar productos"
  );
  manejadorProducts.getProducts()
  
  console.log(
    manejadorProducts
  );
  
 console.log(manejadorProducts.getProductById(20));
 console.log(manejadorProducts.getProductById(1));


