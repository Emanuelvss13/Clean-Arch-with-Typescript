import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
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
        zip: "0000",
        city: "City",
      },
    });
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "customer",
    });

    expect(response.statusCode).toBe(500);
  });

  it("should list all customers", async () => {
    const c1 = await request(app)
      .post("/customer")
      .send({
        name: "customer1",
        address: {
          street: "Street1",
          number: 1234,
          zip: "2000",
          city: "City1",
        },
      });

    const c2 = await request(app)
      .post("/customer")
      .send({
        name: "customer2",
        address: {
          street: "Street2",
          number: 123,
          zip: "1000",
          city: "City2",
        },
      });

    const response = await request(app).get("/customer");

    expect(response.statusCode).toBe(200);
    expect(response.body.customers.length).toBe(2);

    expect(response.body.customers[0]).toStrictEqual({
      id: expect.any(String),
      ...c1.body,
    });

    expect(response.body.customers[1]).toStrictEqual({
      id: expect.any(String),
      ...c2.body,
    });
  });
});
