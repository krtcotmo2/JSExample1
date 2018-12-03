# wordGames
Word Games with a variation on hangman and possible crossword puzzle generator 

index.html uses an external js file and the code is written strictly in a variable and functions. No objects or classes utilized

game.html creates the same game but uses a game object to control 90% of the functionality. Separated the word array from the main js file. Added the scoring and closing presentation for the completion of the game. Because the words for the puzzle are obscure, the console log has been left in and the word is revealed when the challenge is presented to the user.

intersection.html is a quick proof of concept as I was working to get the words and intersections of the words easily defined using 2 classes. Was timing the event to see how the multiple loops might impact the performance of the game.

intersection2.html close to completing the basic functionality. Missing the styling for the first letter of every word, instructions, new game button, submit answer on return. This also has one large looping function with a bunch of subroutines in it. These routines are made separate in a later version.

Intersection3.html final product with a much more streamlined code, comments, styling for the first letter of every word, instructions, new game button, submit answer on return. Subroutines are now separate functions. Because the words for the puzzle are obscure, the console log has been left in and the word is revealed when you open the clue panel.
