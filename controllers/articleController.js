const { Article } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getArticles = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, Article);
    // will need to tie a lot mot into this function, may not be able to use the redundant crud for this since it will be so unique and it will need to sit on the same router
};

const getArticleById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, Article);
};

const createArticle = async (req, res) => {
    redundantCRUD.createObject(req, res, Article);
};

//// admin functions ////

/// going to use this function primairly as an admin to change the "aproved" field from the default false to true so that it appears on the page
const updateArticleById = async (req, res) => {
    redundantCRUD.updateObjectById(req, res, Article);
};

const deleteArticleById = async (req, res) => {
    redundantCRUD.deleteObjectById(req, res, Article);
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticleById,
    deleteArticleById,
};
