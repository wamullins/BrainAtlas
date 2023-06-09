const mongoose = require("mongoose");
const articleSchema = require("./article");
const lobeSchema = require("./lobe");
const majorBrainRegionSchema = require("./majorBrainRegion");
const structureROISchema = require("./structureROI");

// creatign the reference for the collections
const Article = mongoose.model("Article", articleSchema);
const Lobe = mongoose.model("Lobe", lobeSchema);
const MajorBrainRegion = mongoose.model("MajorBrainRegion", majorBrainRegionSchema);
const StructureROI = mongoose.model("StructureROI", structureROISchema);

module.exports = { Article, Lobe, MajorBrainRegion, StructureROI };
