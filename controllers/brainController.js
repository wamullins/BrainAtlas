const { MajorBrainRegion } = require("../models");
const redundantCRUD = require("./redundantCRUD");

const getMajorBrainRegions = async (req, res) => {
    redundantCRUD.getAllObjectsInCollection(req, res, MajorBrainRegion);
};

const getMajorBrainRegionById = async (req, res) => {
    redundantCRUD.getObjectById(req, res, MajorBrainRegion);
};

const getMajorBrainRegionByName = async (req, res) => {
    redundantCRUD.getObjectByName(req, res, MajorBrainRegion);
};

//// admin functions ////

const createMajorBrainRegion = async (req, res) => {
    redundantCRUD.createObject(req, res, MajorBrainRegion);
};

const updateMajorBrainRegionById = async (req, res) => {
    redundantCRUD.updateObjectById(req, res, MajorBrainRegion);
};

const deleteMajorBrainRegionById = async (req, res) => {
    redundantCRUD.deleteObjectById(req, res, MajorBrainRegion);
};

module.exports = {
    getMajorBrainRegions,
    getMajorBrainRegionById,
    getMajorBrainRegionByName,
    createMajorBrainRegion,
    updateMajorBrainRegionById,
    deleteMajorBrainRegionById,
};
