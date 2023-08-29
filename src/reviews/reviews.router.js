const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed.js");

router.route("/:reviewId").delete(controller.delete).all(methodNotAllowed);
// router.route("/").all(methodNotAllowed);

module.exports = router;
