const math = require('./math');

// // log the entire math module
// console.log(math);

// use the add function from the math module
const result = math.add(5,10);
console.log('The sum is:', result);

// use the subtract function from the math module
const diffrence = math.subtract(10,5);
console.log('The difference is:', diffrence);

// use the multiply function from the math module
const product = math.multiply(5,10);
console.log('The product is:', product);

// use the divide function from the math module
const quotient = math.divide(10,5);
console.log('The quotient is:', quotient);


// use the modulus function from the math module
const remainder = math.modulus(10,3);
console.log('The remainder is:', remainder);