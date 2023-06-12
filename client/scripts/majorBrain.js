//// ESTABLISH DOM THINGS ////
const majorBrainRegions = document.querySelectorAll("#majorBrainRegionDiv > a > img");

//// ESTABLISH ADDITIONAL VARIABLES ////

//// EVENT LISTENERS ////
majorBrainRegions.forEach(function (region) {
    region.addEventListener("click", () => storeRegion(region));
});

//// FUNCTIONS ////

const storeRegion = (region) => {
    sessionStorage.setItem("majorBrainRegion", region.id);
    console.log(region.id);
};
