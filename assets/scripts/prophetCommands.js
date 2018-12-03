let playWords = []; //List of all words used in the actual crossword puzzle
let attempts = 0; //# of attempts the system tries to loop through to find good words
let gridSize = 20; //defines the number of letters across and high the crossword will be
let gridSqs = []; //an array that tracks the alue of every letter in the crossword grid
let firstY; //the smallest value of any starting Y position. Allows the grid to be shifted upwards
const numOfWordsInList = allWords.length;

//METHODS
let displayGrid = function () {
    for (d = 0; d < gridSqs.length; d++) {
        let className = gridSqs[d] == undefined ? "sqr blank" : "sqr";
        $(".grids").append("<span id='s" + d + "' class='" + className + "'></span>");
    };
}
let findWords = function(){ 
    let tempArray= [];
    while ((tempArray.length < 10) && (attempts < numOfWordsInList)) {
        let wordFits = false;//Boolean the tracks whether the word fits in the puzzle
        let potentialWord = new aWord(0, 0);//creates the new word object
        
        //gets a random word form the list of all words and builds up some of the class
        let ind = Math.floor(Math.random() * allWords.length) //picks a random # based on the lenght of the allwords array
        potentialWord.name = allWords[ind].split("|")[0]; // chooses the word/definition pair, splits it and gets the word 
        potentialWord.def = allWords[ind].split("|")[1]; // chooses the word/definition pair, splits it and gets the definition 
        potentialWord.dir = tempArray.length % 2 == 0 ? "h" : "v"; // sets whether the word is a vertical or horizontal word
    
        //gets all intersecting points for the new word compared to all the previously fitted words
        findIntersectionAllWords(potentialWord, tempArray);
        
        //run function to see if the word fits keeping track of the number of attempts to find a word. 
        //if it fits, add to play words, regardless, remove it from the list.
        wordFits = findPlacement(potentialWord, tempArray);        
        attempts++;    
        if (wordFits) {
            tempArray.push(potentialWord); 
        }
        allWords.splice(ind, 1);
        
        //looks for common letters in words
        function findIntersectionAllWords(pw, arrayOfWords) {
            //loop through the word and comapre the potential word to all existing words
            for (c = 0; c < arrayOfWords.length; c++) {
                if (pw.dir != arrayOfWords[c].dir) {
                    //loops through each letter of the potential word
                    for (let d = 0; d < pw.name.length; d++) {
                        let char = pw.name.charAt(d); //specific character
                        let idx = arrayOfWords[c].name.indexOf(char); //checks it the letter in the ptotenial word is on the current word in array
                        if (idx > -1) {//creates intersection point if there is a shared letter
                            let iPoint = new interPoint();
                            iPoint.otherWordI = c; //gets the index of the intersecting word in the array of words
                            iPoint.letter = char; //gets the letter the two words share
                            iPoint.thisI = d; // gets the index point the letter exists in the potential word
                            let otherI = [];
                            while (idx != -1) {
                                otherI.push(idx);
                                idx = arrayOfWords[c].name.indexOf(char, idx + 1);//loops through the current word in the array of usable words and adds all intesection points 
                            }
                            iPoint.otherI = otherI;
                            pw.iPoints.push(iPoint);//add the intersection point to the words intersection array
                        }
                    }
                }
            }
        }
        
        //looks for a place to set the word, if it finds a spot, reutrn true, else retur false
        function findPlacement(pw, arrayOfWords) {
            let potFit = false;
            //set the first word to be cenetered in the grid
            if (arrayOfWords.length === 0) {
                potFit = true;
                pw.xpos = Math.floor(gridSize / 2) - Math.floor(pw.name.length / 2);
                pw.ypos = Math.floor(gridSize / 2);
                setGridValues(pw);
                return potFit;
            }
    
            if (pw.dir === "v") {
                //loops through all intersection points wihin a word.
                for (let c = 0; c < pw.iPoints.length; c++) {
                    let thisStartX, thisStartY, otherStartX, otherStartY
                    let ip = pw.iPoints[c];
                    otherStartX = arrayOfWords[ip.otherWordI].xpos;
                    otherStartY = arrayOfWords[ip.otherWordI].ypos;
                    //loops trough all the intesections in the other word
                    for (let d = 0; d < ip.otherI.length; d++) {
                        thisStartX = otherStartX + ip.otherI[d];
                        thisStartY = otherStartY - ip.thisI;
                        //BIG VALIDATION CHECKS
                        let onGrid = checkIfWordInGrid(thisStartY);
                        let allLettersCanBeAdded = checkIfLettersOK(pw, thisStartX, thisStartY);
                        let spaceBeforeLetterIsEmpty = checkIfPreviousTileEmpty(thisStartX, thisStartY);
                        let spaceAfterLetterIsEmpty = checkIfNextTileEmpty(pw, thisStartX, thisStartY);
                        let surroundingLettersCleared = checkSurroundingSquares(arrayOfWords, pw, thisStartX);
                        
                        if (onGrid && allLettersCanBeAdded && spaceBeforeLetterIsEmpty && spaceAfterLetterIsEmpty && surroundingLettersCleared) {
                            potFit = true;
                            break;
                        }
                    }
                    //assign the potential xpos and ypos as official
                    if (potFit) {
                        pw.xpos = thisStartX;
                        pw.ypos = thisStartY;
                        setGridValues(pw);
                        return potFit;
                    }
                }
            } else {
                for (let c = 0; c < pw.iPoints.length; c++) {
                    let thisStartX, thisStartY, otherStartX, otherStartY
                    let ip = pw.iPoints[c];
                    otherStartX = arrayOfWords[ip.otherWordI].xpos;
                    otherStartY = arrayOfWords[ip.otherWordI].ypos;
                    for (let d = 0; d < ip.otherI.length; d++) {
                        thisStartX = otherStartX - ip.thisI;
                        thisStartY = otherStartY + ip.otherI[d];
                        //BIG VALIDATION CHECK
                        let onHGrid = hCheckIfOnGrid(pw, thisStartX);
                        let allHLettersCanBeAdded = hCheckIfLettersOK(pw, thisStartX, thisStartY);
                        let spaceBeforeHLetterIsEmpty = checkIfPreviousHTileEmpty(thisStartX, thisStartY);
                        let spaceAfterHLetterIsEmpty = checkIfNextHTileEmpty(pw, thisStartX, thisStartY);
                        let surroundingHLettersCleared = checkSurroundingHSquares(arrayOfWords, pw, thisStartY);
                        
                        if (onHGrid && allHLettersCanBeAdded && spaceBeforeHLetterIsEmpty && spaceAfterHLetterIsEmpty && surroundingHLettersCleared) {
                            potFit = true;
                            break;
                        }
                    }
                    
                    //assign the potential xpos and ypos as official
                    if (potFit) {
                        pw.xpos = thisStartX;
                        pw.ypos = thisStartY;
                        setGridValues(pw);
                        return potFit;
                    }
                }
            }
            return potFit;
        }
    }
    return tempArray;
}

//sets value in gridSqr array
let setGridValues = function(pw){
    for (let h = 0; h < pw.name.length; h++) {
        if (pw.dir === "h") {
            gridSqs[(pw.ypos * gridSize) + pw.xpos + h] = pw.name.charAt(h);
        } else {
            gridSqs[pw.xpos + (gridSize * (pw.ypos + h))] = pw.name.charAt(h);
        }
    }
}
//VERTICAL WORD CHECKERS AND VALIDATION
//check to make sure word is not positioned above 0, therefore off the grid
let checkIfWordInGrid = function(ypos){
    return ypos >= 0;
}
//Loop through all letters in the word. Make sure the squared in the grid are empty or the letters match the specific letter of the potential word
let checkIfLettersOK = function(wrd, xpos, ypos){
    for (let e = 0; e < wrd.name.length; e++) {
        let gNum = xpos + (gridSize * (ypos + e));
        if ((gridSqs[gNum] !== undefined && gridSqs[gNum] !== wrd.name.charAt(e))) {
            return false;
        }
    }
    return true;
}
//make sure square before start of word is empty
let checkIfPreviousTileEmpty = function(xpos, ypos){
    if (gridSqs[xpos + (gridSize * (ypos - 1))] != undefined) {
        return  false;
    }
    return true;
}
//make sure square at the end of the word is empty
let checkIfNextTileEmpty = function(pw, xpos, ypos){
    if (gridSqs[xpos + (gridSize * (ypos + pw.name.length))] != undefined) {
        return false;
    }
    return true;
}
//make sure there are no words in the column rigth before or after the word
let checkSurroundingSquares = function(arr, pw, xpos){
    for (let e = 0; e < arr.length; e++) {
        if (arr[e].dir == pw.dir && (arr[e].xpos == xpos - 1 || arr[e].xpos == xpos + 1)) {
            return false;
        } else if (arr[e].dir != pw.dir && (xpos == arr[e].xpos + arr[e].name.length || xpos == arr[e].xpos - 1)) {
            return false;
        }
    }
    return true;
}

//HORIZONTAL WORD CHECKERS AND VALIDATION
//check to make sure word is not positioned off grid or wraps word
let hCheckIfOnGrid = function(pw, xpos){
    if (xpos < 0 || xpos % gridSize + pw.name.length > gridSize) {
        return false;
    } 
    return true;   
}
//Loop through all letters in the word. Make sure the squared in the grid are empty or the letters match the specific letters
let hCheckIfLettersOK = function(wrd, xpos, ypos){
    for (let e = 0; e < wrd.name.length; e++) {
        let gNum = xpos + e + (gridSize * (ypos));
            if ((gridSqs[gNum] !== undefined && gridSqs[gNum] !== wrd.name.charAt(e))) {
            return false;
        }
    }
    return true;
}
//make sure square before start of word is empty
let checkIfPreviousHTileEmpty = function(xpos, ypos){
    if (gridSqs[xpos - 1 + (gridSize * (ypos))] != undefined) {
        return false;
    }
    return true;
}
//make sure square at the end of the word is empty
let checkIfNextHTileEmpty = function(pw, xpos, ypos){
    if (gridSqs[xpos + (gridSize * (ypos)) + pw.name.length] != undefined) {
        return false;
    }
    return true;
}
//make sure there are no words in the column rigth before or after the word
let checkSurroundingHSquares = function(arr, pw, ypos){
    for (let e = 0; e < arr.length; e++) {
        if (arr[e].dir == pw.dir && (arr[e].ypos == ypos - 1 || arr[e].ypos == ypos + 1)) {
            return false;
        } else if (arr[e].dir != pw.dir && (ypos == arr[e].ypos - 1 || ypos == arr[e].ypos + arr[e].name.length)) {
            return false;
        }
    }
    return true;
}



//MAIN STARTING OF THE GAME
//Set size of the grid box 
$(".grids").css("width", (20 * gridSize) +  (gridSize * 2) + "px");

//get the words to play the gameand  builds the grid
playWords = findWords();
displayGrid();

//add pointer class to first letter of each word and set event listeners
playWords.map(function (e) {
    let ind = e.xpos + (e.ypos * gridSize);
    let s = document.getElementById("s" + ind);
    s.classList.add("pointer");
})
$(".sqr.pointer").click(function (e) {
    let sqNum = Number(e.target.id.substr(1));
    let xp = sqNum % gridSize;
    let yp = Math.floor(sqNum / gridSize);
    let clues = playWords.filter(function (o, i) {
        return o.xpos == xp && o.ypos == yp ? true : false;
    })
    openModal(clues);
})

//gets the row number of the item that is closest to the top of the page so we can shift the puzzle up and shifts the crossword puzzle up to that the item aligns to the top.
firstY = playWords.reduce(function (wrd1, wrd2) {
    return wrd1 < wrd2.ypos ? wrd1 : wrd2.ypos;
})
$(".grids").css("top", "-" + (firstY * 22) + "px")


//MODAL WINDOW LISTENERS
$(".modal").bind('hide.bs.modal', function (e) {
    $(document).unbind("keypress");
})
$(".modal").bind('shown.bs.modal', function (e) {
    $("input.ans1").focus();
})
let openModal = function (e) {
    let title = e[0].dir == "v" ? e[0].xpos + " down" : e[0].ypos + " across";

    if (e.length == 1) {
        console.log(e[0].name);
    } else {
        console.log(e[0].name + " " + e[1].name);
    }
    if (e.length === 2) {
        e[1].dir == "v" ? title = title + " and " + e[1].xpos + " down" : title = title + " and " + e[1].ypos + " across";
    }
    $("input[class^='ans']").val("");
    $('#exampleModalCenter h5').html(title);

    $(".modal-dialog").width((e[0].name.length * 35) + 180);
    $(".modal-dialog").css("max-width", (e[0].name.length * 35) + 180 + "px");
    if (e.length == 2) {
        $('#exampleModalCenter .def1').html(e[0].dir == "v" ? "<b>Down</b> Word length: "+e[0].name.length+"<br/>" + e[0].def : "<b>Across</b> Word length: "+e[0].name.length+"<br/>" + e[0].def);
        $('#exampleModalCenter .def2').html(e[1].dir == "v" ? "<b>Down</b> Word length: "+e[1].name.length+"<br/>" + e[1].def : "<b>Across</b> Word length: "+e[1].name.length+"<br/>" + e[1].def);
        $(".ans2").css("display", "block");
    } else {
        $('#exampleModalCenter .def1').html("Word length: "+e[0].name.length+"<br/>"+e[0].def);
        $('#exampleModalCenter .def2').html("");
        $(".ans2").css("display", "none");
    }
    $('#exampleModalCenter').modal('show');
    $(".ans1").on("keyup", { e }, function(evt){
        if(evt.key=="Enter"){
            evalInput();
        }        
    })
    $(".ans2").on("keyup", { e }, function(evt){
        if(evt.key=="Enter"){
            evalInput();
        }        
    })
    $(".btnSave").on("click", function () {
        evalInput();
    });
    
    let evalInput = function(){
        if (e[0].name.toLowerCase() == $(".ans1").val().toLowerCase()) {
            if (e[0].dir == "h") {
                let grdNum = gridSize * e[0].ypos + e[0].xpos;
                for (d = 0; d < e[0].name.length; d++) {
                    $("#s" + (grdNum + d)).text(e[0].name.charAt(d));
                }
            } else {
                let grdNum = gridSize * e[0].ypos + e[0].xpos;
                for (d = 0; d < e[0].name.length; d++) {
                    $("#s" + (grdNum + (d * gridSize))).text(e[0].name.charAt(d));
                }
            }
        };

        if (e[1] && e[1].name.toLowerCase() == $(".ans2").val().toLowerCase()) {
            if (e[1].dir == "h") {
                let grdNum = gridSize * e[1].ypos + e[1].xpos;
                for (d = 0; d < e[1].name.length; d++) {
                    $("#s" + (grdNum + d)).text(e[1].name.charAt(d));
                }
            } else {
                let grdNum = gridSize * e[1].ypos + e[1].xpos;
                for (d = 0; d < e[1].name.length; d++) {
                    $("#s" + (grdNum + (d * gridSize))).text(e[1].name.charAt(d));
                }
            }
        };
        $('.modal').modal("toggle");
    
    
    }
   
}