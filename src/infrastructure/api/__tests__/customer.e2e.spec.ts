import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "customer",
        address: {
          street: "Street",
          number: 1,
          zip: "0000",
          city: "City",
        },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      name: "customer",
      address: {
        street: "Street",
        number: 1,
        zipcode: "0000",
        city: "City",
      },
    });
  });
});
