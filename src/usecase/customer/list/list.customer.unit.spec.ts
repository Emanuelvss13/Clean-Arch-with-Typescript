import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomersUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "customer1",
  new Address("street1", 1, "1000", "city1")
);

const customer2 = CustomerFactory.createWithAddress(
  "customer2",
  new Address("street2", 2, "2000", "city2")
);

const MockCustomerRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List customer use cases", () => {
  it("should return a list of customers", async () => {
    const usecase = new ListCustomersUseCase(MockCustomerRepository());

    const output = await usecase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[0].address.number).toBe(customer1.address.number);
    expect(output.customers[0].address.city).toBe(customer1.address.city);
  });
});
