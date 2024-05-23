const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Quotes extends Model {
  static get tableName() {
    return "quotes";
  }

  static get relationMappings() {
    const Comment = require("./Comments");
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "quotes.id",
          to: "comments.quotes_id",
        },
      },
    };
  }
}

module.exports = Quotes;
