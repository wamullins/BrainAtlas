const db = require("../db");
const { Article, Lobe, MajorBrainRegion, StructureROI } = require("../models");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const createMajorBrainRegions = async () => {
    const majorBrainRegions = [
        new MajorBrainRegion({
            name: "Forebrain",
            description: "This is the forebrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        }),
        new MajorBrainRegion({
            name: "Midbrain",
            description: "This is the midbrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        }),
        new MajorBrainRegion({
            name: "Hindbrain",
            description: "This is the hindbrain",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
        }),
    ];

    await MajorBrainRegion.insertMany(majorBrainRegions);
    console.log("created major brain regions");
    return majorBrainRegions;
};

const createLobes = async (majorBrainRegions) => {
    // creates a new key value pairing wehre the key is the name and the value is the whole object
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));

    const lobes = [
        new Lobe({
            name: "Frontal Lobe",
            description: "this is the frontal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Parietal Lobe",
            description: "this is the parietal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Temporal Lobe",
            description: "this is the temporal lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Occipital Lobe",
            description: "this is the occipital lobe",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile: "https://www.brainline.org/sites/all/modules/custom/bl_brain/images/brain-lateral.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
    ];

    await Lobe.insertMany(lobes);
    console.log("created lobes");
    return lobes;
};

const createStructureROIs = async (majorBrainRegions, lobes) => {
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));
    const lobeMap = new Map(lobes.map((lobe) => [lobe.name, lobe._id]));

    const structureROIs = [
        /// additional forebrain structures
        new StructureROI({
            name: "Thalamus",
            description: "this is the thalamus",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Hypothalamus",
            description: "this is the hypothalamus",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Amygdala",
            description: "this is the amygdala",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Hippocampus",
            description: "this is the hippocampus",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Pituitary Gland",
            description: "this is the pituitary gland",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Corpus Collosum",
            description: "this is the amygdala",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Basal Ganglia",
            description: "thess are the basal ganglia",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),

        /// lobe specific forebrain structures

        new StructureROI({
            name: "Prefrontal cortex",
            description: "this the prefrontal cortex",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Frontal Lobe"),
        }),
        new StructureROI({
            name: "Brocca's Area",
            description: "this Brocca's Area",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Frontal Lobe"),
        }),

        new StructureROI({
            name: "Somatosensory cortex",
            description: "this the somatosensory cortex",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Parietal Lobe"),
        }),
        new StructureROI({
            name: "Angular Gyrus",
            description: "this the Angular Gyrus",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Parietal Lobe"),
        }),

        new StructureROI({
            name: "Superior Temporal Gyrus",
            description: "this the superior temporal gyrus",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Temporal Lobe"),
        }),

        new StructureROI({
            name: "Temporal Pole",
            description: "this the temporal pole",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Temporal Lobe"),
        }),

        new StructureROI({
            name: "Primary Visual Cortex",
            description: "this the primary visual cortex",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Occipital Lobe"),
        }),
        new StructureROI({
            name: "Secondary Visual Cortex",
            description: "this the secondary visual cortex.",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Occipital Lobe"),
        }),

        /// midbrain structures
        new StructureROI({
            name: "Colliculi",
            description: "thess are the colliculi",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Tectum",
            description: "this is the tectum",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Tegmentum",
            description: "this is the tegmentum",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        /// hindbrain structures
        new StructureROI({
            name: "Pons",
            description: "this is the pons",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Cerebellum",
            description: "this is the cerebellum",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Medulla Oblongata",
            description: "this is the medulla oblongata",
            descriptionCitation: "https://www.wikipedia.org/",
            highlightImageFile:
                "https://www.brainlab.org/wp-content/uploads/2015/06/BrainlabOrg_Illustrations_BDR_21APR15_Page_14.png",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
    ];

    await StructureROI.insertMany(structureROIs);
    console.log("created Structures and ROIs");
    return structureROIs;
};

const createArticles = async (majorBrainRegions, lobes, structureROIs) => {
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));
    const lobeMap = new Map(lobes.map((lobe) => [lobe.name, lobe._id]));
    const structureROIMap = new Map(structureROIs.map((str) => [str.name, str._id]));

    const articles = [
        new Article({
            title: "Article about the frontal lobe",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: null,
            lobeId: lobeMap.get("Frontal Lobe"),
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 2 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 3 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 4 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: false,
        }),
        new Article({
            title: "Article about the Hippocampus",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: null,
            lobeId: null,
            structureROIId: structureROIMap.get("Hippocampus"),
            approved: true,
        }),
    ];
    await Article.insertMany(articles);
    console.log("created articles");
};

const run = async () => {
    await MajorBrainRegion.deleteMany({});
    await Lobe.deleteMany({});
    await StructureROI.deleteMany({});
    await Article.deleteMany({}); /////////////
    const majorBrainRegions = await createMajorBrainRegions();
    const lobes = await createLobes(majorBrainRegions);
    const structureROIs = await createStructureROIs(majorBrainRegions, lobes);
    await createArticles(majorBrainRegions, lobes, structureROIs);
    db.close();
};

run();
