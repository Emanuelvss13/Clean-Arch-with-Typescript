import { Order } from "../../../domain/checkout/entity/order";
import { OrderItem } from "../../../domain/checkout/entity/order-item";

describe("Order unit test", () => {
  it("should throw a error when id is empty", () => {
    expect(() => {
      let customer = new Order("", "1", []);
    }).toThrowError("Id is required");
  });

  it("should throw a error when customerId is empty", () => {
    expect(() => {
      let customer = new Order("1", "", []);
    }).toThrowError("customerId is required");
  });

  it("should throw a error when items are empty", () => {
    expect(() => {
      let customer = new Order("1", "1", []);
    }).toThrowError("items are required");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "item1", 125, "p1", 2);

    const order1 = new Order("1", "1", [item1]);

    expect(order1.total()).toBe(250);

    const item2 = new OrderItem("2", "item2", 699, "p2", 2);

    const order2 = new Order("2", "1", [item1, item2]);

    expect(order2.total()).toBe(1648);
  });

  it("should throw error when item quantity is less or equal than 0", () => {
    expect(() => {
      const item1 = new OrderItem("1", "item1", 250, "p1", 0);

      const order = new Order("1", "1", [item1]);
    }).toThrowError("Invalid quantity");
  });
});
