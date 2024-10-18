document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".display");
  let currentInput = "";
  let previousInput = "";
  let operator = null;
  let memory = 0;

  function updateDisplay(value) {
    display.value = value;
  }

  // Handle number and dot (.) button clicks
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (!isNaN(value) || value === ".") {
        if (currentInput.includes(".") && value === ".") {
          return; // Prevent multiple dots
        }
        currentInput += value;
        updateDisplay(currentInput);
      }

      if (["+", "-", "*", "/", "%"].includes(value)) {
        if (currentInput !== "") {
          previousInput = currentInput;
          currentInput = "";
          operator = value;
        }
      }

      if (value === "=") {
        if (previousInput !== "" && currentInput !== "") {
          const result = calculate(
            parseFloat(previousInput),
            parseFloat(currentInput),
            operator
          );
          updateDisplay(result);
          currentInput = result.toString();
          previousInput = "";
          operator = null;
        }
      }

      if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay("");
      }
      if (value === "BkSp") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
      }
      if (value === "CE") {
        currentInput = "";
        updateDisplay("");
      }
      if (value === "MC") {
        memory = 0;
      }
      if (value === "MR") {
        currentInput = memory.toString();
        updateDisplay(currentInput);
      }
      if (value === "MS") {
        memory = parseFloat(currentInput);
      }
      if (value === "M+") {
        memory += parseFloat(currentInput);
      }

      if (value === "sqr") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay(currentInput);
      }
      if (value === "1/x") {
        currentInput = (1 / parseFloat(currentInput)).toString();
        updateDisplay(currentInput);
      }
      if (value === "+/-") {
        currentInput = (-parseFloat(currentInput)).toString();
        updateDisplay(currentInput);
      }
    });
  });

  function calculate(a, b, operator) {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return a % b;
      default:
        return 0;
    }
  }
});
