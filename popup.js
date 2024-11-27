document.addEventListener('DOMContentLoaded', function() {
  const radios = document.getElementsByName('quoteMode');
  
  chrome.storage.sync.get('quoteMode', function(data) {
    if (data.quoteMode) {
      document.querySelector(`input[value="${data.quoteMode}"]`).checked = true;
    }
  });

  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      chrome.storage.sync.set({quoteMode: this.value});
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {quoteMode: this.value});
      });
    });
  });
});