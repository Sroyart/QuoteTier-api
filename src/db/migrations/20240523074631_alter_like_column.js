/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("quotes", (table) => {
    table.dropColumn("like");
    table.integer("likes");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("quotes", (table) => {
    table.dropColumn("likes");
    table.integer("like");
  });
};
