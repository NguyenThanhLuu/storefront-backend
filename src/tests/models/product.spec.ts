import { ProductQuery } from "../../models/product";
import { Product } from "../../shares/interfaces/product";

const productStore = new ProductQuery();

describe("Product Model", () => {
  const product: Product = {
    name: "product 2",
    price: 20,
  };

  async function createProduct(product: Product) {
    return productStore.createNewAProduct(product);
  }

  async function deleteAProduct(id: number) {
    return productStore.deleteAProduct(id);
  }

  it("should have getAllProducts method", () => {
    expect(productStore.getAllProducts).toBeDefined();
  });

  it("should have getProductsWithQuery method", () => {
    expect(productStore.getProductsWithQuery).toBeDefined();
  });

  it("should have createNewAProduct method", () => {
    expect(productStore.createNewAProduct).toBeDefined();
  });

  it("should have deleteAProduct method", () => {
    expect(productStore.deleteAProduct).toBeDefined();
  });

  it("should add success a new product", async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });
    await deleteAProduct(createdProduct.id as number);
  });

  it("should return all products", async () => {
    const productList: Product[] = await productStore.getAllProducts();
    expect(productList).toEqual([
      {
        id: 1,
        name: "product 2",
        price: 20,
      },
    ]);
  });

  it("should return the correct product", async () => {
    const createdProduct: Product = await createProduct(product);
    if (createdProduct.id) {
      const productData = await productStore.getProductsWithQuery(createdProduct.id);
      expect(productData).toEqual(createdProduct);
    }
    await deleteAProduct(createdProduct.id as number);
  });

  it("should update the product", async () => {
    const createdProduct: Product = await createProduct(product);
    const newProduct: Product = {
      name: "new product",
      price: 10,
    };
    const { name, price } = await productStore.updateForAProduct(createdProduct.id as number, newProduct);
    expect(name).toEqual(newProduct.name);
    expect(price).toEqual(newProduct.price);
    await deleteAProduct(createdProduct.id as number);
  });
});
