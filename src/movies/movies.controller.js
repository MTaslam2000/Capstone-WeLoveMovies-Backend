const service = require("./movies.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
