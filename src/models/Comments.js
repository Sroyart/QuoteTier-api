const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Comment extends Model {
  static get tableName() {
    return "comments";
  }
  static get relationMappings() {
    const Quote = require("./Quotes");
    return {
      writer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quote,
        join: {
          from: "comments.user_id",
          to: "quotes.id",
        },
      },
    };
  }
}

module.exports = Comment;
