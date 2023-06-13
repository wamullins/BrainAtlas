//// ESTABLISH DOM THINGS ////

const majorBrainRegionTitle = document.getElementById("majorBrainRegionTitle"); //populated with axios
const navigationBrain = document.getElementById("navagationBrain"); //populated by the functions I'm going to make below
const informationBox = document.getElementById("informationBox"); //populated with axios using functions in the class
const relatedArticlesBox = document.getElementById("relatedArticlesBox");

//// ESTABLISH ADDITIONAL VARIABLES ////

const splitBrainParts = {
    forebrain: [],
    midbrain: [],
    hindbrain: [],
};

// taken from how kevin used constructors in the meta bikes assignment to unpack information from the database all at once into a single object
class MajorBrainRegion {
    constructor(_id, name, description, descriptionCitation, highlightImageFile) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.descriptionCitation = descriptionCitation;
        this.highlightImageFile = highlightImageFile;
    }
    informationBoxFill() {
        return ``;
    }
}

class Article {
    constructor(_id, title, abstract, url, citation, majorBrainRegionId, lobeId, structureROIId, approved) {
        this._id = _id;
        this.title = title;
        this.abstract = abstract;
        this.url = url;
        this.citation = citation;
        this.majorBrainRegionId = majorBrainRegionId;
        this.lobeId = lobeId;
        this.structureROIId = structureROIId;
        this.approved = approved;
    }
    citationFill() {
        return ``;
    }
    informationBoxFill() {
        return ``;
    }
}

const majorRegion = sessionStorage.getItem("majorBrainRegion");
//// EVENT LISTENERS ////

//// FUNCTIONS ////

const init = (majorBrainRegion) => {
    console.log(majorBrainRegion);
    if (majorBrainRegion === "forebrain") {
        ///function to set up the navigationBrain and axios things to populate the other divs using functions from the classes above
    } else if (majorBrainRegion === "midbrain") {
    } else if (majorBrainRegion === "hindbrain") {
    }
};

init(majorRegion);
