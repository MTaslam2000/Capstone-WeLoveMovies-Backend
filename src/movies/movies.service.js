const knex = require("../db/connection.js");

function list() {
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .then((item) => item[0]);
}

module.exports = {
  list,
  read,
};
