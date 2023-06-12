const db = require("../db");
const { Article, Lobe, MajorBrainRegion, StructureROI } = require("../models");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const createMajorBrainRegions = async () => {
    const majorBrainRegions = [
        {
            name: "Forebrain",
            description: "This is the forebrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        },
        {
            name: "Midbrain",
            description: "This is the midbrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        },
        {
            name: "Hindbrain",
            description: "This is the hindbrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        },
    ];
    await MajorBrainRegion.insertMany(majorBrainRegions);
    console.log("created major brain regions");
};

const createLobes = async (majorBrainRegions) => {
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region]));

    const lobes = [
        {
            name: "Frontal Lobe",
            description: "this is the frontal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionID: majorBrainRegionMap.get("Forebrain"),
        },
        {
            name: "Parietal Lobe",
            description: "this is the parietal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionID: majorBrainRegionMap.get("Forebrain"),
        },
        {
            name: "Temporal Lobe",
            description: "this is the temporal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionID: majorBrainRegionMap.get("Forebrain"),
        },
        {
            name: "Occipital Lobe",
            description: "this is the occipital lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionID: majorBrainRegionMap.get("Forebrain"),
        },
    ];
    await Lobe.insertMany(lobes);
    console.log("created lobes");
};

const createStructureROIs = async (majorBrainRegions, lobes) => {
    const structureROIs = [];
    await StructureROI.insertMany(structureROIs);
    console.log("created Structures and ROIs");
};

const createArticles = async (majorBrainRegions, lobes, structureROIs) => {
    const articles = [];
    await Article.insertMany(articles);
    console.log("created articles");
};

const run = async () => {
    await MajorBrainRegion.deleteMany({});
    await Lobe.deleteMany({});
    await StructureROI.deleteMany({});
    const majorBrainRegions = await createMajorBrainRegions();
    const lobes = await createLobes(majorBrainRegions);
    const structureROIs = await createStructureROIs(majorBrainRegions, lobes);
    await createArticles(majorBrainRegions, lobes, structureROIs);
    db.close();
};

run();
