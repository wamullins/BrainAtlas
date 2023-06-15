//// ESTABLISH DOM THINGS ////
const majorBrainRegions = document.querySelectorAll("#majorBrainRegionDiv > a > img");
const hoverText = document.getElementById("majorBrainHoverText");

//// ESTABLISH ADDITIONAL VARIABLES ////

//// EVENT LISTENERS ////
majorBrainRegions.forEach(function (region) {
    region.addEventListener("click", () => storeRegion(region));
    region.addEventListener("mouseover", () => (hoverText.innerHTML = region.name));
    region.addEventListener("mouseout", () => (hoverText.innerHTML = "Select A Region"));
});

//// FUNCTIONS ////

const storeRegion = (region) => {
    sessionStorage.setItem("majorBrainRegion", region.id);
    console.log(region.id);
};
