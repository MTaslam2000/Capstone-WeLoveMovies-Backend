const knex = require("../db/connection.js");

async function list() {
  return knex("theaters").select("*");
}

module.exports = {
  list,
};
