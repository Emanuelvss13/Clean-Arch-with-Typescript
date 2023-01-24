import { Product } from "../../../domain/product/entity/product";

describe("Product unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "name", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "name", -1);
    }).toThrowError("Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("1", "name", 1);

    product.changeName("new name");

    expect(product.name).toBe("new name");
  });

  it("should change price", () => {
    const product = new Product("1", "name", 1);

    product.changePrice(2);

    expect(product.price).toBe(2);
  });
});
