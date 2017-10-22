/* CIS-133JS Ken Chapman 
    v0.1
	BattlelShip Game Chapter 8 of HeadStart JS
	Modified with graphics for different ships
*/

//get HTML element from the document by using the element id property
function getEID(id) {
    return document.getElementById(id);
};

// Get the text (the value property for an 
// input box or a textarea given the HTML ID
function getEVal(id) {
    return getEID(id).value;
};

var view = {
	displayMessage: function(msg) {
		var messageArea = getEID("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = getEID(location);
		cell.setAttribute("class", "hitBBMID");
	},
	displayMiss: function(location) {
		var cell = getEID(location);
		cell.setAttribute("class", "miss");
	}
};

	var model = {
		boardSize: 7,
		numShips: 3,
		shipLength: 3,
		shipsSunk: 0,
		
		ships: [
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] }
		],
	
	// Test with hard-coded values for ship locations
	/*
		ships: [
			{ locations: ["06", "16", "26"], hits: ["", "", ""] },
			{ locations: ["24", "34", "44"], hits: ["", "", ""] },
			{ locations: ["10", "11", "12"], hits: ["", "", ""] }
		],
	*/
	
		fire: function(guess) {
			for (var i = 0; i < this.numShips; i++) {
				var ship = this.ships[i];
				var index = ship.locations.indexOf(guess); // returns -1 if not found
	
				// Check to see if the ship
				// has already been hit, message the user, and return true.
				if (ship.hits[index] === "hit*") {
					view.displayMessage("Oops, you already hit that location!");
					return true;
				} else if (index >= 0) {

					if (index = 1) {
						ship.hits[index] = "hitBBAFT";} //mark the array with a hit for the aft image
					else if (index = 2) {
						ship.hits[index] = "hitBBMID";} //mark the array with a hit for the middle image	
					else {
						ship.hits[index] = "hitBBFRNT";} //mark the array with a hit for the front image	
					

					view.displayHit(guess);
					view.displayMessage("HIT!");
	
					if (this.isSunk(ship)) {
						view.displayMessage("You sank my battleship!");
						this.shipsSunk++;
					}
					return true;
				}
			}
			view.displayMiss(guess);
			view.displayMessage("You missed.");
			return false;
		},
	
		isSunk: function(ship) {
			for (var i = 0; i < this.shipLength; i++)  {
				if (ship.hits[i] !== "hit") {
					return false;
				}
			}
			return true;
		},
	
		generateShipLocations: function() {
			var locations;
			for (var i = 0; i < this.numShips; i++) {
				do {
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

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");
