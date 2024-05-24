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

module.exports = {
  router: router,
};
