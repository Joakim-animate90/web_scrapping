// create a class
export class OperationsOnRandomIntegers {
    // create a constructor
    constructor(x) {
        // create a variable to hold the sum
        this.sum = 0;
        // create a variable to hold the index
        this.i = 0;
        // create a variable to hold the random integers
        this.x = x;
    }
    // create a method to sum the random integers using a for loop
    sumRandomIntegersFor() {
        // loop through the random integers and sum them
        for (this.i = 0; this.i < this.x.length; this.i++) {
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
    sumRandomIntegersForEach() {
        // loop through the random integers and sum them
        this.x.forEach((element) => {
            this.sum += element;
        });
        // return the sum
        return this.sum;
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
    // create a method to perform the mode of the sum
    mode() {
        // create a variable to hold the mode
        let mode = 0;
        // create a variable to hold the count
        let count = 0;
        // create a variable to hold the mode count
        let modeCount = 0;
        // loop through the random integers
        this.x.forEach((element) => {
            // if the element is equal to the count
            if (element === count) {
                // increment the mode count
                modeCount++;
            } else {
                // reset the mode count
                modeCount = 1;
                // set the count to the element
                count = element;
            }
            // if the mode count is greater than the mode
            if (modeCount > mode) {
                // set the mode to the mode count
                mode = modeCount;
                // set the mode to the count
                mode = count;
            }
        });
        // return the mode
        return mode;
    }
}
export default OperationsOnRandomIntegers;
