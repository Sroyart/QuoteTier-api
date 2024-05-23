const express = require("express");
const router = express.Router();

const Quotes = require("../models/Quotes");

router.get("/quotes", (req, res) => {
  Quotes.query().then((quotes) => {
    res.json(quotes);
  });
});

router.get("/quote/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Quotes.query()
    .where("id", id)
    .withGraphFetched("comments")
    .modifiers({
      selectFields(builder) {
        builder.select("id", "content", "author");
      },
    })
    .then((quote) => {
      console.log(quote);
      res.json({
        quote: {
          id: quote[0].id,
          content: quote[0].content,
          likes: quote[0].likes,
          dislikes: quote[0].dislikes,
        },
        comments: quote[0].comments,
      });
    });
});

router.post("/quote", (req, res) => {
  Quotes.query()
    .insert({
      content: req.body.content,
      likes: 0,
      dislikes: 0,
    })
    .then((quote) => {
      res.json(quote);
    });
});

module.exports = {
  router: router,
};
