const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({
    data,
  });
}

async function movieExists(req, res, next) {
  const foundMovie = await service.read(req.params.movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  return next({
    status: 404,
    message: `Movie does not exist for id: ${req.params.movieId}`,
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function readReviewsByMovieId(req, res, next) {
  const data = await service.listReviewsByMovieId(Number(req.params.movieId));
  res.json({ data });
}

async function readTheatersByItsMovieId(req, res, next) {
  const data = await service.listTheatersIfMovieIdIsInParams(
    Number(req.params.movieId)
  );
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  readReviewsByMovieId: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviewsByMovieId),
  ],
  readTheatersByItsMovieId: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheatersByItsMovieId),
  ],
};
