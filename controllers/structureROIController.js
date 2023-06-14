const { StructureROI } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getStructureROIs = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, StructureROI);
};

const getStructureROIById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, StructureROI);
};

const getStructureROIByName = async (req, res) => {
    redundantCRUD.getObjectByName(req, res, StructureROI);
};

const getStructureROIByMajorBrainRegionId = async (req, res) => {
    redundantCRUD.getObjectsByLocation(req, res, StructureROI, "majorBrainRegionId", ["lobeId"], false, false);
};

const getStructureROIByLobeId = async (req, res) => {
    redundantCRUD.getObjectsByLocation(req, res, StructureROI, "lobeId", [], false, false);
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
    getStructureROIByName,
    getStructureROIByMajorBrainRegionId,
    getStructureROIByLobeId,
    createStructureROI,
    updateStructureROIById,
    deleteStructureROIById,
};
