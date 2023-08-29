const knex = require("../db/connection.js");
const mapProperties = require("../utils/map-properties.js");

function list(isShowing) {
  if (isShowing === "true") {
    return listOnlyIfIsShowingIsTrue();
  }
  return knex("movies").select("*");
}

function listTheatersIfMovieIdIsInParams(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId })
    .select("*");
}

function listOnlyIfIsShowingIsTrue() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .groupBy("m.movie_id")
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .then((item) => item[0]);
}

const setCriticsForMovie = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function listReviewsByMovieId(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movieId })
    .select(
      "r.*",
      "c.critic_id as critic.critic_id",
      "c.preferred_name as critic.preferred_name",
      "c.surname as critic.surname",
      "c.organization_name as critic.organization_name"
    )
    .then((data) => data.map(setCriticsForMovie));
}

module.exports = {
  list,
  read,
  listReviewsByMovieId,
  listTheatersIfMovieIdIsInParams,
};
