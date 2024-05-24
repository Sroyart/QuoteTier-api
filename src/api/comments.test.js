const supertest = require("supertest");
const app = require("../app");
const Quotes = require("../models/Quotes");
const Comments = require("../models/Comments");

const endpoint = "/api";

describe(`${endpoint}`, () => {
  let server;

  beforeAll(() => {
    return new Promise((resolve) => {
      server = app.listen(null, () => {
        global.agent = supertest.agent(server);
        resolve();
      });
    });
  });

  let id;
  beforeEach(async () => {
    const quote = await Quotes.query().insert({
      content: "Test quote",
      author: "Test author",
    });
    id = quote.id;
  });

  it("POST /comment should return 200 and the created comment", async () => {
    const comment = {
      content: "Test comment",
      author: "Test author",
      quotes_id: id,
    };
    const response = await supertest(app)
      .post(`${endpoint}/comment`)
      .send(comment);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(comment.content);
    expect(response.body.author).toBe(comment.author);
    expect(response.body.quotes_id).toBe(comment.quotes_id);
  });

  afterEach(async () => {
    await Comments.query()
      .delete()
      .where("quotes_id", id)
      .then(() => {
        return Quotes.query().deleteById(id);
      });
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
