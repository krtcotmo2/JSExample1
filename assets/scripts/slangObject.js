
let theGame = {
    fullText:"", //actual text pulled from theWords array - includes the word and the phrase with | between them - split commands creates the separation
    theWord:"", //word selected from the list - this is the first part of the fullText variable in title case
    hintText:"", //definition of the word  - this is the second part of the fullText variable
    chosenLetters:[], //array of all keys pressed by player
    numWrong:0, //number of letters guessed that do not fit into the puzzle
    matchingWord:"", //theWord with teh spaces removed and converted to lower case - what is compared in the evalaute function
    displayedWord:"", //the inner text value of the main phrase holder - what is compared in the evalaute function
    phraseArray:[], //array used to split up theWord variable if it is a phrase.
    correctWords:0,  //number of words spelled out
    
    
    //function to get a word and put it on the screen
    layoutWord : function(){
        //starts the onKeyPress event listener
        startKey();

        //get index for a word. Reset chosen letters, the hint, the incorrect letters, main word holder and the # of wrong guesses
        let wordIndex = Math.floor(Math.random() * (theWords.length -1));
        theHint.innerHTML = "";
        theMisses.innerHTML = "";
        holder.innerHTML = "";
        chosenLetters = [];
        numWrong = 0;
       
    
        //hide the reset button
        theButton[1].classList.add("d-none"); 
        theButton[1].classList.remove("d-block"); 

        //set/reset the cauldron
        cal.classList.remove("unstable");
        cal.classList.remove("unstable4");
        cal.classList.remove("unstable2");
        cal.classList.remove("unstable3"); 
        cal.src="./assets/images/cauldron5.png";

        //Get the word and the hint    
        fullText= theWords.splice(wordIndex,1)[0];
        theWord = fullText.split("|")[0];
        hintText = fullText.split("|")[1];   
        
        //my technique for matching the the typed word with the actual word wad to get the text value of the holder span tags. JQuery did not recognize the spaces in the spans that were between words so I used a reg expression to creae a varaible for the word i need to match up against 
        matchingWord = theWord.replace(/[" "]/g, "").toLowerCase();
                
        //the layout for my words/phrases were floating the letters. This later showed a flaw since a word could be split onto two lines.
        //now I slplit the phrase into words and wrap all the spans of an individual word in a inline block div. This will push the entire word down to a new line if the phrase is too long.
        phraseArray = theWord.split(" ");
        
        //loop through each word in the phrase. If there is only one word, it just runs once.
        for(let c=0; c<phraseArray.length; c++){
            //create the div for one word and give it a class name
            let aDiv = document.createElement("div");
            aDiv.classList.add("singleWord");
            
            //loop through each letter in the word
            for(let d=0; d<phraseArray[c].length; d++){
                let s = document.createElement("span");

                //some of the words had specail characters so auto populate these and give extra class name to remove the underline in the span
                if(phraseArray[c].charAt(d) === "-" || phraseArray[c].charAt(d) === "'" || phraseArray[c].charAt(d) === `/`){
                   s.classList.add("space");
                   s.innerText=phraseArray[c].charAt(d);
                }

                //add span to the word div
                aDiv.appendChild(s);
            }
            
            //add the word to the main phrase holder
            holder.appendChild(aDiv);

            //adds a space after a word if there is more than 1 word
            if(phraseArray.length>1){
                let aSpace = document.createElement("span");
                aSpace.classList.add("space");
                holder.appendChild(aSpace);
            }            
        }
        console.log(theWord);
    },

    placeLetter : function(l){
        //create array of all spans in the manin phrase holder and loop through them
        var letters = holder.getElementsByTagName("span");           
        
        //if the letter typed by the player matches the letter in the word, place that letter into the span in the array that matches up with the looping index 
        for(let d=0; d<theWord.length; d++){
            if(theWord.charAt(d).toLowerCase() === l){
                letters[d].innerText = theWord.charAt(d);
            }
        }
        
        //changes the value of the displayed word then calls the function to evaluate if text of the spans match the selected word
        displayedWord = holder.innerText.toLowerCase();     
        this.evaluateWordMatch(displayedWord, matchingWord); 
    },

    //fired if thes guessed letter is not in the final word and creates a span with the letter and shows it on the screen
    addToMisses : function(l){
        var letter = document.createElement("span");     
        letter.innerText = l.toUpperCase();
        theMisses.appendChild(letter);
        this.addUnstable();
    },

    //chceks to see if the text of the word/phrase holder matches the text of the word - if yes show the next button and kill on press event watcher
    evaluateWordMatch : function(w1, w2){
        if(w1 === w2){
            document.onkeypress =null;            
            this.correctWords++; 
            //no more words handler
            if(theWords.length > 0){
                theButton[1].classList.remove("d-none"); 
                theButton[1].classList.add("d-block");
            }else{
                this.endGame();
            }
        }   
    },

    //contorols the classes that control the shaking of the cauldron
    //thinking about this now, the caluldron could have been its own object and the add to misses function clupd have passed the # of wrong guesses to that object
    //this would allow the game to take on differnt themes - it separates the word handling from the effects of the outcome. Let something else handle the outcome
    addUnstable : function(){
        numWrong++;    
        //if statement will end game and populate the word - kills on press event watcher
        if(numWrong == 5){
            document.onkeypress =null;
            this.endGame();
            //end game command trumps this - changed my approach to the ending
            // var spans = $("#wordShow span")
            // for(var d=0;d<spans.length; d++){
            //     if(spans[d].innerHTML===""){
            //         spans[d].classList.add("red");
            //         spans[d].innerHTML = theWord.charAt(d);
            //     }
            // }            
        }     
        //entire switch removes previous class name and addes new class name that shows more violent shaking
        switch(numWrong){
            case 1:
                cal.src="./assets/images/cauldron4.png";
                cal.classList.add("unstable");           
                break;
            case 2:
                cal.src="./assets/images/cauldron3.png";
                cal.classList.remove("unstable");    
                cal.classList.add("unstable2");           

                break;
            case 3:
                cal.src="./assets/images/cauldron2.png";
                cal.classList.remove("unstable2");  
                cal.classList.add("unstable3");  
                break;
            case 4:
                cal.src="./assets/images/cauldron1.png";
                cal.classList.remove("unstable3");  
                cal.classList.add("unstable4"); 
                theHint.innerHTML=hintText;
                break;
            default:
                break;
        }
        cal.classList.add("unstable"); 
    },

   //eng game commands
    endGame : function(){
        let perGrade = this.correctWords/totalWords;               
        $(".response").html(this.getResponse(perGrade));
        $(".theScore").text(this.correctWords);
        $(theHint).css("display", "none");
        $(cal).css("display", "none");
        $(holder).css("display", "none");                
        if(perGrade==1){
            $(".modal-content").html($(".completed").html());
        }else{
            $(".modal-content").html($(".failed").html());
        }
        $(".insBtn").css("display", "none");
        $(".modal").show();
    },

    //gets Snapes response to the score
    getResponse : function(arg){
        let res = "Impossible, you must have cheated. There is <b>no way</b> someone as incompetent as you could have done so well. I am going to get some Veritaserum serum, <b>then</b> I will find out how you cheated!"
        if(arg < 0.95 && arg >= 0.9){
           res = "I see the tutoring lessons with Malfoy have paid off. It is a <b>considerable</b> improvement from where you were.";
        }else if(arg < 0.9 && arg > 0.7){
            res = "Well atleast you passed. I hope this means you will not be taking the advanced class with me next year? ";
        }else if(arg < 0.7 && arg > 0.6){
            res = "You <b>barely</b> passed, if it were up to <b>me</b> I would make you repeat the class next year.";
        }else if(arg < 0.6){
            res = "<b>You Failed!?!</b><br/><br/>Your level of <b>ineptitude</b> appears to be boundless. You deserve to be in this bed, in <b>pain!</b> I dumbed it down so even <b>you</b> couldn't screw it up. Even <b>Potter</b> managed to pass this test!<br/><br/> The saddest part of this whole fiasco is that you will need to repeat the class and I will have to endure you presence once again.";}
        return res;
    }, 
    
    //reloads the page - allows all words to be used again
    resetGame : function(){
        window.location.reload();
    }
}

