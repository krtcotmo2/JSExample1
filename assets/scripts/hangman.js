var theWords = ["Aconite","Acromantula","Advanced Potion Making","Amortentia","Animagus","Apparate","Arithmancy","Asphodel","Auror","Beater","Beazor","Bertie Botts Every Flavor Beans","Black Family Tapestry","Bludger","Boggart","Boomslang Skin","Butterbeer","Cauldron Cake","Charms","Chaser","Cockroach Clusters","Daily Prophet","Dark Arts","Dark Mark","Deathly Hallows","Deathday Party","Death Eaters","Defense Against the Dark Arts","Deluminator","Dementors Kiss","Department of Mysteries","Devils Snare","Dissapparate","Dittany","Divination","Draco Dormiens Nunquam Titillandus","Draught of the Living Dead","Droobles Best Blowing Gum","Dumbledore's Army","Dungbombs","Elixir of Life","Felix Felicis","Firebolt","Floo Network","Floo Powder","Firebolt","Firewhiskey","Ford Anglia","Fizzing Whizbees","Foe Glass","Galleon","Ghost","Gillyweed","Gobblededook","Gobstones","Golden Snitch","Half-Blood","Hall of Prophecies","Hand of Glory","Head Boy/Girl","Headless Hunt","Healer","Heir of Slytherin","High Inquisitor","Hogwarts Express","Horcrux","House","House Cup","Howler","Ice Mice","Inferi","Inquisitorial Squad","Keeper","Knight Bus","Knut","Kwikspell","Legilimency","Magical Me","Mandrake","Mermish","Mirror of Erised","Mudblood","Muggle","Nimbus","Obliviators","Occlumency","Omniocculars","One Eyed Witch","Order of the Phoenix","Parsletounge","Parslemouth","Patented Daydream Charm","Patronus","Pensive","Pepper Imps","Philosopher's Stone","Pocket Sneakoscope","Poltergeis","Polyjuice Potion","Portkey","Potions","Priori Incantatem","Prophecy","Pure Blood","Put Outer","Pumpkin Pastry","Quaffle","Quibbler","Quick Quotes Quill","Quidditch","Quidditch Cup","Remebral","Seeker","Sickle","Skele-grow","Skiving Snackboxes","Snatchers","Sneakascope","Sorting Ceremony","Spattergroit","S.P.E.W","Spellotape","Splinch","Squib","Time Turner","Trace","Transfiguration","Triwizard Tournament","Unspeakables","Veil Room","Veritaserum","Weasley's Wizarding Wheezes","Werewolf","Whomping Willow","Wizards Chess","Wizards Duel","Wolfsbane","Wolfsbane Potion","Wormwood"];

var theWord, chosenLetters, matchingWord, displayedWord;
var holder = document.getElementById("wordShow");
var theMisses = document.getElementById("theMisses");
var theHint = document.getElementById("theHint");
var theButton = document.getElementsByTagName("button")
var cal = document.getElementById("cauldron");
var numWrong, unstable1Timer, unstable2Timer, unstable3Timer, unstable4Timer;

layoutWord();

function layoutWord(){
    var num = Math.floor(Math.random() * (theWords.length -1));
    theHint.innerHTML="";
    numWrong = 0;
    theWord = theWords.splice(num,1)[0];
    console.log(theWord);
    matchingWord = theWord.replace(/[" "]/g, "").toLowerCase();
    cal.classList.remove("unstable");
    cal.classList.remove("unstable4");
    cal.classList.remove("unstable2");
    cal.classList.remove("unstable3"); 
    cal.src="./assets/images/cauldron5.png";
    theMisses.innerHTML = "";
    holder.innerHTML="";
    chosenLetters=[];
    theButton[0].classList.add("d-none"); 
    theButton[0].classList.remove("d-block"); 
    for(let d=0; d<theWord.length; d++){
        let s = this.document.createElement("span");
        if(theWord.charAt(d) === " " || theWord.charAt(d) === "-" || theWord.charAt(d) === "'" || theWord.charAt(d) === `/`){
            s.classList.add("space");
            s.innerText=theWord.charAt(d);
        }
        holder.appendChild(s);
    }
    
    document.onkeypress = function(evt){
        let mod = document.getElementById("inst");
        if(mod.style.display !="none" && mod.style.display !=""){
            return;
        }
        let theLetter = evt.key.toLowerCase();
        if(chosenLetters.indexOf(theLetter) > -1){
            return;
        }else{
            chosenLetters.push(theLetter);
        }
        if(evt.code.toString().includes("Key")){
            var isGoodLetter = theWord.toLowerCase().includes(theLetter);
            if(isGoodLetter){
                placeLetter(theLetter);
            }else{
                addToMisses(theLetter)
            }
        }
    }
}        

function placeLetter(l){
    var letters = holder.getElementsByTagName("span");           
    for(let d=0; d<theWord.length; d++){
        if(theWord.charAt(d).toLowerCase() === l){
            letters[d].innerText = theWord.charAt(d);
        }
    }
    displayedWord = holder.innerText.toLowerCase();     
    evaluateWinner(displayedWord, matchingWord);       
}        

function addToMisses(l){
    var letter = this.document.createElement("span");     
    letter.innerText = l.toUpperCase();
    theMisses.appendChild(letter);
    addUnstable(); 
}

function evaluateWinner(w1, w2){
    if(w1 === w2){
        document.onkeypress =null;
        theButton[0].classList.remove("d-none"); 
        theButton[0].classList.add("d-block");      
    } 
}

function addUnstable(){
    numWrong++;    
    if(numWrong == 5){
        document.onkeypress =null;
        cal.classList.add("d-none");
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
            theHint.innerHTML="A hint will show up here";
            break;
        default:
            break;
    }
    cal.classList.add("unstable");
    
    
}
