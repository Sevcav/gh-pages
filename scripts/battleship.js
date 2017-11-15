/* CIS-133JS Ken Chapman 
    v1.5
	-BattlelShip Game Chapter 8 of HeadStart JS
		-Modified with graphics for different ships
		-Moved Styles to css.main within styles folder
		-Added board title image
		-Changed sunk logic to display ship when sank
		-Made Comments on functions and code throughout
*/

// Game View Section
var view = {
	displayMessage: function (msg) {
		var messageArea = getEID("messageArea");
		var messageAreaHit = getEID("messageAreaHit");
		if(msg === "HIT!" || msg === "You sank my battleship!"){
			messageArea.innerHTML = "";	
			messageAreaHit.innerHTML = msg;						
		}
		else
			messageAreaHit.innerHTML = "";	
			messageArea.innerHTML = msg;
	},
	displayHit: function (location, locImg) { // Passed from Model.Fire Function
		var cell = getEID(location);
		cell.setAttribute("class", locImg); // Changed from hard code "hit" to img variable set in Model.Fire Function
	},
	displayMiss: function (location) {
		var cell = getEID(location);
		cell.setAttribute("class", "miss");
	},
	displayFinal: function (msg) {
		var final = getEID("final");
		final.innerHTML = msg;
	},
};


// Game Model Section
var model = {
	boardSize: 7, // used to determine if a guess is within the board scale
	numShips: 3, // set for future opportunity to produce more content, would need to expand Ships locations
	shipLength: 3, // set for future opportunity to produce more content
	shipsSunk: 0,

	ships: [{
			locations: [0, 0, 0], //Generated grid locations 
			hits: ["", "", ""], //Array to hold hit locations 
			shipLength: 2
		}, // Ship 1 
		{
			locations: [0, 0, 0],
			hits: ["", "", ""],
			shipLength: 3
		}, // Ship 2
		{
			locations: [0, 0, 0],
			hits: ["", "", ""],
			ShipLength: 3
		}, // Ship 3
		{
			locations: [0, 0, 0, 0],
			hits: ["", "", "", ""],
			ShipLength: 4
		}, // Ship 4
		{
			locations: [0, 0, 0, 0, 0],
			hits: ["", "", "", "", ""],
			shipLength: 5
		} // Ship 5
	],

	fire: function (guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i]; //sets index and location of the ship# to be checked
			var index = ship.locations.indexOf(guess); // Chained variable that returns -1 if not found



			// Check to see if the ship has already been hit, message the user, and return true.
			if (ship.hits[index] === "hitBBAFT" || ship.hits[index] === "hitBBMID" || ship.hits[index] === "hitBBFRNT") {
				view.displayMessage("Oops, you already hit that location!");
				return true;

			} else if (index >= 0) {
				// Check to see which section of the ship is hit an assign the appropriate value and view
				// d variable added to image to display a horz image for 0 or vert image for 1 of ships.direction
				var img = "hitship";


				/*Cruiser Ship Code
				if (index === 0) {
					ship.hits[index] = "hitCLAFT"; //mark the array with a hit for the aft image
				} else if (index === 1) {
					ship.hits[index] = "hitCLMID"; //mark the array with a hit for the middle image
				} else {
					ship.hits[index] = "hitCLFRNT"; //mark the array with a hit for the front image	
				}
				*/

				if (index === 0) {
					ship.hits[index] = "hitBBAFT"; //mark the array with a hit for the aft image
				} else if (index === 1) {
					ship.hits[index] = "hitBBMID"; //mark the array with a hit for the middle image
				} else {
					ship.hits[index] = "hitBBFRNT"; //mark the array with a hit for the front image	
				}


				view.displayHit(guess, img); //pass to the viewer the guessed location and damage display image
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					this.drawSunk(ship);
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess); //pass to the viewer the guessed location
		view.displayMessage("You missed.");
		return false;
	},

	// Check to see if number of hits in array  = length of ship
	isSunk: function (ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hitBBAFT" && ship.hits[i] !== "hitBBMID" && ship.hits[i] !== "hitBBFRNT") {
				return false;
			}
		}
		return true;
	},

	//Replaces Hit icon in each location with ship image of either horizontal or vertical image
	drawSunk: function (ship) {
		var directionCheck1 = ship.locations[0];
		var directionCheck2 = ship.locations[1];
		if (directionCheck1.charAt(0) === directionCheck2.charAt(0)) {
			//Horizonal
			view.displayHit(ship.locations[0], "hitBBAFT0");
			view.displayHit(ship.locations[1], "hitBBMID0");
			view.displayHit(ship.locations[2], "hitBBFRNT0");
		} else {
			//Vertical
			view.displayHit(ship.locations[0], "hitBBAFT1");
			view.displayHit(ship.locations[1], "hitBBMID1");
			view.displayHit(ship.locations[2], "hitBBFRNT1");
		}
	},

	// Ship generate section - Sets the ship random location horiz/vert, while checking for any collisions or going off board
	generateShipLocations: function () {
		var locations;

		for (var i = 0; i < this.numShips; i++) {
			do { // do while loop used until there are no collisions
				locations = this.generateShip(); //return of array built as newShipLocations
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	// Generates a random ship direction, returning 1 or 0 for horizontal and vertical ship placement
	generateShipDirection: function () {
		var dir = Math.floor(Math.random() * 2);
		return dir;
	},

	//Generates each ship location and places position points in ship array; checks for on board an no collisions
	generateShip: function () {
		var direction = this.generateShipDirection();
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}
		// Sets the new ship location array
		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	//Checks pre-existing ship locations, if true, ship generator re-runs until no collisions exist
	collision: function (locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

};

// Game Controller section, passed guess to model section


var controller = {
	guesses: 0,
	processGuess: function (guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayFinal("You sank the Fleet, in " + this.guesses + " guesses");
			}
		}
	{	
	}
	},

	getCell: function(eventObj){
		let tdId = eventObj.target.id;
		const ALPHA = "ABCDEFG";
		let row = tdId[0];
		let rowLetter = ALPHA[row];
		let colNumber = tdId[1];
		let cellAddr = rowLetter + colNumber;
		controller.processGuess(cellAddr);
	},

};


// Helper function to parse a guess from the user
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
			column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

//  Helper Fucntion to get HTML element from the document by using the element id property
function getEID(id) {
	return document.getElementById(id);
}

// Web Page/User Event handlers
//On Fire button click execution
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

//On Enter (return) keyboard click execution
function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");


	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}


// init - called when the page has completed loading
window.onload = init;


function init() {
	//Get area TextID with Mouse
	let tdList = document.getElementsByTagName("td");

	// add an onclick event to each td element in the list
	for(let tdIndex =0; tdIndex < tdList.length; tdIndex ++){
		let tdElement = tdList[tdIndex];
		tdElement.onclick = controller.getCell;
	}

	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}