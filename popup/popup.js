console.log("hello")
const homePageToggle = document.getElementById("homePageToggle");
const sideBarToggle = document.getElementById("sideBarToggle");
const recommendationsToggle = document.getElementById("recommendationsToggle");
const commentsToggle = document.getElementById("commentsToggle");

homePageToggle.addEventListener("change", (e) => {
    chrome.storage.local.set({
        homePageEnabled: e.target.checked
    });
});

sideBarToggle.addEventListener("change", (e) => {
    chrome.storage.local.set({
        sideBarEnabled: e.target.checked
    });
});

recommendationsToggle.addEventListener("change", (e) => {
    chrome.storage.local.set({
        recommendationsEnabled: e.target.checked
    });
});

commentsToggle.addEventListener("change", (e) => {
    chrome.storage.local.set({
        commentsEnabled: e.target.checked
    });
});
if (chrome.storage.local.get("homePageEnabled", (data) => {
    homePageToggle.checked = data.homePageEnabled || false;
}));
if (chrome.storage.local.get("sideBarEnabled", (data) => {
    sideBarToggle.checked = data.sideBarEnabled || false;
}));
if (chrome.storage.local.get("recommendationsEnabled", (data) => {
    recommendationsToggle.checked = data.recommendationsEnabled || false;
}));
if (chrome.storage.local.get("commentsEnabled", (data) => {
    commentsToggle.checked = data.commentsEnabled || false;
}));
