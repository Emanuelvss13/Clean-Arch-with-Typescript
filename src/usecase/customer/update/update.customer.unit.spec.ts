import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const address = new Address("street", 1, "0000", "city");

const customer = new Customer("123", "Customer");

customer.changeAddress(address);

const MockCustomerRespository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const input = {
  id: "123",
  name: "Customer updated",
  address: {
    street: "street updated",
    number: 123,
    city: "city updated",
    zipcode: "1111",
  },
};

describe("Update customer unit test", () => {
  it("should update a customer", async () => {
    const usecase = new UpdateCustomerUseCase(MockCustomerRespository());

    const output = await usecase.execute(input);

    expect(output).toStrictEqual({
      id: "123",
      name: "Customer updated",
      address: {
        street: "street updated",
        number: 123,
        city: "city updated",
        zipcode: "1111",
      },
    });
  });
});
