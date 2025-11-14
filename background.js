// Service Worker for Universal URL Opener
// Handles keyboard shortcuts and background tasks

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'quick_open') {
    // Open the popup and focus on ticket input
    chrome.action.openPopup().then(() => {
      // Send message to popup to focus on ticket input
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'focus_ticket_input'}, () => {
            // Ignore errors - popup might not be ready
            chrome.runtime.lastError;
          });
        }
      });
    }).catch(() => {
      // Fallback: just open popup normally
      chrome.action.openPopup();
    });
  }
});

// Handle extension installation/startup
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Extension installed - keyboard shortcuts available
    // Users can view shortcuts at chrome://extensions/shortcuts
  }
});