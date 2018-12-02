
let theGame = {
    theWord:"", 
    chosenLetters:[],
    matchingWord:"",
    displayedWord:"",
    fullText:"", 
    hintText:"", 
    numWrong:0,
    phraseArray:[],

    layoutWord : function(){
        startKey();
        let wordIndex = Math.floor(Math.random() * (theWords.length -1));
        theHint.innerHTML="";
        numWrong = 0;
        
        fullText= theWords.splice(wordIndex,1)[0];
        theWord = fullText.split("|")[0];
        hintText = fullText.split("|")[1];   
        
        matchingWord = theWord.replace(/[" "]/g, "").toLowerCase();
        cal.classList.remove("unstable");
        cal.classList.remove("unstable4");
        cal.classList.remove("unstable2");
        cal.classList.remove("unstable3"); 
        cal.src="./assets/images/cauldron5.png";
        theMisses.innerHTML = "";
        holder.innerHTML="";
        chosenLetters=[];
        theButton[1].classList.add("d-none"); 
        theButton[1].classList.remove("d-block"); 
        phraseArray = theWord.split(" ");
        for(let c=0; c<phraseArray.length; c++){
            let aDiv = document.createElement("div");
            aDiv.classList.add("singleWord");
            for(let d=0; d<phraseArray[c].length; d++){
                let s = document.createElement("span");
                if(phraseArray[c].charAt(d) === "-" || phraseArray[c].charAt(d) === "'" || phraseArray[c].charAt(d) === `/`){
                   s.classList.add("space");
                   s.innerText=theWord.charAt(d);
                }
                aDiv.appendChild(s);
            }
            holder.appendChild(aDiv);
            if(phraseArray.length>1){
                let aSpace = document.createElement("span");
                aSpace.classList.add("space");
                holder.appendChild(aSpace);
            }
            
        }
    },

    placeLetter : function(l){
        var letters = holder.getElementsByTagName("span");           
        for(let d=0; d<theWord.length; d++){
            if(theWord.charAt(d).toLowerCase() === l){
                letters[d].innerText = theWord.charAt(d);
            }
        }
        displayedWord = holder.innerText.toLowerCase();     
        this.evaluateWordMatch(displayedWord, matchingWord); 
    },

    addToMisses : function(l){
        var letter = document.createElement("span");     
        letter.innerText = l.toUpperCase();
        theMisses.appendChild(letter);
        this.addUnstable();
    },

    evaluateWordMatch : function(w1, w2){
        if(w1 === w2){
            document.onkeypress =null;
            theButton[1].classList.remove("d-none"); 
            theButton[1].classList.add("d-block");      
        }   
    },

    addUnstable : function(){
        numWrong++;    
        if(numWrong == 5){
            document.onkeypress =null;
            cal.classList.add("d-none");
            var spans = $("#wordShow span")
            for(var d=0;d<spans.length; d++){
                if(spans[d].innerHTML===""){
                    spans[d].classList.add("red");
                    spans[d].innerHTML = theWord.charAt(d);
                }
            }
            theButton[2].classList.remove("d-none"); 
            theButton[2].classList.add("d-block");
            
        }     
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

    resetGame : function(){
        layoutWord();
    }
}

