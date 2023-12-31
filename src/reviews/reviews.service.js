const knex = require("../db/connection.js");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function getCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, ["*"])
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  destroy,
  read,
  update,
  getCritic,
};
