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
  "+": (operand1, operand2) => parseFloat(operand1) + parseFloat(operand2),
  "-": (operand1, operand2) => parseFloat(operand1) - parseFloat(operand2),
  x: (operand1, operand2) => parseFloat(operand1) * parseFloat(operand2),
  "/": (operand1, operand2) => {
    if (operand1 == 0 || operand2 == 0) {
      return "Error";
    } else {
      return parseFloat(operand1) / parseFloat(operand2);
    }
  },
};

const updateDisplay = (text) => {
  if (operand2) {
    equation.textContent = `${operand1} ${operator} ${operand2}`;
  } else if (operator) {
    equation.textContent = `${operand1} ${operator}`;
  }
  typedNumber.textContent = text;
};

const reset = () => {
  operand1 = undefined;
  operand2 = undefined;
  operator = undefined;
  currentNumber = "";
  updateDisplay("0");
  equation.textContent = "";
};

for (let button of numberButtons) {
  button.addEventListener("click", function () {
    if (operand1 === calculationResult && !operator) {
      reset();
    } else if (currentNumber.length === 10) {
      return;
    }
    currentNumber += this.innerText;
    if (operator) {
      operand2 = currentNumber;
      updateDisplay(operand2);
    } else {
      operand1 = currentNumber;
      updateDisplay(operand1);
    }
  });
}

for (let button of operatorButtons) {
  button.addEventListener("click", function () {
    if (operand1 && operand2) {
      calculationResult = operations[operator](operand1, operand2);
      updateDisplay(calculationResult);
      resetValuesAfterCalculation(calculationResult);
    }
    operator = this.innerText;
    currentNumber = "";
    updateDisplay(currentNumber);
  });
}

calculateButton.addEventListener("click", function () {
  if (!operand2) {
    reset();
  } else {
    calculationResult = operations[operator](operand1, operand2);
    updateDisplay(calculationResult);
    resetValuesAfterCalculation(calculationResult);
    equation.textContent = "";
  }
});

clearButton.addEventListener("click", reset);

decimalButton.addEventListener("click", function () {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    if (operator) {
      updateDisplay(`${operand1} ${operator} ${currentNumber}`);
    } else {
      updateDisplay(currentNumber);
    }
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
      updateDisplay(`${operand1} ${operator} ${operand2}`);
    } else {
      operand1 = currentNumber;
      updateDisplay(operand1);
    }
  }
});

const resetValuesAfterCalculation = (calculationResult) => {
  operand1 = calculationResult;
  operand2 = undefined;
  operator = undefined;
};
