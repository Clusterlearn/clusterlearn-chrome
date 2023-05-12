// chrome.runtime.onMessage.addListener((message) => {
//    if (message.openPopup) {
//       chrome.windows.create({
//          url: "index.html",
//          type: "popup",
//          width: 400,
//          height: 600
//       });
//    }
// });

chrome.action.openPopup({
    popup: "index.html"
});