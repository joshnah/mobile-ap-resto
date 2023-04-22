const app = require("../app");
const request = require("supertest");
describe("PRODUCT TEST", () => {
  // admin@gmail.com
  const TOKEN_ADMIN =
    "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29t.di6JXEWZ2fNaFsGMjcsIj_qywIJxXcytzyJtqUToKKk";
  // test@gmail.com
    const TOKEN_USER = "eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ydxkCpj2i8QWHWrXWQmlY6pwc59_fTD6enOy-NX3Ts0";
  test("Get all products", async () => {
    const response = await request(app)
      .get("/api/products")
      .set("x-access-token", TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  test("Create product", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ name: "New burger", type: "burger" , price: "10.95", description: "New burger" });
    expect(response.statusCode).toBe(200);
  });


  test("Update product name", async () => {
    const response = await request(app)
      .put("/api/products/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ name: "new name"});
    expect(response.statusCode).toBe(200);
  });

  test("Update product type", async () => {
    const response = await request(app)
      .put("/api/products/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ type: "frites"});
    expect(response.statusCode).toBe(200);
  });

  test("Update product price", async () => {
    const response = await request(app)
      .put("/api/products/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ price: "5.5"});
    expect(response.statusCode).toBe(200);
  });

  test("Update product description", async () => {
    const response = await request(app)
      .put("/api/products/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ description: "new description"});
    expect(response.statusCode).toBe(200);
  });

  test("Modify product without being an admin", async () => {
    const response = await request(app)
      .put("/api/products/2")
      .set("x-access-token", TOKEN_USER)
      .send({ name: "new name"});
    expect(response.statusCode).toBe(401);
  });

  test("Delete product", async () => {
    const response = await request(app)
      .delete("/api/products/2")
      .set("x-access-token", TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });

  test("Delete product without being an admin", async () => {
    const response = await request(app)
      .delete("/api/products/1")
      .set("x-access-token", TOKEN_USER);
    expect(response.statusCode).toBe(401);
  });
});
