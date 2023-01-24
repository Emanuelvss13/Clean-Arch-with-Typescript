import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";
describe("Customer Factory unit tests", () => {
  it("should creates a customer", () => {
    let customer = CustomerFactory.create("Customer");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should creates a customer with an address", () => {
    const address = new Address("street", 1, "0000000", "city");

    let customer = CustomerFactory.createWithAddress("Customer", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.address).toBe(address);
  });
});
