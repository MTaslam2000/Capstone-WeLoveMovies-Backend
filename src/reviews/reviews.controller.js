const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function ifReviewExists(req, res, next) {
  const foundReview = await service.read(Number(req.params.reviewId));
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  return next({
    status: 404,
    message: `Review cannot be found for id: ${req.params.reviewId}`,
  });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(ifReviewExists), asyncErrorBoundary(destroy)],
};
