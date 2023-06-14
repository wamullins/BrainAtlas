const { Lobe } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getLobes = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, Lobe);
};

const getLobeById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, Lobe);
};
const getLobeByName = async (req, res) => {
    redundantCRUD.getObjectByName(req, res, Lobe);
};

//// admin functions ////

const createLobe = async (req, res) => {
    redundantCRUD.createObject(req, res, Lobe);
};

const updateLobeById = async (req, res) => {
    redundantCRUD.updateObjectById(req, res, Lobe);
};

const deleteLobeById = async (req, res) => {
    redundantCRUD.deleteObjectById(req, res, Lobe);
};

module.exports = {
    getLobes,
    getLobeById,
    getLobeByName,
    createLobe,
    updateLobeById,
    deleteLobeById,
};
