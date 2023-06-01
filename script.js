let operand1 = undefined;
let operand2 = undefined;
let operator = undefined;
let calculationResult = undefined;
let currentNumber = "";

const display = document.getElementById("display");
const typedNumber = document.getElementById("typedNumber");
const equation = document.getElementById("equation");
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const deleteButton = document.getElementById("delete");

const operations = {
  "%": (operand1, operand2) => parseFloat(operand1) % parseFloat(operand2),
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

const updateDisplay = (text) => {
  equation.textContent = operator
    ? `${formatNumber(operand1)} ${operator}`
    : "";
  typedNumber.textContent = formatNumber(text);
};

const formatNumber = (num) =>
  num.toString().length > 10 ? num.toExponential(4) : num;

const reset = () => {
  [operand1, operand2, operator] = [undefined, undefined, undefined];
  currentNumber = "";
  equation.textContent = "";
  updateDisplay("0");
};

const performOperation = () => {
  if (!operand1 || !operand2) return;
  calculationResult = formatNumber(operations[operator](operand1, operand2));
  updateDisplay(calculationResult);
  [operand1, operand2, operator] = [calculationResult, undefined, undefined];
};

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

Array.from(operatorButtons).forEach((button) => {
  button.addEventListener("click", function () {
    performOperation();
    operator = this.innerText;
    currentNumber = "";
    updateDisplay(currentNumber);
  });
});

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
  } else if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    if (operator && operand2) {
      operand2 = currentNumber;
      updateDisplay(operand2);
    } else {
      operand1 = currentNumber;
      updateDisplay(operand1);
    }
    if (currentNumber === "" && operator) {
      operator = undefined;
      currentNumber = operand1;
      operand1 = currentNumber;
      updateDisplay(operand1);
      equation.textContent = "";
    }
  }
});
