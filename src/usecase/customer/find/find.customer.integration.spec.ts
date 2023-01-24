import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "00000000", "city");

    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});
