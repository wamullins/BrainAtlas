const Router = require("express").Router();
const controller = require("../controllers/articleController");

Router.get("/", controller.getArticles);
Router.get("/:id", controller.getArticleById);

Router.post("/", controller.createArticle);
Router.put("/", controller.updateArticleById);
Router.delete("/", controller.deleteArticleById);

module.exports = Router;
