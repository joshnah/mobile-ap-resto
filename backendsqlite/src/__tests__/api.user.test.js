const app = require("../app");
const request = require("supertest");
describe("USER TEST", () => {
  // admin@gmail.com
  const TOKEN_ADMIN =
    "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29t.di6JXEWZ2fNaFsGMjcsIj_qywIJxXcytzyJtqUToKKk";
  // test@gmail.com
    const TOKEN_USER = "eyJhbGciOiJIUzI1NiJ9.dGVzdEBnbWFpbC5jb20.ydxkCpj2i8QWHWrXWQmlY6pwc59_fTD6enOy-NX3Ts0";
  test("Wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "abcde" });
    expect(response.statusCode).toBe(403);
  });

  test("Login successful", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "admin" });
    expect(response.statusCode).toBe(200);
  });

  test("Missing token", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(403);
  });

  test("Get all users", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("x-access-token", TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  test("Create user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "newuser@gmail.com", password: "12312A" , name: "newuser" });
    expect(response.statusCode).toBe(200);
  });

  test("Get user by email", async () => {
    const response = await request(app)
      .get("/api/users/test@gmail.com")
      .set("x-access-token", TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });

  test("Update user name", async () => {
    const response = await request(app)
      .put("/api/users/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ name: "new name"});
    expect(response.statusCode).toBe(200);
  });

  test("Update user password", async () => {
    const response = await request(app)
      .put("/api/users/2")
      .set("x-access-token", TOKEN_ADMIN)
      .send({ password: "12312A"});
    expect(response.statusCode).toBe(200);
  });

  test("Unthorized user", async () => {
    const response = await request(app)
      .put("/api/users/3")
      .set("x-access-token", TOKEN_USER)
      .send({ name: "new name"});
    expect(response.statusCode).toBe(401);
  });

  test("Update user by himself", async () => {
    const response = await request(app)
      .put("/api/users/2")
      .set("x-access-token", TOKEN_USER)
      .send({ name: "new name"});
    expect(response.statusCode).toBe(200);
  });

  test("Delete user", async () => {
    const response = await request(app)
      .delete("/api/users/2")
      .set("x-access-token", TOKEN_ADMIN);
    expect(response.statusCode).toBe(200);
  });
});
