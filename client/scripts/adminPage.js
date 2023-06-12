//// ESTABLISH DOM THINGS ////
const adminLoginBox = document.getElementById("adminLoginBox");
const usernameBox = document.getElementById("usernameBox");
const passwordBox = document.getElementById("passwordBox");
const loginBtn = document.getElementById("loginButton");
const adminArticleReview = document.getElementById("adminArticleReview");

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

//// EVENT LISTENERS ////
loginBtn.addEventListener("click", () => loginAdmin());

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
