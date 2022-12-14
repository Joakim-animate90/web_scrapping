// create a class
export class OperationsOnRandomIntegers {
    // create a constructor
    constructor(x=[]) {
        // create a variable to hold the sum
        this.sum = 0;
        // create a variable to hold the index
        this.i = 0;
        // create an array to hold the random integers
        this.x = x;
    }
    // create a method to sum the random integers using a for loop
    sumRandomIntegersFor() {
        // loop through the random integers and sum them
        for (let i = 0; this.i < this.x.length; this.i++) {

            this.sum += this.x[this.i];
        }
        // return the sum
        return this.sum;
    }
    // create a method to sum the random integers using a while loop
    sumRandomIntegersWhile() {
        // loop through the random integers and sum them
        while (this.i < this.x.length) {
            this.sum += this.x[this.i];
            this.i++;
        }
        // return the sum
        return this.sum;
    }
    // create a method to sum the random integers using reduce
    sumRandomIntegersReduce() {
        // loop through the random integers and sum them
        this.sum = this.x.reduce((a, b) => a + b, 0);
        // return the sum
        return this.sum;
    }
    // create a method to sum the random integers using recursion
    sumRandomIntegersRecursion() {
        // base case
        if (this.i === this.x.length) {
            return this.sum;
        } else {
            // recursive case
            this.sum += this.x[this.i];
            this.i++;
            return this.sumRandomIntegersRecursion();
        }
    }
    // create a method to sum the random integers using a foreach loop
    sumRandomIntegersEach() {
        // loop through the elements using foreach
        let sum = 0;
        this.x.forEach((element) => {
            // sum the elements
            let sum = 0;
            sum += element;
        }   );
        sum = this.sum;
        // return the sum
        return sum;


    }
    // create a method to perform the mode of the sum using map
    mode(){
        // create an object
        let modeObj = {};
        // loop through the random integers
        this.x.forEach((element) => {
            // if the element is not in the object
            if(!modeObj[element]){
                // set the element in the object to 0
                modeObj[element] = 0;
            }
            // increment the element in the object
            modeObj[element]++;

        });
        // create a variable to hold the mode
        let biggestValue = -1;
        let biggestKey = -1;
        // loop through the object
        Object.keys(modeObj).forEach((key) => {
            // if the value is bigger than the biggest value
            if(modeObj[key] > biggestValue){
                // set the biggest value to the value
                biggestValue = modeObj[key];
                // set the biggest key to the key
                biggestKey = key;
            }
        });
        // return the mode
        return biggestKey;
        }




    // create a method to perform the average of the sum
    average() {
        // perform the average
        return this.sum / this.x.length;
    }
    // create a method to perform the median of the sum
    median() {
        // sort the random integers
        this.x.sort((a, b) => a - b);
        // create a variable to hold the middle index
        let middleIndex = Math.floor(this.x.length / 2);
        // create a variable to hold the median
        let median = this.x[middleIndex];
        // return the median
        return median;
    }
    //create a met

    //create a method to find all unique elements in the array
    uniqueElements() {
        //create a variable to hold the unique elements
        let uniqueElements = [];
        //loop through the random integers
        this.x.forEach((element) => {
            //if the unique elements does not include the element
            if (!uniqueElements.includes(element)) {
                //push the element to the unique elements
                uniqueElements.push(element);
            }
        });
        //return the unique elements
        return uniqueElements;
    }
    //find even numbers  using filter
    evenNumbersFilter() {
        let evenNumbers = [];
        //using filter
        evenNumbers = this.x.filter((element) => {
            return element % 2 === 0;

        });
        return evenNumbers;
    }
    //find even numbers using search
    evenNumbersSearch() {
        let evenNumbers = [];
        //using search
        this.x.forEach((element) => {
            if (element % 2 === 0) {
                evenNumbers.push(element);

            }
        });
        return evenNumbers;
    }
    //find numbers that are smaller than their index, and their corresponding index
    smallerThanIndex() {
        let smallerThanIndex = [];
        //loop through the random integers
        this.x.forEach((element, index) => {
            //if the element is smaller than the index
            if (element < index) {
                //push the element and index to the smaller than index
                smallerThanIndex.push(element);
            }
        });
        //return the smaller than index
        return smallerThanIndex;
    }
    //Create a new array which corresponds to the elements in the original array but squared
    squared() {
        let squared = [];
        //loop through the random integers
        this.x.forEach((element) => {
            //push the element squared to the squared
            squared.push(element * element);
        });
        //return the squared
        return squared;
    }
    //sort the squared array in descending order
squaredDescending() {
    let squaredDescending = [];
    //loop through the random integers
    this.squared().forEach((element) => {
        //push the element squared to the squared
        squaredDescending.push(element);
    });
    //sort the squared descending
    squaredDescending.sort((a, b) => b - a);
    //return the squared descending
    return squaredDescending;
}


}
export default OperationsOnRandomIntegers;
