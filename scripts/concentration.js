/* CIS-133JS Ken Chapman 
    v1.0
	Concentration Game
*/

// Game View Section
let view = {
	displayFinal: function (msg) {
		let final = document.getElementById("final");
		final.innerHTML = msg;
	},
};

// Game Model Section

let card_array = ['url(images/card1.jpg) no-repeat','url(images/card1.jpg) no-repeat',
                'url(images/card2.jpg) no-repeat','url(images/card2.jpg) no-repeat',
                'url(images/card3.jpg) no-repeat','url(images/card3.jpg) no-repeat',
                'url(images/card4.jpg) no-repeat','url(images/card4.jpg) no-repeat',
                'url(images/card5.jpg) no-repeat','url(images/card5.jpg) no-repeat',
                'url(images/card6.jpg) no-repeat','url(images/card6.jpg) no-repeat'];
let card_values = [];
let card_card_ids = [];
let cards_flipped = 0;
let guesses = 0;

//Adds to Big"O" this algorithm to shuffle the card array, so it can be called anytime
Array.prototype.concentration_card_shuffle = function(){
    let i = this.length-1, j, temp;
    for (i - 1; i > 0; i -= 1) {    
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	cards_flipped = 0;
	let output = '';
    card_array.concentration_card_shuffle();
	for(let i = 0; i < card_array.length; i++){
        //set card id to i and assign value from array equivalent position for each document element
        /*
        example output <div id="card_0" onclick="concentrationFlipcard(this,'url(images/card1.jpg) no-repeat')"></div>
        */
        output += '<div id="card_'+i+'" onclick="concentrationFlipcard(this,\''+card_array[i]+'\')"></div>'; 
	}
    document.getElementById('concentration_board').innerHTML = output;
    document.getElementById("Button").style.visibility = "hidden"; 
}
function concentrationFlipcard(card,imgID){
            let val = imgID.slice(15,16);
            //check to see if less than 2 cards flipped this round, if not assign value and show card
            if(card.innerHTML === "" && card_values.length < 2){
                card.style.background = imgID;
                card.innerHTML = val;
                //assign first card value and card id to holding arrays
                if(card_values.length === 0){
                    card_values.push(val);
                    card_card_ids.push(card.id);
                //assign second card value and card id to holding arrays
                } else if(card_values.length === 1){
                    card_values.push(val);
                    card_card_ids.push(card.id);
                    guesses += 1;                    
                //check to see if match, if so add to total cards fliped count and clear holding arrays
                    if(card_values[0] === card_values[1]){
                        cards_flipped += 2; 
                        // Clear both holding arrays
                        card_values = [];
                        card_card_ids = [];
                        // Check to see if the whole board is cleared
                        if(cards_flipped === card_array.length){
                            //Display results
                            let pct = 12/guesses * 100
                            view.displayFinal("Great Memory! " + guesses + " guesses!\  "+Math.round(pct)+ " Percent out of 100 chance.");
                            //clear board
                            let result = function(){document.getElementById('final').innerHTML= ""};
                            setTimeout(result,5000);
                            // Restart game button onclick handler
	                        let Button = document.getElementById("Button");
                            Button.onclick = handleButton;
                            document.getElementById("Button").style.visibility = "visible";
                        }
                    } else {
                        function flip2Back(){
                            // Flip the 2 cards back over
                            let card1 = document.getElementById(card_card_ids[0]);
                            let card2 = document.getElementById(card_card_ids[1]);
                            card1.style.background = 'url(images/BackofCard.jpg) no-repeat';
                            card1.innerHTML = "";
                            card2.style.background = 'url(images/BackofCard.jpg) no-repeat';
                            card2.innerHTML = "";
                            // Clear both arrays
                            card_values = [];
                            card_card_ids = [];
                        }
                        setTimeout(flip2Back, 700);
                    }
                }
            }
        }
        function handleButton() {
            document.getElementById('concentration_board').innerHTML = "";
            //Build New Game                            
            newBoard();
        }


window.onload = newBoard();
