//Adds to Big"O" this algorithm to shuffle the card array. Can be called anytime as a JS function
Array.prototype.concentration_card_shuffle = function() {
    let i = this.length - 1,
        j, temp;
    for (i - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
let myApp = {
    /* CIS-133JS Ken Chapman 
        v1.1
    	Concentration Game
    */

    // Game View Section
    view: {
        displayFinal: function(msg) {
            let final = document.getElementById("final");
            final.innerHTML = msg;
        },
    },

    // Game controller Section
    controller: {
        card_array: ['url(images/Card1.JPG) no-repeat', 'url(images/Card1.JPG) no-repeat',
            'url(images/Card2.JPG) no-repeat', 'url(images/Card2.JPG) no-repeat',
            'url(images/Card3.JPG) no-repeat', 'url(images/Card3.JPG) no-repeat',
            'url(images/Card4.JPG) no-repeat', 'url(images/Card4.JPG) no-repeat',
            'url(images/Card5.JPG) no-repeat', 'url(images/Card5.JPG) no-repeat',
            'url(images/Card6.JPG) no-repeat', 'url(images/Card6.JPG) no-repeat'
        ],
        card_values: [],
        card_ids: [],
        cards_flipped: 0,
        guesses: 0,
        handleButton: function() {
            document.getElementById('concentration_board').innerHTML = "";
            //Build New Game
            myApp.model.newBoard();
        }
    },

    // Game Model Section
    model: {
        newBoard: function() {
            myApp.controller.cards_flipped = 0;
            myApp.controller.guesses = 0;
            let output = '';
            myApp.controller.card_array.concentration_card_shuffle();
            for (let i = 0; i < myApp.controller.card_array.length; i++) {
                //set card id to i and assign value from array equivalent position for each document element
                /*
                example output <div id="card_0" onclick="concentrationFlipcard(this,'url(images/card1.JPG) no-repeat')"></div>
                */
                output += '<div id="card_' + i + '" onclick="myApp.model.concentrationFlipcard(this,\'' + myApp.controller.card_array[i] + '\')"></div>';
            }
            document.getElementById('concentration_board').innerHTML = output;
            document.getElementById("Button").style.visibility = "hidden";
        },
        concentrationFlipcard: function(card, imgID) {
            let val = imgID.slice(15, 16);
            //check to see if less than 2 cards flipped this round, if not assign value and show card
            if (card.innerHTML === "" && myApp.controller.card_values.length < 2) {
                card.style.background = imgID;
                card.innerHTML = val;
                //assign first card value and card id to holding arrays
                if (myApp.controller.card_values.length === 0) {
                    myApp.controller.card_values.push(val);
                    myApp.controller.card_ids.push(card.id);
                    //assign second card value and card id to holding arrays
                } else if (myApp.controller.card_values.length === 1) {
                    myApp.controller.card_values.push(val);
                    myApp.controller.card_ids.push(card.id);
                    myApp.controller.guesses += 1;
                    //check to see if match, if so add to total cards fliped count and clear holding arrays
                    if (myApp.controller.card_values[0] === myApp.controller.card_values[1]) {
                        myApp.controller.cards_flipped += 2;
                        // Clear both holding arrays
                        myApp.controller.card_values = [];
                        myApp.controller.card_ids = [];
                        // Check to see if the whole board is cleared
                        if (myApp.controller.cards_flipped === myApp.controller.card_array.length) {
                            //Display results
                            let pct = 6 / myApp.controller.guesses * 100
                            myApp.view.displayFinal("Great Memory! " + myApp.controller.guesses + " guesses!\  " + Math.round(pct) + " Percent out of 100 chance.");
                            //clear board
                            let result = function() {
                                document.getElementById('final').innerHTML = ""
                            };
                            setTimeout(result, 5000);
                            // Restart game button onclick handler
                            let Button = document.getElementById("Button");
                            Button.onclick = myApp.controller.handleButton;
                            document.getElementById("Button").style.visibility = "visible";
                        }
                    } else {
                        function flip2Back() {
                            // Flip the 2 cards back over
                            let card1 = document.getElementById(myApp.controller.card_ids[0]);
                            let card2 = document.getElementById(myApp.controller.card_ids[1]);
                            card1.style.background = 'url(images/BackofCard.jpg) no-repeat';
                            card1.innerHTML = "";
                            card2.style.background = 'url(images/BackofCard.jpg) no-repeat';
                            card2.innerHTML = "";
                            // Clear both arrays
                            myApp.controller.card_values = [];
                            myApp.controller.card_ids = [];
                        }
                        setTimeout(flip2Back, 700);
                    }
                }
            }
        }
    }
};
window.onload = myApp.model.newBoard();
