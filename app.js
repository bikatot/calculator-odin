function add(a, b) {
  return (a + b);
};

function subtract(a, b) {
  return (a - b);
};

function multiply(a, b) {
  return (a * b);
};


function divide(a, b) {
  return (a / b);
};

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      console.log(`${add(firstNumber, secondNumber)}`);      
      break;
    case "-":
      console.log(`${subtract(firstNumber, secondNumber)}`);  
      break;
    case "*":
      console.log(`${multiply(firstNumber, secondNumber)}`);  
      break;
    case "/":
      console.log(`${divide(firstNumber, secondNumber)}`);  
      break;
    default: console.log("Something went wrong");
      break;
  };
};

console.log(operate("/", 50, 10));
