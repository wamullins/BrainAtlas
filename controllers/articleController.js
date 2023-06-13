const { Article } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getArticles = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, Article);
    // will need to tie a lot mot into this function, may not be able to use the redundant crud for this since it will be so unique and it will need to sit on the same router
};

const getArticleByMajorBrainRegionId = async (req, res) => {
    redundantCRUD.getObjectsByLocation(req, res, Article, "majorBrainRegionId", ["lobeId", "structureROIId"], true);
};
const getArticleByLobeId = async (req, res) => {
    redundantCRUD.getObjectsByLocation(req, res, Article, "lobeId", ["structureROIId"], true);
};
const getArticleByStructureROIId = async (req, res) => {
    redundantCRUD.getObjectsByLocation(req, res, Article, "structureROIId", [], true);
};

const getUnapprovedArticles = async (req, res) => {
    try {
        const unapproved = await Article.find({ approved: false });
        if (!unapproved) return res.send("there are no unapproved articles");
        return res.json({ unapproved });
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
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
    getArticleByMajorBrainRegionId,
    getArticleByLobeId,
    getArticleByStructureROIId,
    getUnapprovedArticles,
    createArticle,
    updateArticleById,
    deleteArticleById,
};
