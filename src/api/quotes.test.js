const supertest = require("supertest");
const app = require("../app");
const Quotes = require("../models/Quotes");

const endpoint = "/api";

describe(`${endpoint}`, () => {
  let server;
  let id;
  beforeAll(() => {
    return new Promise((resolve) => {
      server = app.listen(null, () => {
        global.agent = supertest.agent(server);
        resolve();
      });
    });
  });

  it("POST /quote should return 200 and the created quote", async () => {
    const quote = {
      content: "Test quote",
      author: "Test author",
    };
    const response = await supertest(app).post(`${endpoint}/quote`).send(quote);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(quote.content);
    expect(response.body.author).toBe(quote.author);
    id = response.body.id;
  });

  it("GET should return 200 and an array of quotes", async () => {
    const response = await supertest(app).get(`${endpoint}/quotes`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /quote/:id should return 200 and the quote with its comments", async () => {
    const response = await supertest(app).get(`${endpoint}/quote/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.quote).toHaveProperty("id");
    expect(response.body.quote).toHaveProperty("content");
    expect(response.body.quote).toHaveProperty("author");
    expect(response.body.quote).toHaveProperty("likes");
    expect(response.body.quote).toHaveProperty("dislikes");
    expect(response.body).toHaveProperty("comments");
  });

  it("PUT /quote/:id should return 200 and the updated quote", async () => {
    const quote = {
      content: "Updated quote",
      author: "Updated author",
    };

    const response = await supertest(app)
      .put(`${endpoint}/quote/${id}`)
      .send(quote);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(quote.content);
    expect(response.body.author).toBe(quote.author);
  });

  it("DELETE /quote/:id should return 200 and the deleted quote", async () => {
    const response = await supertest(app).delete(`${endpoint}/quote/${id}`);
    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
});
