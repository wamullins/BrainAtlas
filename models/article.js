const { Schema } = require("mongoose");

const articleSchema = new Schema(
    {
        title: { type: String, require: true },
        abstract: { type: String, require: true },
        url: { type: String, require: true },
        citation: { type: String, require: true },
        majorBrainRegionID: { type: Schema.Types.ObjectId, ref: "MajorBrainRegion", require: true },
        lobeID: { type: Schema.Types.ObjectId, ref: "Lobe", require: true },
        structureROIID: { type: Schema.Types.ObjectId, ref: "StructureROI", require: true },
    },
    { timestamps: true }
);

module.exports = articleSchema;
