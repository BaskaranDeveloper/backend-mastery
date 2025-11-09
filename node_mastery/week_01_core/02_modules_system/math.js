// Create Math module

// 1. Create a function named `add` that takes two parameters and returns their sum.
function add(a,b){
    return a+b;
};

// 2. Create a function named `subtract` that takes two parameters and returns their difference.
function subtract(a,b){
    return a-b;
};

// 3. Create a function named `multiply` that takes two parameters and returns their product.
function multiply(a,b){
    return a*b;
};

// 4. Create a function named `divide` that takes two parameters and returns their quotient.
function divide(a,b){
    return a/b;
};

// 5. Create a function named `modulus` that takes two parameters and returns the remainder of their division.
function modulus(a,b){
    return a%b;
};

module.exports = {add, subtract,multiply,divide,modulus};
