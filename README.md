<h1 align="center">OpenWords</h1>

> I'm aware of an issue with ```(new OpenWordsAPI).clearBoard()```. The board won't work correctly after running this, so I suggest to clear the localstorage instead, using ```window.localStorage.clear()```. 

## What is OpenWords?
OpenWords is an open source Wordle-like game, which was made because i didn't know what to do on a particular saturday. It is still in heavy development.

## The word to guess
The word to guess can be changed at the top of functions.js, and can be retrieved using ```(new OpenWordsAPI).getTodayWord();```
