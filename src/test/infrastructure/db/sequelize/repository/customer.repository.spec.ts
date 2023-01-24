import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../../../domain/customer/entity/customer";
import { Address } from "../../../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../../../infrastructure/db/sequelize/model/customer.model";
import { CustomerRepository } from "../../../../../infrastructure/repository/customer.repository";

describe("Customer Repository unit test", () => {
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

  it("should create a new customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const address2 = new Address("street 2", 2, "1111", "city 2");

    customer.changeName("Customer 2");
    customer.activate();
    customer.addRewardPoints(10);
    customer.changeAddress(address2);

    await customerRepository.update(customer);

    const updatedCustomer = await CustomerModel.findOne({ where: { id: "1" } });

    expect(updatedCustomer.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");

    customer.changeAddress(address);
    customer.activate();

    await customerRepository.create(customer);

    const customerModel = await customerRepository.find(customer.id);

    expect(customerModel).toStrictEqual(customer);
  });

  it("should throw a error when customer not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("asd");
    }).rejects.toThrow("Customer not found");
  });

  it("should return all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");
    customer.changeAddress(address);

    const customer2 = new Customer("2", "Customer");
    const address2 = new Address("street", 1, "0000", "city");
    customer2.changeAddress(address2);

    const customer3 = new Customer("3", "Customer");
    const address3 = new Address("street", 1, "0000", "city");
    customer3.changeAddress(address3);

    customer2.addRewardPoints(20);

    customerRepository.create(customer);
    customerRepository.create(customer2);
    customerRepository.create(customer3);

    const customerModels = await customerRepository.findAll();
    const customers = [customer, customer2, customer3];

    expect(customerModels).toEqual(customers);
  });
});
