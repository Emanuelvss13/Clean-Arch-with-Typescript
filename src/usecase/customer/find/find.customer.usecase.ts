import { ICustomerRepository } from "../../../domain/customer/repository/customer.repository.interface";
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.address.city,
        number: customer.address.number,
        street: customer.address.street,
        zip: customer.address.zipcode,
      },
    };
  }
}
