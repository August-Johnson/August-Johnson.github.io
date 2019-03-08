# WEEK 11 HOMEWORK ASSIGNMENT

<p>This week's assignment was to create a hangman game through the command line, using Node, npm inquirer and constructors. It would essentially function like a normal hangman game, except it's run through the command line with Node.</p>

## JAVASCRIPT FILES

### letters.js

<p>This JavaScript file is for creating the constructor 'Letter'. The Letter constructor takes in an arguement of 'letter' that it references in its other functions. It has a boolean value called 'letterGuessed', which defines whether or not the letter has been guessed yet or not. The function 'displayLetter' will return the actual letter as a string if the boolean value is true, otherwise it will return an underscore as a string (I decided to use that as my placeholder value). The constructor also has a function called 'letterCheck' where it takes in the user's guess and compares it to whatever the current letter is and changes the boolean value to true if it matches. I say *current letter* because it will loop through the word and check each letter.</p>

<hr>

###  word.js

<p>This JavaScript file is used to create the 'Word' constructor as well as referncing values and functions from the 'letters.js' file. The constructor takes in an arguement of 'word', which represents the current word that was chosen to be guessed. It has a value of the amount of the user's guesses and an array where it stores the object values of each letter. The function 'lettersArr' will loop through the word and create a letter object using the constructor from letters.js, and then push each one into the 'letters' array previously mentioned. The function 'displayWord' will run the 'displayLetter' function on every letter in the word and then log the result to the user. It uses the 'displayLetter' function from __letters.js.__ Lastly, the 'userGuess' function takes in an arguement of 'guess' that represetns the user's letter guess. It checks to see if the guess is correct or not. If it is, return the updated word to the user and alert them thay their guess was correct. Otherwise subtract 1 from the guessesLeft variable and tell the user their guess was wrong.</p>

<hr> 

### index.js

<p>This JavaScript file is the one used to run the actual game/app. It uses the **word.js** file and the inquirer node package. It has an array of different words that will be randomly selected from each time a new game is started. It also has an array that represents the letters already guessed, as well as a string value of the word that was just chosen. The point of each one is to make it so there is not as much repetition (same word being chosen 2 times in a row or the user guessing the same letter over and over). When the app is started, it will randomly select a word from the array and run it through the Word constructor. It will display the word (initially just placeholders) to the user, then prompt the user to make a guess. The rest of the game is the same, where it will use the functions and values from the Letter and Word constructor previously explained.</p>

<hr>


## SCREENSHOTS OF COMPLETED APP

### When the game is initially started up
![screenshot of concert-this command output](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/11-js-constructors/screenshots/startGame-pic.png)

<hr>

### If the user guesses correctly
![screenshot of concert-this command output](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/11-js-constructors/screenshots/correctGuess-pic.png)

<hr> 

### If the user guesses incorrectly
![screenshot of concert-this command output](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/11-js-constructors/screenshots/incorrectGuess-pic.png)

<hr>

### If the user has already guessed the same letter (tried to guess the letter 'n' again)
![screenshot of concert-this command output](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/11-js-constructors/screenshots/alreadyGuessed-pic.png)

<hr>

### When the user either wins or losses (in this case, wins) Asked if they would like to play again
![screenshot of concert-this command output](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/11-js-constructors/screenshots/playAgain-pic.png)


<hr>

## CHALLENGES

* Linking all of the js files together coherently.
* Making sure my code wasn't a mess or confusing.
* Using constructors as the primary method of creating and calling functions.

<hr>

## EXTRA FUNCTIONALITY I ADDED
* Making sure the user cannot guess the same letters they have already guessed.
* Making sure the same word is never chosen 2 times in a row.
