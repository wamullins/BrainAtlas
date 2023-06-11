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

const updateStructureROIById = async (req, res) => {
    redundantCRUD.updateObjectById(req, res, StructureROI);
};

const deleteStructureROIById = async (req, res) => {
    redundantCRUD.deleteObjectById(req, res, StructureROI);
};

module.exports = {
    getStructureROIs,
    getStructureROIById,
    createStructureROI,
    updateStructureROIById,
    deleteStructureROIById,
};
