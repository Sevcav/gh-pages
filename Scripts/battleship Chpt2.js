/* CIS-133JS Ken Chapman 
	BattlelShip Game Chapter 2 of HeadStart JS
	Modified with let Function instead of VAR
	Converted to using Funtions
	Added an array and a function to check if passed parameter is within array
*/

// Returns true if passed param is in array, or false if it does not 
/*
function includes(k) {
	alert(k);
	for (var i = 0; i < this.length; i++) {
		if (this[i] === k || (this[i] !== this[i] && k !== k)) {
			return true;
		}
	}
	return false;
}
*/

function BBGAME() {
	// Random Creates a number between .01 to .99, Floor Rounds Dwn
	let randomLoc = Math.floor(Math.random() * 5);
	let location1 = randomLoc;
	let location2 = location1 + 1;
	let location3 = location1 + 2;
	let guess;
	let prevguess = []; //Build an Array of previous totGuesses
	let hits = 0;
	let totGuesses = 0;
	let isSunk = false;

	// Check for incorrect entry or previous guess of location already made
	while (isSunk == false) {
		guess = prompt("Ready, aim, fire! (Enter a number from 0-6):");

		if (guess < 0 || guess > 6) {
			alert("Please enter a valid cell number!");
		} else {
			// Added a check here to see if guess has already been made
			if (prevguess.includes(guess)) {
				alert("That cell has already been guessed before!")
			} else {
				++totGuesses; 					// Increment totGuesses by 1
				prevguess.push(guess); 		// Add guess to prevguess array

				if (guess == location1 || guess == location2 || guess == location3) {
					alert("HIT!");
					hits = hits + 1;

					if (hits === 3) {
						isSunk = true;
						alert("You sank my battleship!");
					}
				} else {
					alert("MISS");
				}
			}
		}
	}

	let stats = "You took " + totGuesses + " Guesses to sink the battleship, " +
		"which means your shooting accuracy was " + (3 / totGuesses);

	alert(stats);
}
