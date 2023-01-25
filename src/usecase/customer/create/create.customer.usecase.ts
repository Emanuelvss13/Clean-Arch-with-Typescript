import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { ICustomerRepository } from "../../../domain/customer/repository/customer.repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from "./create.customer.dto";

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute({
    name,
    address,
  }: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      name,
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
