import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../../domain/checkout/entity/order-item";
import { Customer } from "../../../../../domain/customer/entity/customer";
import { Address } from "../../../../../domain/customer/value-object/address";

import { Product } from "../../../../../domain/product/entity/product";
import { CustomerModel } from "../../../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../../../infrastructure/customer/repository/sequelize/customer.repository";

import { OrderItemModel } from "../../../../../infrastructure/order/repository/sequelize/order-item.model";
import { OrderModel } from "../../../../../infrastructure/order/repository/sequelize/order.model";
import { OrderRepository } from "../../../../../infrastructure/order/repository/sequelize/order.repository";
import { ProductModel } from "../../../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../../../infrastructure/product/repository/sequelize/product.repository";

describe("Order Repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(await orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: order.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: product.id,
          quantity: orderItem.quantity,
        },
      ],
    });
  });
});
