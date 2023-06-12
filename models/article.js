const { Schema } = require("mongoose");

const articleSchema = new Schema(
    {
        title: { type: String, require: true },
        abstract: { type: String, require: true },
        url: { type: String, require: true },
        citation: { type: String, require: true },
        majorBrainRegionId: { type: Schema.Types.ObjectId, ref: "MajorBrainRegion", require: true },
        lobeId: { type: Schema.Types.ObjectId, ref: "Lobe", require: true },
        structureROIId: { type: Schema.Types.ObjectId, ref: "StructureROI", require: true },
        approved: { type: Boolean, req: true },
    },
    { timestamps: true }
);

module.exports = articleSchema;
