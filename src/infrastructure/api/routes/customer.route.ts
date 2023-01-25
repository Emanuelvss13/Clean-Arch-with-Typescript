import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";

export const customerRoutes = express.Router();

customerRoutes.post("/", async ({ body }: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const input = {
      name: body.name,
      address: {
        street: body.address.street,
        number: body.address.number,
        zipcode: body.address.zip,
        city: body.address.city,
      },
    };

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});
