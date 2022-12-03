import OperationsOnRandomIntegers from './operations_on_random.js';
import  randomIntegers  from './random_integers.js';

// create a variable to hold the random integers
const x = randomIntegers(100);
// create a variable to hold the operations
const operations = new OperationsOnRandomIntegers(x);
// perform the sum using a for loop
console.log('The sum Using a For loop='+operations.sumRandomIntegersFor());
// perform the sum using a while loop
console.log('The sum Using a while loop='+operations.sumRandomIntegersWhile());
// perform the sum using reduce
console.log('The sum Using reduce ='+operations.sumRandomIntegersReduce());
// perform the sum using recursion
console.log('The sum using recursion='+operations.sumRandomIntegersRecursion());
// perform the sum using a foreach loop
console.log('The sum using foreach='+operations.sumRandomIntegersForEach());
// perform the average
console.log('The average='+operations.average());
//find the mode
console.log('The mode='+operations.mode());
//find the median
console.log('The median='+operations.median());
