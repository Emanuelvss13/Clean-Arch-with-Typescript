export interface InputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

export interface OutputUpdateCustomerDTO extends InputUpdateCustomerDTO {}
