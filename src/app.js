if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const notFound = require("./errors/notFound.js");
const errorHandler = require("./errors/errorHandler.js");

const app = express();

app.use(cors());
// router here

app.use(notFound);
app.use(errorHandler);

module.exports = app;
