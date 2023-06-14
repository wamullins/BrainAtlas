const Router = require("express").Router();
const controller = require("../controllers/brainController");

Router.get("/", controller.getMajorBrainRegions);
Router.get("/:id", controller.getMajorBrainRegionById);
Router.get("/name/:name", controller.getMajorBrainRegionByName);

Router.post("/", controller.createMajorBrainRegion);
Router.put("/:id", controller.updateMajorBrainRegionById);
Router.delete("/:id", controller.deleteMajorBrainRegionById);

module.exports = Router;
