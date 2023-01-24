import { IRepositoryInterface } from "../../@shared/repository/repository-interface";
import { Product } from "../entity/product";

export interface IProductRepositoryInterface
  extends IRepositoryInterface<Product> {}
