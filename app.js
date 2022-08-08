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
      if (secondNumber == 0) {
        return "🤔";
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
let dotButton = document.querySelector(".dot");

let state = {
  operatorIsActive: false,
  currentOperator: "",
  firstValue: "",
  secondValue: "",
}

let backspace = function() {
  displayValue.textContent = displayValue.textContent.slice(0, -1);
  if (displayValue.textContent.length === 0) displayValue.textContent = 0;
};

backspaceButton.addEventListener("click", backspace)

let equals = function() {
  calculate();
  state.currentOperator = "";
}

equalsButton.addEventListener("click", calculate);


let clear = function () {
  displayValue.textContent = 0;
  state.currentOperator = "";
  state.firstValue = "";
  state.secondValue = "";
};

clearButton.addEventListener("click", clear);

function calculate() {
  state.secondValue = displayValue.textContent;
  console.log(state.currentOperator);
  console.log(state.firstValue);
  console.log(state.secondValue);
  displayValue.textContent = operate(state.currentOperator, Number(state.firstValue), Number(state.secondValue));
  if (displayValue.textContent !== "ERROR" && displayValue.textContent !== "🤔") {
    displayValue.textContent = +parseFloat(displayValue.textContent).toFixed(3);
  };
  displayValue.textContent = displayValue.textContent.substring(0, 9);
  state.currentOperator = ""
};

let operatorPressed = function() {
  {
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
    //
    // if (state.currentOperator !== "" && state.operatorIsActive === true) {
    //   this.style.backgroundColor = "white"
    // };
  };
};

for (let i = 0; i < operators.length; i ++) {
  operators[i].addEventListener("click", operatorPressed);
};

document.body.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key == "Escape") clear();
  if (e.key == "=" || e.key == "Enter") equals();
  if (e.key == "Backspace") backspace();
  if (e.key == "+") plusButton.click();
  if (e.key == "-") minusButton.click();
  if (e.key == "*") multiplyButton.click();
  if (e.key == "/") divideButton.click();
  if (e.key == ".") dotButton.click();
  let numbersArray = Array.from(numbers);
  numbersArray.forEach(number => {
    if (number.textContent.includes(e.key)) {
      numberEntered(number.click())
    }
  });
})

let numberEntered = function (input) {
  input = (this.textContent);
  if (input != undefined) {
    if (displayValue.textContent === "0") displayValue.textContent = "";
    if (state.operatorIsActive === true) {
      state.firstValue = displayValue.textContent;
      displayValue.textContent = "";
      state.operatorIsActive = false;
    };
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
  };
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click",  numberEntered);     
};
