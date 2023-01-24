import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { ICustomerRepository } from "../../../domain/customer/repository/customer.repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO,
} from "./update.customer.dto";

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute({
    id,
    name,
    address,
  }: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      name,
      new Address(
        address.street,
        address.number,
        address.zipcode,
        address.city
      ),
      id
    );

    await this.customerRepository.update(customer);

    return {
      id,
      name,
      address: {
        street: address.street,
        number: address.number,
        zipcode: address.zipcode,
        city: address.city,
      },
    };
  }
}
