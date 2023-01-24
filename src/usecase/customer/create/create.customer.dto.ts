export interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zipcode: string;
    city: string;
  };
}

export interface OutputCreateCustomerDTO extends InputCreateCustomerDTO {
  id: string;
}
