const { Schema } = require("mongoose");

const lobeSchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        descriptionCitation: { type: String, require: true },
        highlightImageFile: { type: String, require: true },
        majorBrainRegionID: { type: Schema.Types.ObjectId, ref: "MajorBrainRegion", require: true },
    },
    { timestamps: true }
);
