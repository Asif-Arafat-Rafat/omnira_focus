// Global configuration state
let HChide = false, SBhide = false, RChide = false, CChide = false;

// 1. Fetch initial configuration from Chrome Storage
chrome.storage.local.get(["homePageEnabled", "sideBarEnabled", "recommendationsEnabled", "commentsEnabled"], (data) => {
    HChide = data.homePageEnabled || false;
    SBhide = data.sideBarEnabled || false;
    RChide = data.recommendationsEnabled || false;
    CChide = data.commentsEnabled || false;
    
    // Run the route router immediately upon receiving initial storage data
    handleRoutingChange();
});

// 2. Define Observers
const homePageObserver = new MutationObserver(() => {
    const contentsEL = document.querySelector("#contents");
    const filterEl = document.querySelector("#chips-content");
    const sideBarEL = document.querySelector("#guide-inner-content");
    const guideContentEl = document.querySelector("#guide-content");
    const guideButtonEl = document.querySelector("#guide-button");
    const guideWrapperEl = document.querySelector("#guide-wrapper");

    if (contentsEL || sideBarEL) {
        if (HChide) {
            if (filterEl) filterEl.remove();
            if (contentsEL) contentsEL.remove();
        }
        if (SBhide) {
            if (sideBarEL) sideBarEL.remove();
            if (guideContentEl) guideContentEl.remove();
            if (guideButtonEl) guideButtonEl.remove();
            if (guideWrapperEl) guideWrapperEl.remove();
        }
    }
});
const resultPageObserver = new MutationObserver(() => {
    const sideBarEL = document.querySelector("#guide-inner-content");
    const guideContentEl = document.querySelector("#guide-content");
    const guideButtonEl = document.querySelector("#guide-button");
    const guideWrapperEl = document.querySelector("#guide-wrapper");
    const commentsEL = document.querySelector("ytd-comments");

    if (SBhide) {
        if (sideBarEL) sideBarEL.remove();
        if (guideContentEl) guideContentEl.remove();
        if (guideButtonEl) guideButtonEl.remove();
        if (guideWrapperEl) guideWrapperEl.remove();
    }
    if (CChide && commentsEL) {
        commentsEL.remove();
    }
});
const watchPageObserver = new MutationObserver(() => {
    const secondaryInnerEL = document.querySelector("#secondary-inner");
    const commentsEL = document.querySelector("ytd-comments");
    const sideBarEL = document.querySelector("#guide-inner-content");
    const guideContentEl = document.querySelector("#guide-content");
    const guideButtonEl = document.querySelector("#guide-button");
    const guideWrapperEl = document.querySelector("#guide-wrapper");

    if (secondaryInnerEL || commentsEL || sideBarEL) {
        if (SBhide) {
            if (sideBarEL) sideBarEL.remove();
            if (guideContentEl) guideContentEl.remove();
            if (guideButtonEl) guideButtonEl.remove();
            if (guideWrapperEl) guideWrapperEl.remove();
        }
        if (CChide && commentsEL) {
            commentsEL.remove();
        }
        if (RChide && secondaryInnerEL) {
            secondaryInnerEL.innerHTML = "<h2 style='color: red;'>Recommendations Hidden</h2><p>Recommendations have been hidden by the extension.</p>";
        }
    }
});

// 3. Routing Engine: Triggers on every SPA page transformation
function handleRoutingChange() {
    const currentPath = window.location.pathname;
    console.log("YouTube dynamic navigation path detected:", currentPath);
    // console.log("Document ready state:", document.readyState);

    // Disconnect old observers to prevent performance leaks and conflicts
    homePageObserver.disconnect();
    watchPageObserver.disconnect();
    resultPageObserver.disconnect();

    // Route: Home Page
    if (currentPath === "/" && (HChide || SBhide)) {
        homePageObserver.observe(document.body, { childList: true, subtree: true });
    }
    
    // Route: Watch Video Page
    if (currentPath === "/watch" && (RChide || CChide || SBhide)) {
        watchPageObserver.observe(document.body, { childList: true, subtree: true });
    }

    if (currentPath === "/results"  && (SBhide)) {
        resultPageObserver.observe(document.body, { childList: true, subtree: true });
    }
    if (currentPath.startsWith("/shorts/") && (SBhide||CChide)) {
        resultPageObserver.observe(document.body, { childList: true, subtree: true });
    }
}

// 4. Hook into YouTube's native transition lifecycle event
window.addEventListener("yt-navigate-start", handleRoutingChange);

// Backup: Run on base page load lifecycle
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", handleRoutingChange);
} else {
    handleRoutingChange();
}
