
//create a function to perform quadratic equation  using currying in javascript

export default function quadratic(a) {
    return function (b) {
        return function (c) {
            return [(-b + Math.sqrt(b**2 - 4*a*c)) / (2*a), (-b - Math.sqrt(b**2 - 4*a*c)) / (2*a)]
        }
    }
}
//pass the values of a,b,c to the function
let [x1,x2] = quadratic(1)(2)(1);
console.log(x1,x2);

