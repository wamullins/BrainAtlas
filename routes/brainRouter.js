const Router = require("express").Router();
const controller = require("../controllers/brainController");

Router.get("/", controller.getMajorBrainRegions);
Router.get("/:id", controller.getMajorBrainRegionById);

Router.post("/", controller.createMajorBrainRegion);
Router.put("/", controller.updateMajorBrainRegionById);
Router.delete("/", controller.deleteMajorBrainRegionById);

module.exports = Router;
