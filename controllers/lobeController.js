const { Lobe } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getLobes = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, Lobe);
};

const getLobeById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, Lobe);
};

//// admin functions ////

const createLobe = async (req, res) => {
    redundantCRUD.createObject(req, res, Lobe);
};

const updateLobe = async (req, res) => {
    redundantCRUD.updateObjectByID(req, res, Lobe);
};

const deleteLobe = async (req, res) => {
    redundantCRUD.deleteObjectByID(req, res, Lobe);
};

module.exports = {
    getLobes,
    getLobeById,
    createLobe,
    updateLobe,
    deleteLobe,
};
