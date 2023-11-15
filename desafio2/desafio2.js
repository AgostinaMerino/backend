const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(path)) {
      try {
        let products = fs.readFileSync(path, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }


  validate(product) {
    if (!product.id || !product.title || !product.code) {
      return false;
    }
    return true;
  }

  async saveFile(data) {
    if (!data) {
        return console.log("El archivo está vacío");
      }

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addProduct(product) {
    if (this.products.length === 0) {
        product.id = 1;
      } else {
        // Autoincremental
        product.id = this.products[this.products.length - 1].id + 1;
      }
  
    this.products.push(product);

    const respuesta = await this.saveFile(this.products);

    if (respuesta) {
      console.log("Producto creado");
    } else {
      console.log("Hubo un error al crear un producto");
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(idProduct) {
    const product = this.products.find((product) => product.id === idProduct);

    if (!product) {
      console.error("not found");
    }
    else{console.log(product)}
  }

async deleteProduct(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      return console.log("El producto no existe");
    }

    const index = this.products.findIndex((p) => p.id === id);

    try {
      this.products.splice(index, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hubo un error al guardar el producto: ${error}`);
      return;
    }
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


// Pruebas

const product1 = new product("Remera", "Remera de hombre, color negro, cuello redondo", 10000, "https://acdn.mitiendanube.com/stores/002/140/898/products/remera-negra-puesta1-31db72ce57958b34ee16511807977199-640-0.webp", 134, 50)
const product2 = new product("Pantalon", "Pantalon de jean, color negro", 12000, "https://acdn.mitiendanube.com/stores/002/140/898/products/remera-negra-puesta1-31db72ce57958b34ee16511807977199-640-0.webp", 135, 50)
const product3 = new product("Remera", "Remera de hombre, color blanco, cuello en V", 10000, "https://m.media-amazon.com/images/I/81GuGqreyuL._AC_SX522_.jpg", 133, 50)


const manager = new ProductManager("./desafio2/products.json");

// console.log(manager.getProducts());
manager.addProduct(product1);
console.log("obtengo productos")
console.log(manager.getProducts());

manager.addProduct(product2);
manager.addProduct(product3);
console.log("agrego mas contenido y obtengo nuevamente los productos")
console.log(manager.getProducts());
console.log("obtengo productos por id");
console.log(manager.getProductById(3));
console.log(manager.getProductById(1));
console.log(manager.getProductById(2));
console.log("borro productos");
console.log(manager.deleteProduct(20));
console.log(manager.deleteProduct(2));
console.log("muestro lo que queda de productos despues de borrar")
console.log(manager.getProducts());