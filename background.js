let isEnabled = true;

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-extension") {
    isEnabled = !isEnabled;
    chrome.storage.sync.set({isEnabled: isEnabled});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {isEnabled: isEnabled});
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({isEnabled: true});
});