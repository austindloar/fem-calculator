let operands = [];
let operations = [];
let display = 0;
let userInput = false;

function pushDigit(initial, newDigit) {
  return initial * 10 + newDigit;
}

function popDigit(initial) {
  return Math.floor(initial / 10);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function solve() {
  let numOps = operations.length;
  for (let i = 0; i < numOps; i++) {
    let operation = operations.shift();

    if (operation === "÷") {
      operands.unshift(divide(operands.shift(), operands.shift()));
    } else if (operation === "×") {
      operands.unshift(multiply(operands.shift(), operands.shift()));
    } else if (operation === "-") {
      operands.unshift(subtract(operands.shift(), operands.shift()));
    } else if (operation === "+") {
      operands.unshift(add(operands.shift(), operands.shift()));
    }
  }
}

const digits = document.querySelectorAll(".digit");
const screen = document.querySelector(".screen");

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    userInput = true;
    display = pushDigit(display, parseInt(digit.textContent));
    screen.textContent = display;
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operations.length === operands.length && userInput) {
      operations.push(operator.textContent);
      operands.push(display);
      display = 0;
      screen.textContent = display;
      userInput = false;
    }
  });
});

const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  operands = [];
  operations = [];
  display = 0;
  screen.textContent = display;
});

const equals = document.querySelector(".equals");

equals.addEventListener("click", () => {
  operands.push(display);
  solve();
  display = operands[0];
  operands = [];
  screen.textContent = display;
});

const back = document.querySelector(".back");

back.addEventListener("click", () => {
  display = popDigit(display);
  screen.textContent = display;
});
