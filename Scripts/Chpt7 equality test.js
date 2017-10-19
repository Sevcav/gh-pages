// this loop returns in what position of the array lot is the car located 
function findCarINLot(car) {
    for (var i = 0; i < lot.length; i++) {
        if (car === lot[i]) {
            return i;
        }
    }
    retrun - 1;
}
//These desciptions Make and Model make no impact to the findCarINLot function call
var chevy = {
    make: "Chevy",
    model: "Bel Air"
};
var taxi = {
    make: "Webville Motors",
    model: "Taxi"
};
var fiat1 = {
    make: "Fiat",
    model: "500"
};
var fiat2 = {
    make: "Fiat",
    model: "500"
};

//chevy = pos 0, taxi = pos 1, fiat1 = pos 2, fiat2 = pos 3 
var lot = [chevy, taxi, fiat1, fiat2];

// Call the finCarInlot function and step through and determine which position in the array the car is in
var loc1 = findCarINLot(fiat2); //3
var loc2 = findCarINLot(taxi); //1
var loc3 = findCarINLot(chevy); //0
var loc4 = findCarINLot(fiat1); //2
