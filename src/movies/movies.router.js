const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed.js");

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
