chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "fillTitle.js"});
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url && details.url.includes("wevo.visualstudio.com")) {
        let paths = details.url.split("/");
        
        if (paths && paths.length && (!paths[paths.length - 1] || paths[paths.length - 1].startsWith("pullrequests"))) {
            chrome.tabs.executeScript(details.tabId, {file: "addPullRequestButtons.js"});
        }
    }
}, {
    url: [{
        hostContains: '.visualstudio.'
    }]
});