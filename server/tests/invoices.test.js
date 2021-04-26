const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Invoice = require("../models/Invoice");
const testInvoices = require("./helpers/invoices")

const api = supertest(app);

beforeEach(async () => {
  await Invoice.deleteMany({});
  await Invoice.insertMany(testInvoices)
})

describe("when there are initially some invoices saved", () => {
  test("invoices are returned as json", async () => {
    await api
      .get("/invoices")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all invoices are returned", async () => {
    const res = await api.get("/invoices").expect(200);
    expect(res.body.length).toEqual(testInvoices.length)
  })
})



afterAll(() => {
  mongoose.connection.close();
});
