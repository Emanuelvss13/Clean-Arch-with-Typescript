import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { ListCustomersUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenter/customer.presenter";

export const customerRoutes = express.Router();

customerRoutes.post("/", async ({ body }: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const input = {
      name: body.name,
      address: {
        street: body.address.street,
        number: body.address.number,
        zip: body.address.zip,
        city: body.address.city,
      },
    };

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }

  customerRoutes.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomersUseCase(new CustomerRepository());

    try {
      const output = await usecase.execute();

      res.format({
        json: async () => res.send(output),
        xml: async () => res.send(CustomerPresenter.toXml(output)),
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});
