window.addEventListener("load", function () {
    var popupURL = chrome.extension.getURL("index.html");
    var popup = window.open(popupURL, "extension_popup", "width=500,height=500");
});
