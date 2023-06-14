//// ESTABLISH DOM THINGS ////
const majorBrainRegionTitle = document.getElementById("majorBrainRegionTitle"); //populated with axios
const structureTitle = document.getElementById("structureTitle");
const navigationBrain = document.getElementById("navagationBrain"); //populated by the functions I'm going to make below
const informationBox = document.getElementById("informationBox"); //populated with axios using functions in the class
const relatedArticlesBox = document.getElementById("relatedArticlesBox");
const initialSubmitArticleButton = document.getElementById("initialSubmitArticleButton");
const submitArticleBox = document.getElementById("submitArticleBox");

//// ESTABLISH ADDITIONAL VARIABLES ////

const majorRegion = sessionStorage.getItem("majorBrainRegion");

// taken from how kevin used constructors in the meta bikes assignment to unpack information from the database all at once into a single object
class MajorBrainRegion {
    constructor(_id, name, description, descriptionCitation, highlightImageFile) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.descriptionCitation = descriptionCitation;
        this.highlightImageFile = highlightImageFile;
    }
    structureTitleFill() {
        return `${this.name}`;
    }
    informationBoxFill() {
        return `Description: <span id="descriptionText">${this.description}</span><br><br>
        Source: <a id="descriptionSource" href="${this.descriptionCitation}">${this.descriptionCitation}</a><br><br>
        <img src="${this.highlightImageFile}"/>`;
    }
}

class StructureROI {
    constructor(_id, name, description, descriptionCitation, highlightImageFile, majorBrainRegion, lobeId) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.descriptionCitation = descriptionCitation;
        this.highlightImageFile = highlightImageFile;
        this.majorBrainRegion = majorBrainRegion;
        this.lobeId = lobeId;
    }
    structureTitleFill() {
        return `${this.name}`;
    }
    informationBoxFill() {
        return `Description: <span id="descriptionText">${this.description}</span><br><br>
        Source: <a id="descriptionSource" href="${this.descriptionCitation}">${this.descriptionCitation}</a><br><br>
        <img src="${this.highlightImageFile}"/>`;
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
        return `<div >${this.citation}</div>`;
    }
    informationBoxFill() {
        return `Abstract: <span id="descriptionText">${this.abstract}</span><br><br>
        Citation: <span id="citationText>${this.citataion}</span><br><br>
        Url: <a id="descriptionSource" href="${this.url}">${this.url}</a>`;
    }
}

//// EVENT LISTENERS ////

initialSubmitArticleButton.addEventListener("click", () => showArticleSubmission());

//// FUNCTIONS ////

const init = async (majorBrainRegion) => {
    // axios things to populate the other divs using functions from the classes above
    console.log(majorBrainRegion);
    // get the three main brain regions
    const response = await axios.get("http://localhost:3001/api/brains/");
    const allMBRObjects = response.data;

    // identify which brain region needs to be used here and set the main title
    const mbrObject = allMBRObjects.find((mbr) => mbr.name.toLowerCase() === majorBrainRegion);
    majorBrainRegionTitle.innerHTML = `${mbrObject.name}`;

    // deconstruct the object and create a new majorBrainRegion instance and quickly fill in the page
    const { _id, name, description, descriptionCitation, highlightImageFile } = mbrObject;
    const selectedMBR = new MajorBrainRegion(_id, name, description, descriptionCitation, highlightImageFile);
    structureTitle.innerHTML = selectedMBR.structureTitleFill();
    informationBox.innerHTML = selectedMBR.informationBoxFill();

    populateRelatedArticles("majorBrainRegion", selectedMBR._id);

    if (majorBrainRegion === "forebrain") {
        ///function to set up the navigationBrain
    } else if (majorBrainRegion === "midbrain") {
    } else if (majorBrainRegion === "hindbrain") {
    }
};

const populateRelatedArticles = async (route, id) => {
    // route can be any of the get routes in the articleRtouer
    const response = await axios.get(`http://localhost:3001/api/articles/${route}/${id}`);
    const allArticles = response.data;

    console.log(allArticles);

    allArticles.forEach((article) => {
        const { _id, title, abstract, url, citation, majorBrainRegionId, lobeId, structureROIId, approved } = article;
        const relatedArticle = new Article(
            _id,
            title,
            abstract,
            url,
            citation,
            majorBrainRegionId,
            lobeId,
            structureROIId,
            approved
        );
        relatedArticlesBox.innerHTML += relatedArticle.citationFill();
        // const articleBox = document.getElementById(_id);
        // articleBox.addEventListener("click", () => {
        //     informationBox.innerHTML = relatedArticle.informationBoxFill();
        // });
    });

    // create the event listeners here for the articles so that when they are clicked they just immediatly use this data to populate the fields (no second database query needed)
};

const showArticleSubmission = () => {
    submitArticleBox.classList = [];
};

init(majorRegion);
