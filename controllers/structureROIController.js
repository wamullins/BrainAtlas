const { StructureROI } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getStructureROIs = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, StructureROI);
};

const getStructureROIById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, StructureROI);
};

//// admin functions ////

const createStructureROI = async (req, res) => {
    redundantCRUD.createObject(req, res, StructureROI);
};

const updateStructureROI = async (req, res) => {
    redundantCRUD.updateObjectByID(req, res, StructureROI);
};

const deleteStructureROI = async (req, res) => {
    redundantCRUD.deleteObjectByID(req, res, StructureROI);
};

module.exports = {
    getStructureROIs,
    getStructureROIById,
    createStructureROI,
    updateStructureROI,
    deleteStructureROI,
};
