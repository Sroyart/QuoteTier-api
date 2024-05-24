const express = require("express");
const router = express.Router();

const Comments = require("../models/Comments");

router.post("/comment", (req, res) => {
  Comments.query()
    .insert({
      content: req.body.content,
      author: req.body.author,
      quotes_id: req.body.quotes_id,
    })
    .then((comment) => {
      res.json(comment);
    });
});

router.delete("/comment/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Comments.query()
    .deleteById(id)
    .then(() => {
      res.json({ message: "Comment deleted" });
    });
});

module.exports = {
  router: router,
};
