/* Selectors */
const display = document.querySelector(".screen");
const numberBtns = document.querySelectorAll(".btn--number");
const backspaceBtn = document.querySelector(".btn--backspace");
const clearBtn = document.querySelector(".btn--clear");
const equalsBtn = document.querySelector(".btn--equals");

/* Variables */
let displayValue = "0";
let storedValue = "";
let currentOperator = null;

/* Event Listeners */
window.addEventListener("keydown", setInput);
clearBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", deleteNumber);
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn--number")) appendNumber(e.target.innerText);
  if (e.target.classList.contains("btn--point")) appendPoint();
  if (e.target.classList.contains("btn--operator")) setOperation(e.target.innerText);
  if (e.target.classList.contains("btn--equals")) evaluate();
});

/* Functions */

function appendNumber(number) {
  if (displayValue === "0") displayValue = "";
  displayValue += number;
  display.textContent = displayValue;
}

function appendPoint() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    display.textContent = displayValue;
  }
}

function setOperation(operator) {
  if (storedValue !== "") {
    displayValue = operate(storedValue, displayValue, currentOperator);
    display.textContent = displayValue;
    storedValue = displayValue;
  } else {
    currentOperator = operator;
    storedValue = displayValue;
  }
  displayValue = "";
}

function setInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key); //*
  if (e.key === ".") appendPoint(); //*
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber(); //*
  if (e.key === "Escape") clear(); //*
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(e.key);
}

function clear() {
  displayValue = "0";
  display.textContent = displayValue;
  storedValue = "";
  currentOperator = null;
}
function deleteNumber() {
  if (displayValue === "0" || displayValue.length === 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  display.textContent = displayValue;
}

function evaluate() {
  if (displayValue === "" || storedValue === "") {
    return null;
  } else {
    displayValue = roundResult(operate(storedValue, displayValue, currentOperator)).toString();
    display.textContent = displayValue;
    storedValue = "";
  }
}

function roundResult(number) {
  return Math.floor(number * 1000) / 1000;
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, currentOperator) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (currentOperator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return substract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      if (num1 === 0 || num2 === 0) {
        return "Seriously?";
      } else {
        return divide(num1, num2);
      }
      break;
  }
}
