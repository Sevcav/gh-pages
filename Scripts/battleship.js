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

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");
