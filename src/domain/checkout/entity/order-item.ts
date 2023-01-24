export class OrderItem {
  _id: string;
  _name: string;
  _price: number;
  _productId: string;
  _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get productId() {
    return this._productId;
  }

  get quantity() {
    return this._quantity;
  }

  validate(): boolean {
    if (this._quantity <= 0) {
      throw new Error("Invalid quantity");
    }

    return true;
  }

  get price(): number {
    return this._price * this._quantity;
  }
}
