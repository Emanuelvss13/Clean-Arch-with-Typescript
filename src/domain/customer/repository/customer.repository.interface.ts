import { IRepositoryInterface } from "../../@shared/repository/repository-interface";
import { Customer } from "../entity/customer";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
