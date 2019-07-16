# The Assignment
![alt text](https://img.shields.io/badge/uses-jQuery-blue.svg)  ![alt text](https://img.shields.io/badge/uses-Custom_CSS-blue.svg)  ![alt text](https://img.shields.io/badge/uses-Responsive_Design-blue.svg)

Develop a JavaScript driven hangman game where users can type in letters and get feedback if the letter selected is part of an unknown word or if the user is one step closer to losing the game. Not wanting the project to be the same as every other game, I made some variations.

# The Games
#### Introducing [Slytherin Slang](https://krtcotmo2.github.io/wordGames/)
[<img align="center" src="https://github.com/krtcotmo2/wordGames/blob/master/assets/images/slang.png"/>](https://krtcotmo2.github.io/wordGames/)

In this version I styled everything after the Harry Potter series, the look, the words, the premises of the game and even have Professor Snape delving the instructions. I gathered an array of terms and definitions from the Harry potter books and placed them into an array. When the game starts a random word or phrase is posted on the screen. I made sure that the letters stayed together as one word in the event that the window is resized. The user can begin typing in letters. Each key press checks to see if the letter appears in the chosen word. If it did, it display the letter in the sequence. I detected if the user was done when the letters displayed were equal to the chosen word.

The motion of the “Correct All Cauldron” are controlled by css animations.

Upon completion of this interaction I moved forward to the next variation of word games.

#### [The Crossword Puzzle](https://krtcotmo2.github.io/wordGames/intersection3.html)
[<img align="center" src="https://github.com/krtcotmo2/wordGames/blob/master/assets/images/prophet.png"/>](https://krtcotmo2.github.io/wordGames/intersection3.html)
Using the exact same list of 144 words and phrases, I went for an ambitious advancement. I set up a series of loops that would select the first word and then randomly select another word. The code would then loop though each letter of the new word and see if it intersected with the previous word. If the intersection was not valid it chose another word until it could find a fit. Once it found that word it would continue to loop though, repeating the same process where the new word looked for intersection points while not causing conflicts with other words and show them in a completely random crossword puzzle within a potential 20 x20 grid.

To reveal the clues for the crossword puzzle, the user clicks on first box of the word (outlined in red) to open up a Bootstrap modal with the clue. If the user is correct, the word appears in the puzzle. There is no penalty for getting a word wrong. 

Since the words are not common I wrote the answers to clues in the console so the user can see the puzzle working properly. 

#### Local Setup
These interactions are simple HTML5, CSS, jQuery. Downloading the files and running them in a local browser is all that is needed to activate the games locally.
 

