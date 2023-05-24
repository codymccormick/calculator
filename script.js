let num1 = undefined;
let num2 = undefined;
let operator = undefined;
let result = undefined;
let currentNumber = "";

const display = document.getElementById("display");
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const deleteButton = document.getElementById("delete");

const addition = (num1, num2) => parseFloat(num1) + parseFloat(num2);
const subtraction = (num1, num2) => parseFloat(num1) - parseFloat(num2);
const multiplication = (num1, num2) => parseFloat(num1) * parseFloat(num2);
const division = (num1, num2) => parseFloat(num1) / parseFloat(num2);

const calculate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return addition(num1, num2);
    case "-":
      return subtraction(num1, num2);
    case "x":
      return multiplication(num1, num2);
    case "/":
      if (num1 == 0 || num2 == 0) {
        return "Error";
      } else {
        return division(num1, num2);
      }
  }
};

const reset = () => {
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  currentNumber = "";
  display.textContent = "0";
};

for (let button of numberButtons) {
  button.addEventListener("click", function () {
    if (num1 === result && !operator) {
      reset();
    }
    const number = this.innerText;
    currentNumber += number;
    if (operator) {
      num2 = currentNumber;
      display.textContent = `${num1} ${operator} ${num2}`;
    } else {
      num1 = currentNumber;
      display.textContent = num1;
    }
  });
}

for (let button of operatorButtons) {
  button.addEventListener("click", function () {
    if (num1 && num2) {
      result = calculate(num1, num2, operator);
      display.textContent = result;
      num1 = result;
      num2 = undefined;
      operator = undefined;
    }
    operator = this.innerText;
    display.textContent += " " + this.textContent;
    currentNumber = "";
  });
}

calculateButton.addEventListener("click", function () {
  if (!num2) {
    reset();
  }
  result = calculate(num1, num2, operator);
  display.textContent = result;
  num1 = result;
  num2 = undefined;
  operator = undefined;
});

clearButton.addEventListener("click", reset);

decimalButton.addEventListener("click", function () {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    if (operator) {
      display.textContent = `${num1} ${operator} ${currentNumber}`;
    } else {
      display.textContent = currentNumber;
    }
  }
});

deleteButton.addEventListener("click", function () {
  if (currentNumber === "" && operator) {
    operator = undefined;
    display.textContent = num1;
    currentNumber = num1;
  } else if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);

    if (operator && num2) {
      num2 = currentNumber;
      display.textContent = `${num1} ${operator} ${num2}`;
    } else {
      num1 = currentNumber;
      display.textContent = num1;
    }
  }
});
