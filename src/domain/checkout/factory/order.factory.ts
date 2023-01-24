import { Order } from "../entity/order";
import { OrderItem } from "./../entity/order-item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export class OrderFactory {
  public static create({ id, customerId, items }: OrderFactoryProps): Order {
    const orderItems = items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    return new Order(id, customerId, orderItems);
  }
}
