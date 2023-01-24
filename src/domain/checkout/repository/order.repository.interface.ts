import { IRepositoryInterface } from "../../@shared/repository/repository-interface";
import { Order } from "../entity/order";

export interface IOrderRepository extends IRepositoryInterface<Order> {}
