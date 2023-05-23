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

const addition = (num1, num2) => num1 + num2;
const subtraction = (num1, num2) => num1 - num2;
const multiplication = (num1, num2) => num1 * num2;
const division = (num1, num2) => num1 / num2;

const calculate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return addition(num1, num2);
    case "-":
      return subtraction(num1, num2);
    case "x":
      return multiplication(num1, num2);
    case "/":
      return division(num1, num2);
  }
};

for (let button of numberButtons) {
  button.addEventListener("click", function () {
    if (num1 == result && !operator) {
      display.textContent = " ";
      num1 = undefined;
      result = undefined;
      currentNumber = "";
    }
    const number = this.innerText;
    currentNumber += number;
    if (operator) {
      num2 = parseInt(currentNumber);
      display.textContent = `${num1} ${operator} ${num2}`;
    } else {
      num1 = parseInt(currentNumber);
      display.textContent = num1;
    }
  });
}

for (let button of operatorButtons) {
  button.addEventListener("click", function () {
    operator = this.innerText;
    display.textContent += " " + this.textContent;
    currentNumber = "";
  });
}

if (calculateButton) {
  calculateButton.addEventListener("click", function () {
    result = calculate(num1, num2, operator);
    display.textContent = result;
    num1 = result;
    num2 = undefined;
    operator = undefined;
  });
}

if (clearButton) {
  clearButton.addEventListener("click", function () {
    display.textContent = " ";
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    currentNumber = "";
  });
}


