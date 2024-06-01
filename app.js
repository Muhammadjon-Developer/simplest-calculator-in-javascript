document.addEventListener("DOMContentLoaded", () => {
  const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  const updateDisplay = () => {
    const display = document.querySelector(".calculator-screen");
    display.value = calculator.displayValue;
  };

  const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        displayValue === "0" ? digit : displayValue + digit;
    }
  };

  const inputDecimal = (dot) => {
    if (calculator.waitingForSecondOperand) return;

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  };

  const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);

      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  };

  const performCalculation = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
  };

  const resetCalculator = () => {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  };

  document
    .querySelector(".calculator-keys")
    .addEventListener("click", (event) => {
      const { target } = event;
      const { value } = target;
      if (!target.matches("button")) return;

      switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
          handleOperator(value);
          break;
        case ".":
          inputDecimal(value);
          break;
        case "all-clear":
          resetCalculator();
          break;
        default:
          inputDigit(value);
      }

      updateDisplay();
    });

  updateDisplay();
});
