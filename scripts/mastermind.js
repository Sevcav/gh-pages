/* CIS-133JS Ken Chapman 
    v1.0
	-MasterMind game
*/
Array.prototype.shuffle = function() {
    let i = this.length - 1,
        j, temp;
    for (i - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

var tmp = "";
var cImg = "w";
var pGuess = [];
var activeRow = 8;
var GameRow = activeRow-7;
var GameOld = activeRow-8;
var OldRow = GameOld+9;

function displayFlag(curRow,flagImg){
	
		//console.log("activerow: "+activeRow+" Gamerow: "+GameRow+ " OldRow: " + OldRow+ " GameOld: "+ GameOld)
		document.getElementById(curRow+"1").innerHTML="<img src='images/"+flagImg+".png' alt='Empty' width='65' height='70' border='0';/>"
		//Change Game Counter of New Turn
		document.getElementById(activeRow+"0").innerHTML="<img src='images/rnd"+GameRow+"c.png' alt='Empty' width='65' height='70' border='0';/>"
		//Change Game Counter of Old Turn
		document.getElementById(OldRow+"0").innerHTML="<img src='images/rnd"+GameOld+".png' alt='Empty' width='65' height='70' border='0';/>"
		if(activeRow == 0){
			loser();
		};
		pGuess=[];
	};

function mDownCheckScore(obj){
	let peg = controller.getCell(obj);
	let selRow = peg.charAt(0);
	chkGuess2(selRow);
    displayFlag();
}


function mDownGuess(obj) {
	let peg = controller.getCell(obj);
	let selRow = peg.charAt(0);
	let selColumn = peg.charAt(1);
	let chkCell = peg.charAt(0)+(Number(peg.charAt(1))+1)
	if(selRow == activeRow){
	procGuess(selColumn);
	obj.innerHTML="<img src='images/"+cImg+".png' alt='Empty' width='65' height='70' border='0';/>"
	}
	else
	alert("Please Choose a peghole in the current turn")
//if(pGuess.length == 0){
	//document.getElementById(chkCell).innerHTML="<td id='"+chkCell+"'onmousedown='mDownCheckScore(this)' width='65' valign='center' height='70' background='' align='center'><font color ='white'>Click to Check Score?</font></td>"

//}
};

function winner(){
	activeRow = 0;
	document.getElementById("00").innerHTML="<img src='images/you.png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("01").innerHTML="<img src='images/win.png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("02").innerHTML="<img src='images/"+model.secret[0]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("03").innerHTML="<img src='images/"+model.secret[1]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("04").innerHTML="<img src='images/"+model.secret[2]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("05").innerHTML="<img src='images/"+model.secret[3]+".png' alt='Empty' width='65' height='70' border='0';/>"
	
}

function loser(){
	activeRow = 0;
	document.getElementById("00").innerHTML="<img src='images/you.png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("01").innerHTML="<img src='images/lose.png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("02").innerHTML="<img src='images/"+model.secret[0]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("03").innerHTML="<img src='images/"+model.secret[1]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("04").innerHTML="<img src='images/"+model.secret[2]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("05").innerHTML="<img src='images/"+model.secret[3]+".png' alt='Empty' width='65' height='70' border='0';/>"
	document.getElementById("06").innerHTML="<font color ='white'>Out of Guesses!</font>"	
}

function chkGuess(curRow){
	if(pGuess.length == 0||pGuess.length<4){
		alert("Ensure all Pegs in current turn are populated")
	}
	else{
		var blackFlag= 0;
		var whiteFlag= 0;
		for(var i = 0; i < 4; ++i)
		{
			if(model.secret[i] == pGuess[i])
				++blackFlag;
			else if(model.secret[i] !== pGuess[i] && model.secret.indexOf(pGuess[i]))
				++whiteFlag;
			}
			processFlags(blackFlag,whiteFlag,curRow)
		}

};

function chkGuess2(curRow){
	if(pGuess.length == 0||pGuess.length<4){
		alert("Ensure all Pegs in current turn are populated")
	}
	else{
	var hints = {blackFlag: 0, whiteFlag: 0},
	secretCombination = model.secret.slice(),
	userCombination   = pGuess.slice(),
	i, x;

//check for correct positions
for (i = 0; i < 4; i++) {
  if (userCombination[i] === secretCombination[i]) {
	hints.blackFlag += 1;
	secretCombination[i] = userCombination[i] = null;
  }
}
//check for incorrect positions
for (i = 0; i < 4; i++) {
  for (x = 0; x < 4; x++) {
	if(userCombination[i] && secretCombination[x]) {
	  if (userCombination[i] === secretCombination[x]) {
		hints.whiteFlag += 1;
		secretCombination[x] = userCombination[i] = null;
	  				}
				}
  			}
		}
	}
	console.log(hints);
	processFlags(hints.blackFlag,hints.whiteFlag,curRow);
	//return hints;
};
function processFlags(blackFlag,whiteFlag,curRow){
	if(blackFlag == 4){
		winner();
	}
	else
	console.log("Secret: "+model.secret);
	console.log("Current Guess: "+ pGuess);

	let flagImg = "flag"+blackFlag+"b"+whiteFlag+"w"	
	console.log("blk " +blackFlag+" wht "+whiteFlag)
	activeRow -=1;
	GameRow +=1;
	OldRow -=1;
	GameOld +=1;
	displayFlag(curRow,flagImg);

}



function procGuess(location) {
	switch(location){
		case "2":
		pGuess[0] = cImg;
		break;
		case "3":
		pGuess[1] = cImg;
		break;
		case "4":
		pGuess[2] = cImg;
		break;
		case "5":
		pGuess[3] = cImg;
		break;
	}
};

function mDownColorPick(obj){
	cImg = tmp
	//console.log("cimg: " + cImg + " tmp: "+ tmp)
	document.getElementById("05").innerHTML="<img src='images/"+cImg+".png' alt='Empty' width='65' height='70' border='0';/>"
};


function mOver(obj){
	tmp = obj.innerHTML
	obj.innerHTML="Click to set Color";

};

function mOut(obj) {
    obj.innerHTML = tmp
};


// Game View Section


// Game Model Section
var model = {
	boardSize: 11, // used to determine if a guess is within the board scale
	allColors: ["w","p","y","g","r","b"],
	secret:[],
	numCurrent: 0, // set for future opportunity to produce more content, would need to expand Ships locations

	// Generates Secret for Vault
	generateSecret: function () {
		this.allColors.shuffle();
		this.secret = this.allColors.slice(0,4);
		//console.log(this.secret);
	},
};

// Game Controller section, passed guess to model section
var controller = {
	curRow: 0,
	guesses: 0,
	getCell: function(eventObj){
		let tdId = eventObj.id;
		let rowNumber = tdId[0];
		let colNumber = tdId[1];
		let cellAddr = rowNumber + colNumber;
		return (cellAddr);

		//controller.processGuess(cellAddr);
	}

};


// Helper function to parse a guess from the user
function parseGuess(guess) {
		var firstChar = guess.charAt(0);
		var row = guess.charAt(0);
		var column = guess.charAt(1);
			return row + column;
}

//  Helper Fucntion to get HTML element from the document by using the element id property
function getEID(id) {
	return document.getElementById(id);
}



// init - called when the page has completed loading
window.onload = init;


function init() {
	//Get area TextID with Mouse
	let tdList = document.getElementsByTagName("td");
	// generate secret code 
	model.generateSecret();
};
