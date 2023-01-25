import { ICustomerRepository } from "../../../domain/customer/repository/customer.repository.interface";
import { OutputListCustomerDTO } from "./list.customer.dto";

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          number: customer.address.number,
          zip: customer.address.zip,
        },
      })),
    };
  }
}
