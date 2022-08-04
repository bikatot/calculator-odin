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
      return(`${add(firstNumber, secondNumber)}`);
    case "-":
      return (`${subtract(firstNumber, secondNumber)}`);  
    case "*":
      return(`${multiply(firstNumber, secondNumber)}`);  
    case "/":
      console.log(secondNumber);
      if (secondNumber === 0) {
        return "Nope";
      } else {
      return (`${divide(firstNumber, secondNumber)}`)};  
    default: return("ERROR");
  };
};

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator")
let displayValue = document.querySelector(".display");
let clearButton = document.querySelector(".clear");
let plusButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
let equalsButton = document.querySelector(".equals");
let backspaceButton = document.querySelector(".backspace");

let state = {
  operatorIsActive: false,
  currentOperator: "",
  firstValue: "",
  secondValue: "",
}

backspaceButton.addEventListener("click", () => {
  displayValue.textContent = displayValue.textContent.slice(0, -1);
  if (displayValue.textContent.length === 0) displayValue.textContent = 0;
});

function calculate() {
  state.secondValue = displayValue.textContent;
  console.log(state.currentOperator);
  console.log(state.firstValue);
  console.log(state.secondValue);
  displayValue.textContent = operate(state.currentOperator, Number(state.firstValue), Number(state.secondValue));
  if (displayValue.textContent !== "ERROR" && displayValue.textContent !== "Nope") {
    displayValue.textContent = +parseFloat(displayValue.textContent).toFixed(3);
  };
  displayValue.textContent = displayValue.textContent.substring(0, 9);
};

equalsButton.addEventListener("click", () => {
  calculate();
  state.currentOperator = "";
});

clearButton.addEventListener("click", () => {
  displayValue.textContent = 0;
  state.currentOperator = "";
  state.firstValue = "";
  state.secondValue = "";
});

for (let i = 0; i < operators.length; i ++)
  operators[i].addEventListener("click", function(operatorButton) {
    state.operatorIsActive = true;
    if(state.currentOperator !== "" && state.operatorIsActive === true) {
      calculate();
    };
    operatorButton = this.textContent;
    switch (operatorButton) {
      case "–":
        operatorButton = "-";
        break;
      case "×":
        operatorButton = "*";
        break;
      case "÷":
        operatorButton = "/";
        break;
    };
    state.currentOperator = operatorButton;
  });

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function(input) {
    if (displayValue.textContent === "0") displayValue.textContent = "";
    console.log(state.operatorIsActive);
    if (state.operatorIsActive === true) {
      state.firstValue = displayValue.textContent;
      displayValue.textContent = "";
      state.operatorIsActive = false;
    };
    input = this.textContent;
    displayValue.textContent = displayValue.textContent.substring(0, 9);   
    if (input === "⋅") {
      if (displayValue.textContent === "") {
        displayValue.append("0" + ".");
      } else if (displayValue.textContent.includes(".")) {
        //Dot already present, no action needed.
      } else {
        displayValue.append(".");
        displayValue.textContent = displayValue.textContent.substring(0, 9);   
      };
    } else {
      displayValue.append(input);
      displayValue.textContent = displayValue.textContent.substring(0, 9);   
    };
  });     
};
