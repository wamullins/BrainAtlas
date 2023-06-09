const { Schema } = require("mongoose");

const majorBrainRegionSchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        descriptionCitation: { type: String, require: true },
        highlightImageFile: { type: String, require: true },
    },
    { timestamps: true }
);

module.exports = majorBrainRegionSchema;
