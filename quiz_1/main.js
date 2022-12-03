import OperationsOnRandomIntegers from './operations_on_random.js';
import  randomIntegers from './func_random_integers.js';

// create a variable to hold the random integers
const x = randomIntegers(100);
// create a variable to hold the operations
console.log(x)
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
console.log('The sum using foreach='+operations.sumRandomIntegersEach());
// perform the average
console.log('The average='+operations.average());
//find the mode
console.log('The mode='+operations.mode());
//find the median
console.log('The median='+operations.median());
//find unique elements
console.log('The unique elements='+operations.uniqueElements());
//find the even numbers by using filter
console.log('The even numbers using filter='+operations.evenNumbersFilter());
//find the even numbers by using search
console.log('The even numbers using for each='+operations.evenNumbersSearch());
//find numbers smaller than their index
console.log('The numbers smaller than their index='+operations.smallerThanIndex());
//sort the array in descending order
console.log('The array in descending order='+operations.squaredDescending());


