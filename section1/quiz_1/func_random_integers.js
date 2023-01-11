//function to generate random x integers and x should be passed as a parameter
export function randomIntegers(x) {
    //generate random integers
    let randomIntegers = [];
    for (var i = 0; i < x; i++) {
        //the numbers generated should be between 0 and x
        randomIntegers.push(Math.floor(Math.random() * x));
    }
    //return the random integers
    return randomIntegers;

}

export default randomIntegers;