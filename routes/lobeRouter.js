const Router = require("express").Router();
const controller = require("../controllers/lobeController");

Router.get("/", controller.getLobes);
Router.get("/:id", controller.getLobeById);
Router.get("/name/:name", controller.getLobeByName);

Router.post("/", controller.createLobe);
Router.put("/:id", controller.updateLobeById);
Router.delete("/:id", controller.deleteLobeById);

module.exports = Router;
