const { MajorBrainRegion } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getMajorBrainRegions = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, MajorBrainRegion);
};

const getMajorBrainRegionById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, MajorBrainRegion);
};

//// admin functions ////

const createMajorBrainRegion = async (req, res) => {
    redundantCRUD.createObject(req, res, MajorBrainRegion);
};

const updateMajorBrainRegion = async (req, res) => {
    redundantCRUD.updateObjectByID(req, res, MajorBrainRegion);
};

const deleteMajorBrainRegion = async (req, res) => {
    redundantCRUD.deleteObjectByID(req, res, MajorBrainRegion);
};

module.exports = {
    getMajorBrainRegions,
    getMajorBrainRegionById,
    createMajorBrainRegion,
    updateMajorBrainRegion,
    deleteMajorBrainRegion,
};
