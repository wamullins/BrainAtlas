//// ESTABLISH DOM THINGS ////
const majorBrainRegionTitle = document.getElementById("majorBrainRegionTitle"); //populated with axios
const structureTitle = document.getElementById("structureTitle");
const navigationBrain = document.getElementById("navagationBrain"); //populated by the functions I'm going to make below
const informationBox = document.getElementById("informationBox"); //populated with axios using functions in the class
const relatedArticlesBox = document.getElementById("relatedArticlesBox");
const submitArticleBox = document.getElementById("submitArticleBox");

/// Classes ////

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
        return `<div id="${this._id}" class="articleBox">${this.citation}</div>`;
    }
    informationBoxFill() {
        return `Abstract: <span id="descriptionText">${this.abstract}</span><br><br>
        Citation: <span id="citationText>${this.citataion}</span><br><br>
        Url: <a id="descriptionSource" href="${this.url}">${this.url}</a>`;
    }
}

//// EVENT LISTENERS ////

//event listener for the article submission once it pops up.

//// FUNCTIONS ////

const init = async () => {
    // axios things to populate the other divs using functions from the classes above
    const majorRegion = sessionStorage.getItem("majorBrainRegion");

    console.log(majorRegion);
    // get the three main brain regions
    const response = await axios.get("http://localhost:3001/api/brains/");
    const allMBRObjects = response.data;

    // identify which brain region needs to be used here and set the main title
    const mbrObject = allMBRObjects.find((mbr) => mbr.name.toLowerCase() === majorRegion);

    pageSetup(mbrObject);

    populateForMajorBrainRegion(mbrObject);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pageSetup = async (mbrObject) => {
    if (mbrObject.name === "Forebrain") {
        /// unsure about the lobes and how I'll need to name id, and whatnot in order to properly format the css for it
        navigationBrain.innerHTML = `<div id="navHoverText"></div>
        <img id="forebrainMainNav" name="Forebrain" class="navButton" src="imgs/midbrain_potato.png"/>
        <a id="frontalLobeLink" name="Frontal Lobe" href="lobePage.html"><img src="imgs/midbrainPiece.png"/></a>
        <a id="parietalLobeLink" name="Parietal Lobe" href="lobePage.html"><img src="imgs/midbrainPiece.png"/></a>
        <a id="temporalLobeLink" name="Temporal Lobe" href="lobePage.html"><img src="imgs/midbrainPiece.png"/></a>
        <a id="occipitalLobeLink" name="Occipital Lobe" href="lobePage.html"><img src="imgs/midbrainPiece.png"/></a>
        <img id="thalamusNav" name="Thalamus" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="hypothalamusNav" name="Hypothalamus" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="amygdalaNav" name="Amygdala" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="hippocampusNav" name="Hippocampus" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="pituitaryGlandNav" name="Pituitary Gland" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="corpusCollosumNav" name="Corpus Collosum" class="navButton" src="imgs/midbrainPiece.png"/>
        <img id="casalGangliaNav" name="Basal Ganglia" class="navButton" src="imgs/midbrainPiece.png"/>`;
    } else if (mbrObject.name === "Midbrain") {
        navigationBrain.innerHTML = `<div id="navHoverText"></div>
            <img id="midbrainMainNav" name="Midbrain" class="navButton" src="imgs/midbrain_potato.png"/>
            <img id="colliculiNav" name="Colliculi" class="navButton" src="imgs/midbrainPiece.png"/>
            <img id="tectumNav" name="Tectum" class="navButton" src="imgs/midbrainPiece.png"/>
            <img id="tegmentumNav" name="Tegmentum" class="navButton" src="imgs/midbrainPiece.png"/>
            <img id="cerebrealPendunclesNav" name="Cerebral Penduncles" class="navButton" src="imgs/midbrainPiece.png"/>`;
    } else if (mbrObject.name === "Hindbrain") {
        navigationBrain.innerHTML = `<div id="navHoverText"></div>
            <img id="hindbrainMainNav" name="Hindbrain" class="navButton" src="imgs/midbrain_potato.png"/>
            <img id="ponsNav" name="Pons" class="navButton" src="imgs/midbrainPiece.png"/>
            <img id="cerebellumNav" name="Cerebellum" class="navButton" src="imgs/midbrainPiece.png"/>
            <img id="medullaOblongataNav" name="Medulla Oblongata" class="navButton" src="imgs/midbrainPiece.png"/>`;
    }
    // get all the structure objects connected to the mbr
    const reponse = await axios.get(`http://localhost:3001/api/structures/majorBrainRegion/${mbrObject._id}`);
    const structures = reponse.data;
    console.log(structures);

    // identify all navButtons on in the nav box
    const navButtons = document.querySelectorAll(".navButton");
    navButtons.forEach((btn) => {
        if (btn.name !== mbrObject.name) {
            btn.addEventListener("click", () => populateForStructureROI(btn.name, structures));
        } else {
            btn.addEventListener("click", () => populateForMajorBrainRegion(mbrObject));
        }
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const populateForMajorBrainRegion = async (mbrObject) => {
    majorBrainRegionTitle.innerHTML = `${mbrObject.name}`;

    // deconstruct the object and create a new majorBrainRegion instance and quickly fill in the page
    const { _id, name, description, descriptionCitation, highlightImageFile } = mbrObject;
    const selectedMBR = new MajorBrainRegion(_id, name, description, descriptionCitation, highlightImageFile);
    structureTitle.innerHTML = selectedMBR.structureTitleFill();
    informationBox.innerHTML = selectedMBR.informationBoxFill();

    populateRelatedArticles("majorBrainRegion", selectedMBR._id);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const populateForStructureROI = (strucName, structures) => {
    console.log(strucName);

    // identify which brain structure needs to be used here and set the structure title
    const structure = structures.find((struc) => struc.name === strucName);
    console.log(structure);

    // // deconstruct the object and create a new majorBrainRegion instance and quickly fill in the page
    const { _id, name, description, descriptionCitation, highlightImageFile, majorBrainRegion, lobeId } = structure;
    const structureROI = new StructureROI(
        _id,
        name,
        description,
        descriptionCitation,
        highlightImageFile,
        majorBrainRegion,
        lobeId
    );
    structureTitle.innerHTML = structureROI.structureTitleFill();
    informationBox.innerHTML = structureROI.informationBoxFill();

    populateRelatedArticles("structureROI", structureROI._id);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const populateRelatedArticles = async (route, id) => {
    // route can be any of the get routes in the articleRtouer
    const response = await axios.get(`http://localhost:3001/api/articles/${route}/${id}`);
    const allArticles = response.data;

    relatedArticlesBox.innerHTML = `
        <div id="initialSubmitArticleButton">
            <img src="imgs/plusIcon.png" id="plusIcon" />
            Submit an Article
        </div>`;

    let relatedArticles = new Array(allArticles.length);

    allArticles.forEach((article, index) => {
        const { _id, title, abstract, url, citation, majorBrainRegionId, lobeId, structureROIId, approved } = article;
        relatedArticles[index] = new Article(
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
        relatedArticlesBox.innerHTML += relatedArticles[index].citationFill();
    });

    // select all of the newly created boxes and add an event listener which goes back into the shownArticle array and calls the class functions
    const shownArticles = document.querySelectorAll(".articleBox");
    shownArticles.forEach((article) => {
        article.addEventListener("click", () => {
            informationBox.innerHTML = relatedArticles.find((art) => art._id === article.id).informationBoxFill();
        });
    });

    // set function on click for the submit button. doing this earlier caused weird errors
    const initialSubmitArticleButton = document.getElementById("initialSubmitArticleButton");
    initialSubmitArticleButton.addEventListener("click", () => showArticleSubmission());
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showArticleSubmission = () => {
    submitArticleBox.classList = [];
};

init();
