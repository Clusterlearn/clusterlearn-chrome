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


// chrome.tabs.query({
//   active: true,
// }, function(tabs) {
//   chrome.browserAction.getPopup({tabId: tabs[0].id}, function(result: string) {
//         if (result == "popup.html") {
//             chrome.browserAction.setPopup({
//             popup: "index.html"
//             });
//         }
//         }
//     );

// });

import { Messages } from "./types/chromeMessages";
import { ChromeRuntimeResponse } from "./types/chromeResponse";


chrome.runtime.onMessage.addListener(async (message : Messages, _sender, res : (data: ChromeRuntimeResponse) => void) => {
  const response : ChromeRuntimeResponse = {
    success: true,
    message: "",
    data:{}
  }
  try{
    switch (message) {
      case Messages.GET_CURRENT_TAB_URL:
        response.data = {url:await getCurrentTab()}
        break;
        
        default:
          break;
        }
  }catch(e){
    response.success = false
    response.message = (e as Error).message
  }
  res(response)
})

const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({active: true, currentWindow:true})
  return tabs[0].url
}