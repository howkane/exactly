<div align="center">
<picture>
  <source  srcset="/misc/exactly-logo.png">
  <img alt=" logo" src="/misc/exactly-logo.png" width="35%" height="35%">
</picture>
</div>
<br>
<b>Exactly!</b> is a Chrome extension that automatically adds quotes to words and phrases as you type, most useful in exact-match web search. Maybe one you didn't know you needed, if you still use search engines that is.<br><br>Exactly! currently has two modes: *quote every word* and *quote every phrase*.

### Quote every word
Adds a quote before the first character typed. On spacebar, closes the quoted word and makes a space, then starts with a quote on keydown again. <br><br>The input of *best deals today* becomes "best" "deals" "today"  

### Quote every phrase
Starts each input the same way as *quote every word*, but a space bar does not end-quote. You add the endquote on the phrase yourself, and the extension will start the next phrase with a new quote after the spacebar. Haven't found a way to make phrase quoting simple enough that no manual quote input would be needed.<br><br>The input of *best deals today* becomes "best deals today"

###On/off
Exactly! may be excellent for extensive search using exact matches, but doesn't make much sense elsewhere. So it can be quickly turned on and off without having to manually disable and re-enable the extension each time in your browser's Extensions section. <br><br>To turn it off/on, use: 
  
- `Ctrl+Shift+Q` on Windows, Linux
- `Command+Shift+Q` on Mac

### Notes
   
- Text editing is supported, except for selected-text manipulation, for now. 
- The main input field on *google.com* does not respond to the extension, but input on search results pages does. Other search engines' landing pages don't seem to have this issue. 

### Tested On:
- Chromium
- Brave
<br>
..

#### Considerations
Might be worthwhile to write features for some more automatic google dorks in the future.
