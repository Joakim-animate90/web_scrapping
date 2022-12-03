//function to generate random x integers and x should be passed as a parameter
export function randomIntegers(x) {
    //generate random integers
    var randomIntegers = [];
    for (var i = 0; i < x; i++) {
        //the numbers generated should be between 1 and x
        randomIntegers.push(Math.floor(Math.random() * x) + 1);
    }
    //return the random integers
    return randomIntegers;

}
console.log(randomIntegers(100));
export default randomIntegers;