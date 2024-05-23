// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    connection:
      "postgresql://postgres:root@localhost:5434/quotes?schema=public",
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
