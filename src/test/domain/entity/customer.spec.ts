import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";

describe("Customer unit test", () => {
  it("should throw a error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "name");
    }).toThrowError("Id is required");
  });

  it("should throw a error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    let customer = new Customer("1", "name");

    // Act
    customer.changeName("another name");

    // Assert
    expect(customer.name).toBe("another name");
  });

  it("should active customer", () => {
    let customer = new Customer("1", "name");

    let address = new Address("street", 123, "00000000", "city");

    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should active customer", () => {
    let customer = new Customer("1", "name");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw a error when activate customer if address is undefined", () => {
    expect(() => {
      let customer = new Customer("1", "name");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer!");
  });

  it("should add reward points", () => {
    let customer = new Customer("1", "name");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
