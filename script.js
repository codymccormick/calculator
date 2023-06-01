// Initialize variables for calculator operations
let operand1 = undefined;
let operand2 = undefined;
let operator = undefined;
let calculationResult = undefined;
let currentNumber = "";

// Get DOM elements
const display = document.getElementById("display");
const typedNumber = document.getElementById("typedNumber");
const equation = document.getElementById("equation");
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const deleteButton = document.getElementById("delete");

// Define operation functions for calculator
const operations = {
  "%": (operand1, operand2) =>
    parseFloat(operand1 / 100) * parseFloat(operand2),
  "+": (operand1, operand2) => parseFloat(operand1) + parseFloat(operand2),
  "-": (operand1, operand2) => parseFloat(operand1) - parseFloat(operand2),
  "*": (operand1, operand2) => parseFloat(operand1) * parseFloat(operand2),
  "/": (operand1, operand2) => {
    if (operand2 == 0) {
      return "Error!";
    } else {
      return parseFloat(operand1) / parseFloat(operand2);
    }
  },
};

// Function to format number for display
const formatNumber = (num) =>
  num.toString().length > 10 ? num.toExponential(4) : num;

// Function to update the display on the calculator
const updateDisplay = (text) => {
  equation.textContent = operator
    ? `${formatNumber(operand1)} ${operator}`
    : "";
  typedNumber.textContent = formatNumber(text);
};

// Function to reset the calculator's state
const reset = () => {
  [operand1, operand2, operator] = [undefined, undefined, undefined];
  currentNumber = "";
  equation.textContent = "";
  updateDisplay("0");
};

// Function to perform an operation on the calculator
const performOperation = () => {
  if (!operand1 || !operand2) return;
  calculationResult = formatNumber(operations[operator](operand1, operand2));
  updateDisplay(calculationResult);
  [operand1, operand2, operator] = [calculationResult, undefined, undefined];
};

// Event handlers for number buttons
Array.from(numberButtons).forEach((button) => {
  button.addEventListener("click", function () {
    if (operand1 === calculationResult && !operator) reset();
    if (currentNumber.length === 10) return;

    currentNumber += this.innerText;

    if (operator) {
      operand2 = currentNumber;
      updateDisplay(operand2);
    } else {
      operand1 = currentNumber;
      updateDisplay(operand1);
    }
  });
});

// Event handlers for operator buttons
Array.from(operatorButtons).forEach((button) => {
  button.addEventListener("click", function () {
    performOperation();
    operator = this.innerText;
    currentNumber = "";
    updateDisplay(currentNumber);
  });
});

// Event handlers for special function buttons
calculateButton.addEventListener("click", function () {
  operand2 ? performOperation() : reset();
  equation.textContent = "";
});

clearButton.addEventListener("click", reset);

decimalButton.addEventListener("click", function () {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    updateDisplay(currentNumber);
  }
});

deleteButton.addEventListener("click", function () {
  if (currentNumber === "" && operator) {
    operator = undefined;
    updateDisplay(operand1);
    currentNumber = operand1;
    equation.textContent = "";
  } else if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    if (operator && operand2) {
      operand2 = currentNumber;
      updateDisplay(operand2);
    } else {
      operand1 = currentNumber;
      updateDisplay(operand1);
    }
  }
});

// Keyboard Support

function clickButton(buttons, value) {
  const button = Array.from(buttons).find(
    (button) => button.textContent === value
  );
  if (button) button.click();
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key)) {
    clickButton(numberButtons, key);
  } else if (["%", "+", "-", "*", "/"].includes(key)) {
    clickButton(operatorButtons, key);
    event.preventDefault()
  }

  if (key === "Enter") {
    calculateButton.click();
  }

  if (key === "Backspace") {
    deleteButton.click();
  }

  if (key === ".") {
    decimalButton.click();
  }
});
