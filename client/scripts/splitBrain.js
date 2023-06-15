//// ESTABLISH DOM THINGS ////
const majorBrainRegionTitle = document.getElementById("majorBrainRegionTitle"); //populated with axios
const structureTitle = document.getElementById("structureTitle");
const navigationBrain = document.getElementById("navagationBrain"); //populated by the functions I'm going to make below
const informationBox = document.getElementById("informationBox"); //populated with axios using functions in the class
const relatedArticlesBox = document.getElementById("relatedArticlesBox");
// article submission things
const submitArticleBox = document.getElementById("submitArticleBox");
const titleInput = document.getElementById("titleInput");
const abstractInput = document.getElementById("abstractInput");
const urlInput = document.getElementById("urlInput");
const citationInput = document.getElementById("citationInput");
const articleSubmit = document.getElementById("articleSubmit");
const thankYou = document.getElementById("thankYou");
const closeSubmit = document.getElementById("closeSubmit");

/// Constant to be fed into the article submission ///

let currentInfoId = [undefined, undefined];

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
        return `Title: <span id="articleTitleText">${this.title}</span><br><br>
        Abstract: <span id="descriptionText">${this.abstract}</span><br><br>
        Citation: <span id="citationText">${this.citataion}</span><br><br>
        Url: <a id="descriptionSource" href="${this.url}">${this.url}</a>`;
    }
}

//// EVENT LISTENERS ////

articleSubmit.addEventListener("click", () => createNewArticle());
closeSubmit.addEventListener("click", () => closeSubmitWindow());

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
        <img id="forebrainMainNav" name="Forebrain" class="navButton" src="imgs/ForebrainBaseModel.png"/>
        <a id="frontalLobeLink" name="Frontal Lobe" href="lobePage.html"><img src="imgs/FrontalModel.png"/></a>
        <a id="parietalLobeLink" name="Parietal Lobe" href="lobePage.html"><img src="imgs/ParietalModel.png"/></a>
        <a id="temporalLobeLink" name="Temporal Lobe" href="lobePage.html"><img src="imgs/TemporalModel.png"/></a>
        <a id="occipitalLobeLink" name="Occipital Lobe" href="lobePage.html"><img src="imgs/OccipitalModel.png"/></a>
        <img id="thalamusNav" name="Thalamus" class="navButton" src="imgs/ThalamusModel.png"/>
        <img id="hypothalamusNav" name="Hypothalamus" class="navButton" src="imgs/HypothalamusModel.png"/>
        <img id="amygdalaNav" name="Amygdala" class="navButton" src="imgs/AmygdalaModel.png"/>
        <img id="hippocampusNav" name="Hippocampus" class="navButton" src="imgs/HippocampusModel.png"/>
        <img id="pituitaryGlandNav" name="Pituitary Gland" class="navButton" src="imgs/PituitaryGlandModel.png"/>
        <img id="corpusCollosumNav" name="Corpus Collosum" class="navButton" src="imgs/CorpusModel.png"/>
        <img id="basalGangliaNav" name="Basal Ganglia" class="navButton" src="imgs/BasalModel.png"/>`;
    } else if (mbrObject.name === "Midbrain") {
        navigationBrain.innerHTML = `<div id="navHoverText"></div>
            <img id="midbrainMainNav" name="Midbrain" class="navButton" src="imgs/MidbrainBaseModel.png"/>
            <img id="colliculiNav" name="Colliculi" class="navButton" src="imgs/ColliculiModel.png"/>
            <img id="tectumNav" name="Tectum" class="navButton" src="imgs/TectumModel.png"/>
            <img id="tegmentumNav" name="Tegmentum" class="navButton" src="imgs/TegmentumModel.png"/>`;
    } else if (mbrObject.name === "Hindbrain") {
        navigationBrain.innerHTML = `<div id="navHoverText"></div>
            <img id="hindbrainMainNav" name="Hindbrain" class="navButton" src="imgs/HindbrainBaseModel.png"/>
            <img id="ponsNav" name="Pons" class="navButton" src="imgs/PonsModel.png"/>
            <img id="cerebellumNav" name="Cerebellum" class="navButton" src="imgs/CerebellumModel.png"/>
            <img id="medullaOblongataNav" name="Medulla Oblongata" class="navButton" src="imgs/MedullaModel.png"/>`;
    }

    const navHoverText = document.getElementById("navHoverText");
    //set up session storage for the lobe page setup
    const lobeLinks = document.querySelectorAll("#navagationBrain > a");
    lobeLinks.forEach(function (lobe) {
        lobe.addEventListener("click", () => {
            sessionStorage.setItem("lobe", lobe.name);
        });
        lobe.addEventListener("mouseover", () => (navHoverText.innerHTML = lobe.name));
    });

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
        btn.addEventListener("mouseover", () => (navHoverText.innerHTML = btn.name));
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const populateForMajorBrainRegion = async (mbrObject) => {
    currentInfoId = ["majorBrainRegionId", mbrObject._id];

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
    currentInfoId = ["structureROIId", structure._id];
    console.log(currentInfoId);

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
const closeSubmitWindow = () => {
    submitArticleBox.setAttribute("class", "hidden");
};

const createNewArticle = async () => {
    // checks the currentinfoId to see which brain region to attach the article to
    let mbrId = currentInfoId[0] === "majorBrainRegionId" ? currentInfoId[1] : null;
    let lId = currentInfoId[0] === "lobeId" ? currentInfoId[1] : null;
    let strucId = currentInfoId[0] === "structureROIId" ? currentInfoId[1] : null;

    if (
        titleInput.value &&
        abstractInput.value &&
        urlInput.value &&
        citationInput.value
        // && typeof titleInput.value === "string" &&
        // typeof abstractInput.value === "string" &&
        // typeof urlInput.value === "string" &&
        // typeof citationInput.value === "string" // for some reason this was working with numebrs so I'm not going to worry about it for now
    ) {
        await axios.post("http://localhost:3001/api/articles", {
            title: titleInput.value,
            abstract: abstractInput.value,
            url: urlInput.value,
            citation: citationInput.value,
            majorBrainRegionId: mbrId,
            lobeId: lId,
            structureROIId: strucId,
            approved: false,
        });
        console.log("posting submission");

        articleSubmit.setAttribute("class", "hidden");
        thankYou.classList = [];

        setTimeout(() => {
            submitArticleBox.setAttribute("class", "hidden");
        }, 1500);
    } else {
        console.log("invalid article inputs. All fields must be strings.");
    }
};

init();

//// depending on how long the above takes -> begin working on styling (if the above takes a while) and scrap lobe functionality or complete the lobes if it doesn't take forever. lobe page will be almost identicle to the splt brain page though so maybe it's not worth cutting
