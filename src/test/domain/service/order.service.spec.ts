import { Order } from "../../../domain/checkout/entity/order";
import { OrderItem } from "../../../domain/checkout/entity/order-item";
import { OrderService } from "../../../domain/checkout/service/order.service";
import { Customer } from "../../../domain/customer/entity/customer";

describe("Order service unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "c1");
    const item1 = new OrderItem("1", "item1", 100, "p1", 2);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toEqual(100);
    expect(order.total()).toBe(200);
  });

  it("should get total of orders", () => {
    const item1 = new OrderItem("1", "item1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item2", 200, "p2", 2);

    const order1 = new Order("1", "1", [item1]);

    const order2 = new Order("2", "1", [item1, item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(800);
  });
});
