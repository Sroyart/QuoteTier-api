const express = require("express");
const router = express.Router();

const Quotes = require("../models/Quotes");
const Comments = require("../models/Comments");

router.get("/quotes", (req, res) => {
  const sort = req.query.sort;
  Quotes.query().then((quotes) => {
    if (sort === "likes") {
      quotes = quotes.sort((a, b) => b.likes - a.likes);
    } else if (sort === "dislikes") {
      quotes = quotes.sort((a, b) => b.dislikes - a.dislikes);
    }
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
          author: quote[0].author,
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
      author: req.body.author,
      likes: 0,
      dislikes: 0,
    })
    .then((quote) => {
      res.json(quote);
    });
});

router.put("/quote/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Quotes.query()
    .findById(id)
    .patch({
      content: req.body.content,
      author: req.body.author,
    })
    .returning("*")
    .then((quote) => {
      res.json(quote);
    });
});

router.put("/quote/like/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Quotes.query()
    .findById(id)
    .patch({
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    })
    .then((quote) => {
      res.json(quote);
    });
});

router.delete("/quote/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Comments.query()
    .delete()
    .where("quotes_id", id)
    .then(() => {
      return Quotes.query().deleteById(id);
    })
    .then((quote) => {
      res.json(quote);
    });
});

module.exports = {
  router: router,
};
