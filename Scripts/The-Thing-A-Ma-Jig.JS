

//Inner Loop Displays Clunk * Facky (times) from Outer Loop
function clunk(times) {
    var num = times;
    while (num > 0) {
        display("clunk");
        num = num - 1;
    }
}


function thingamajig(size) {
    var facky = 1;

    // no let or var declared so, clunkCounter becomes a Global Variable
    clunkCounter = 0;

    if (size === 0) {
        display("clank");
    } else if (size === 1) {
        display("thunk");
    } else {
        //Increments facky by a factor of size then outputs to clunk funtion
        // Example  5 * 1 = 5,  4 * 5 = 20, 3 * 20 = 60, 2 * 60 =120 
        while (size > 1) {
            facky = facky * size;
            size = size - 1;
        }
        clunk(facky);
    }
}

//
function display(output) {
    console.log(output);
    clunkCounter = clunkCounter + 1;

}

//Main function called by HTML when Button Clicked
//Initializes Clunk Counter to 0, 
//Passes parameter input to the function thingamajig,
//Displays final output
function Main() {
    var clunkCounter = 0;
    thingamajig(5);
    console.log(clunkCounter);
}

