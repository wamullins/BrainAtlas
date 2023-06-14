//// ESTABLISH DOM THINGS ////
const adminLoginBox = document.getElementById("adminLoginBox");
const usernameBox = document.getElementById("usernameBox");
const passwordBox = document.getElementById("passwordBox");
const loginBtn = document.getElementById("loginButton");
const adminArticleReview = document.getElementById("adminArticleReview");
const radios = document.querySelectorAll('input[name="articleSelector"]');
const regionPrompts = document.getElementById("regionPrompts");
const adminInsepctor = document.getElementById("adminInspector");
const adminObjectList = document.getElementById("adminObjectList");

//// ESTABLISH ADDITIONAL VARIABLES ////

let adminAccounts = [
    {
        username: "admin1",
        password: "password1",
    },
    {
        username: "admin2",
        password: "password2",
    },
    {
        username: "admin3",
        password: "password3",
    },
];

let articleRoute;
let regionRoute;

//// Classes ////

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
        return `<div id="${this._id}" class="adminArticleBox">${this.citation}</div>`;
    }
    informationBoxFill() {
        return `Title: <span id="articleTitleText">${this.title}</span><br><br>Abstract: <span id="descriptionText">${this.abstract}</span><br><br>
        Citation: <span id="citationText">${this.citataion}</span><br><br>Url: <a id="descriptionSource" href="${this.url}">${this.url}</a>`;
    }
}

//// EVENT LISTENERS ////
loginBtn.addEventListener("click", () => loginAdmin());

radios.forEach(function (radio) {
    radio.addEventListener("click", () => initialClick());
});

//// FUNCTIONS ////

const loginAdmin = () => {
    console.log("Attempting Login");

    let admin = adminAccounts.find((admin) => admin.username === usernameBox.value);
    if (!admin) {
        console.log("Username Not Found");
        return;
    }
    if (admin.password === passwordBox.value) {
        console.log(`logging in ${admin.username}`);

        // make the login box hidden while bringing up the review box
        adminLoginBox.setAttribute("class", "hidden");
        adminArticleReview.classList = [];
    } else {
        console.log("Incorrect Password");
    }
};

const initialClick = () => {
    radios.forEach(function (radio) {
        articleRoute = radio.checked ? radio.value : articleRoute;
        regionRoute = radio.checked ? radio.id : regionRoute;
    });
    regionPrompts.innerHTML =
        articleRoute === "unapproved"
            ? `<button id="findButton">Find</button>`
            : `<input id="whichArea" type="text" placeholder="Which?"/><button id="findButton">Find</button>`;

    const findButton = document.getElementById("findButton");

    findButton.addEventListener("click", () => findButtonPress(articleRoute, regionRoute));
};

const findButtonPress = async (articleRoute, regionRoute) => {
    if (articleRoute === "unapproved") {
        queryArticles(articleRoute, "");
    } else {
        const whichArea = document.getElementById("whichArea").value;

        const response = await axios.get(`http://localhost:3001/api/${regionRoute}/name/${whichArea}`);
        console.log(response.data[0]); /// cant figure out why the response is two things and therefore needs the 0
        queryArticles(articleRoute, response.data[0]._id);
    }
};

const queryArticles = async (articleRoute, id) => {
    let response = await axios.get(`http://localhost:3001/api/articles/${articleRoute}/${id}`);

    // this is pretty much the exact same as with the split brain populating
    let allArticles = response.data;

    console.log(allArticles);

    let relatedArticles = new Array(allArticles.length);

    adminObjectList.innerHTML = "";

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
        adminObjectList.innerHTML += relatedArticles[index].citationFill();
    });

    const shownArticles = document.querySelectorAll(".adminArticleBox");
    shownArticles.forEach((article) => {
        article.addEventListener("click", () => {
            adminInsepctor.innerHTML = relatedArticles.find((art) => art._id === article.id).informationBoxFill();
        });
    });
};
