let num1;
let num2;
let operator;

const addition = (num1, num2) => num1 + num2;

const subtraction = (num1, num2) => num1 - num2;

const multiplication = (num1, num2) => num1 * num2;

const division = (num1, num2) => num1 / num2;

const operate = (num1, num2, operator) => {
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
