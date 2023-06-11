const Router = require("express").Router();
const controller = require("../controllers/structureROIController");

Router.get("/", controller.getStructureROIs);
Router.get("/:id", controller.getStructureROIById);

Router.post("/", controller.createStructureROI);
Router.put("/", controller.updateStructureROIById);
Router.delete("/", controller.deleteStructureROIById);

module.exports = Router;
