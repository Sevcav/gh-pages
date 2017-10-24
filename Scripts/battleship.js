/* CIS-133JS Ken Chapman 
    v0.1
	BattlelShip Game Chapter 8 of HeadStart JS
	Modified with graphics for different ships
*/
// Game View  Section
var view = {
	displayMessage: function(msg) {
		var messageArea = getEID("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location, img) {
		var cell = getEID(location);
		cell.setAttribute("class", img); // Changed from hard code "hit" to img variable
	},
	displayMiss: function(location) {
		var cell = getEID(location);
		cell.setAttribute("class", "miss");
	}
};
// Game Model Section
	var model = {
		boardSize: 7, // used to determine if a guess is within the board scale
		numShips: 3, // set for future opportunity to produce more content, would need to expand Ships locations
		shipLength: 3, // set for future opportunity to produce more content
		shipsSunk: 0,
		
		ships: [
			{ locations: [0, 0, 0], hits: ["", "", ""] }, // Ship 1 
			{ locations: [0, 0, 0], hits: ["", "", ""] }, // Ship 2
			{ locations: [0, 0, 0], hits: ["", "", ""] } // Ship 3
		],
	

	
		fire: function(guess) {
			for (var i = 0; i < this.numShips; i++) {
				var ship = this.ships[i]; //sets index and location of the ship# to be checked
				var index = ship.locations.indexOf(guess); // Chained variable that returns -1 if not found
				alert("guess is:" + guess);
				var img = "";
				alert("index value is: " + index);
				// Check to see if the ship
				// has already been hit, message the user, and return true.
				if (ship.hits[index] === "hit*") { // added string * to inlcude any word beginning with "hit"
					view.displayMessage("Oops, you already hit that location!");
					return true;
				} else if (index >= 0) {
				// Check to see which section of the ship is hit an assign the appropriate value and view
					if (index = 0) {
						ship.hits[index] === "hitBBAFT"; //mark the array with a hit for the aft image
						img  = "hitBBAFT";}
					else if (index = 1) {
						ship.hits[index] === "hitBBMID";//mark the array with a hit for the middle image
						img  = "hitBBMID";}
					else {
						ship.hits[index] === "hitBBFRNT"; //mark the array with a hit for the front image	
						img = "hitBBFRNT";}

					view.displayHit(guess,img); //pass to the viewer the guessed location and damage display image
					view.displayMessage("HIT!");
	
					if (this.isSunk(ship)) {
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
		// Check to see if number of hits in arrary  = length of ship
		isSunk: function(ship) {
			for (var i = 0; i < this.shipLength; i++)  {
				if (ship.hits[i] !== "hit*") {
					return false;
				}
			}
			return true;
		},
	// Ship generate section - Sets the ship random location horiz/vert, while checking for any collisions or going off board
		generateShipLocations: function() {
			var locations;
			for (var i = 0; i < this.numShips; i++) {
				do { // do while loop used until there are no collisions
					locations = this.generateShip();
				} while (this.collision(locations));
				this.ships[i].locations = locations;
			}
			console.log("Ships array: ");
			console.log(this.ships);
		},
	
		generateShip: function() {
			var direction = Math.floor(Math.random() * 2);
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
	
		collision: function(locations) {
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

// Game Controller section 
var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank the Fleet, in " + this.guesses + " guesses");
			}
		}
	}
}


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
};

// Helper Funciton to Get the text (the value property for an 
// input box or a textarea given the HTML ID
function getEVal(id) {
    return getEID(id).value;
};

// Web Page/User Event handlers

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

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
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	model.generateShipLocations();
}


// Test section code

	// Test view Section with hard-coded values for ship locations
	/*
		ships: [
			{ locations: ["06", "16", "26"], hits: ["", "", ""] },
			{ locations: ["24", "34", "44"], hits: ["", "", ""] },
			{ locations: ["10", "11", "12"], hits: ["", "", ""] }
		],
	*/
/*
	Test for display
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");
*/