let isQuotingWord = false;
let lastCharWasSpace = true;
let quoteMode = 'word'; // Default mode
let isEnabled = true;

chrome.storage.sync.get(['quoteMode', 'isEnabled'], function(data) {
  quoteMode = data.quoteMode || 'word';
  isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.quoteMode) {
    quoteMode = request.quoteMode;
  }
  if (request.isEnabled !== undefined) {
    isEnabled = request.isEnabled;
  }
});

document.addEventListener('keydown', function(event) {
  if (!isEnabled) return; 

  const target = event.target;

  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    const key = event.key;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    const hasSelection = selectionStart !== selectionEnd;

    if (target.value.length === 0 && key.length === 1 && key !== ' ') {
      lastCharWasSpace = true; 
    }

    if (quoteMode === 'word') {
      handleWordQuoting(target, key, hasSelection, selectionStart, selectionEnd, event);
    } else if (quoteMode === 'phrase') {
      handlePhraseQuoting(target, key, hasSelection, selectionStart, selectionEnd, event);
    }
  }
});
function handleWordQuoting(target, key, hasSelection, selectionStart, selectionEnd, event) {
  if (key.length === 1 && key !== ' ') {
    if (hasSelection) {
      if (selectionStart === 0 || target.value[selectionStart - 1] === ' ') {
        replaceSelection(target, '"' + key);
        isQuotingWord = true;
      } else {
        replaceSelection(target, key);
        isQuotingWord = false;
      }
      lastCharWasSpace = false;
    } else if (lastCharWasSpace) {
      target.value = target.value.slice(0, selectionStart) + '"' + key + target.value.slice(selectionEnd);
      isQuotingWord = true;
      lastCharWasSpace = false;
    } else {
      target.value = target.value.slice(0, selectionStart) + key + target.value.slice(selectionEnd);
    }
    event.preventDefault();
  } else if (key === ' ') {
    if (isQuotingWord) {
      target.value = target.value.slice(0, selectionStart) + '" ' + target.value.slice(selectionEnd);
      isQuotingWord = false;
    } else {
      target.value = target.value.slice(0, selectionStart) + ' ' + target.value.slice(selectionEnd);
    }
    lastCharWasSpace = true;
    event.preventDefault();
  } else if (key === 'Backspace') {
    if (hasSelection) {
      replaceSelection(target, '');
      isQuotingWord = !target.value.slice(0, selectionStart).endsWith(' ');
      lastCharWasSpace = target.value.slice(0, selectionStart).endsWith(' ');
    } else {
      handleBackspace(target);
    }
    event.preventDefault();
  }
}

function handlePhraseQuoting(target, key, hasSelection, selectionStart, selectionEnd, event) {
  if (key.length === 1 && key !== ' ') {
    if (target.value.length === 0 || target.value.endsWith('" ')) {
      target.value += '"' + key;
    } else {
      target.value = target.value.slice(0, selectionStart) + key + target.value.slice(selectionEnd);
    }
    event.preventDefault();
  } else if (key === 'Backspace') {
    if (hasSelection) {
      replaceSelection(target, '');
    } else {
      target.value = target.value.slice(0, -1);
    }
    event.preventDefault();
  }
}

function replaceSelection(target, replacement) {
  const start = target.selectionStart;
  const end = target.selectionEnd;
  target.value = target.value.slice(0, start) + replacement + target.value.slice(end);
  target.selectionStart = target.selectionEnd = start + replacement.length;
}

function handleBackspace(target) {
  if (target.value.endsWith(' "')) {
    target.value = target.value.slice(0, -2);
    isQuotingWord = false;
    lastCharWasSpace = true;
  } else if (target.value.endsWith('"')) {
    target.value = target.value.slice(0, -1);
    isQuotingWord = false;
    lastCharWasSpace = true;
  } else {
    target.value = target.value.slice(0, -1);
    isQuotingWord = !target.value.endsWith(' ') && (target.value.includes('"') || !target.value);
    lastCharWasSpace = target.value.endsWith(' ');
  }
  
  if (target.value.length === 0) {
    isQuotingWord = false;
    lastCharWasSpace = true;
  }
}