const { Schema } = require("mongoose");

const structureROISchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        descriptionCitation: { type: String, require: true },
        highlightImageFile: { type: String, require: true },
        majorBrainRegionId: { type: Schema.Types.ObjectId, ref: "MajorBrainRegion", require: true },
        lobeId: { type: Schema.Types.ObjectId, ref: "Lobe", require: true },
    },
    { timestamps: true }
);

module.exports = structureROISchema;
