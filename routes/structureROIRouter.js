const Router = require("express").Router();
const controller = require("../controllers/structureROIController");

Router.get("/", controller.getStructureROIs);
Router.get("/majorBrainRegion/:id", controller.getStructureROIByMajorBrainRegionId);
Router.get("/lobe/:id", controller.getStructureROIByLobeId);
Router.get("/:id", controller.getStructureROIById);
Router.get("/name/:name", controller.getStructureROIByName);

Router.post("/", controller.createStructureROI);
Router.put("/:id", controller.updateStructureROIById);
Router.delete("/:id", controller.deleteStructureROIById);

module.exports = Router;
