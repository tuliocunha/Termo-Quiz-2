// background.js

// This will run when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('ThermoQuiz extension installed or updated');
});

// You can use this event listener to perform tasks in the background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'ping') {
    sendResponse('pong');
  }
});

// Example function to handle storage operations
function saveToStorage(data) {
  chrome.storage.local.set({ key: data }, () => {
    console.log('Data saved to storage');
  });
}

// Example function to retrieve data from storage
function getFromStorage(callback) {
  chrome.storage.local.get(['key'], (result) => {
    console.log('Data retrieved from storage');
    callback(result.key);
  });
}
