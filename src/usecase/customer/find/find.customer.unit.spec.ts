import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("1", "Customer");
const address = new Address("street", 1, "00000000", "city");
customer.changeAddress(address);

const MockCustomerRespository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find customer use case", () => {
  it("should find a customer", async () => {
    const usecase = new FindCustomerUseCase(MockCustomerRespository());

    const input = { id: "1" };

    const output = {
      id: "1",
      name: "Customer",
      address: {
        street: "street",
        city: "city",
        number: 1,
        zip: "00000000",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("should not find a customer", () => {
    MockCustomerRespository().find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(MockCustomerRespository());

    const input = { id: "" };

    expect(() => usecase.execute(input)).rejects.toThrow(
      new Error("Customer not found")
    );
  });
});
