if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const notFound = require("./errors/notFound.js");
const errorHandler = require("./errors/errorHandler.js");
const theatersRouter = require("./theaters/theaters.router.js");
const moviesRouter = require("./movies/movies.router.js");

const app = express();

app.use(cors());
app.use(express.json());
// router here
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
