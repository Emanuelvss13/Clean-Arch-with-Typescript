import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "Customer",
  address: {
    street: "street",
    number: 1,
    zipcode: "00000000",
    city: "city",
  },
};

const MockCustomerRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("create customer use case unit test", () => {
  it("should create a customer", async () => {
    const usecase = new CreateCustomerUseCase(MockCustomerRespository());

    const output = await usecase.execute(input);

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: "Customer",
      address: {
        street: "street",
        number: 1,
        zipcode: "00000000",
        city: "city",
      },
    });
  });

  it("should thrown an error when name is missing", async () => {
    const usecase = new CreateCustomerUseCase(MockCustomerRespository());

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrowError(
      "Name is required"
    );
  });
});
