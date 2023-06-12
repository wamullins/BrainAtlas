//// ESTABLISH DOM THINGS ////
const mainBrain = document.getElementById("mainBrain");
const exploreMsg = document.getElementById("exploreMsg");

//// ESTABLISH ADDITIONAL VARIABLES ////

//// EVENT LISTENERS ////

mainBrain.addEventListener("mouseover", () => showExplore());
mainBrain.addEventListener("mouseout", () => hideExplore());

//// FUNCTIONS ////

const showExplore = () => {
    exploreMsg.classList = [];
    console.log("hi");
};
const hideExplore = () => {
    exploreMsg.setAttribute("class", "hidden");
};
