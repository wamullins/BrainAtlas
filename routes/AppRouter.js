const express = require("express");
const Router = express.Router();

const ArticleRouter = require("./articleRouter");
const BrainRouter = require("./brainRouter");
const LobeRouter = require("./lobeRouter");
const StructureRouter = require("./structureROIRoute");

Router.use("/articles", ArticleRouter);
Router.use("/brains", BrainRouter);
Router.use("/lobes", LobeRouter);
Router.use("/structures", StructureRouter);

module.exports = Router;
