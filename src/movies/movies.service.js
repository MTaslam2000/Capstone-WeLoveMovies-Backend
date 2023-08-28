const knex = require("../db/connection.js");

async function list() {
  return knex("movies").select("*");
}

module.exports = {
  list,
};
