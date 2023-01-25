import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { customerRoutes } from "./routes/customer.route";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoutes);
export let sequelize: Sequelize;

async function setUpDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setUpDB();
