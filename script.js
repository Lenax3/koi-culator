///////////ADDITION///////////
function add(a, b) {
    return a + b;
}
///////////SUBTRACTION///////////
function subtract(a, b) {
    return a - b;
}
///////////MULTIPLICATION///////////
function multiply(a, b) {
    return a * b;
}
///////////DIVISION///////////
function divide(a, b) {
    if (b=== 0) {
        return "Didn't u pay attention in maths?";
    }
    return a / b;
}
///////////OPERATE///////////
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  let result;

  if (operator === "+") result =  add(a, b);
  if (operator === "-") result = subtract(a, b);
  if (operator === "*") result = multiply(a, b);
  if (operator === "/") result = divide(a, b);

  if (typeof result === "number") {
    return Math.round(result * 1000) / 1000;
  }

  return result;
}
///////////STATE (MIND)///////////
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

///////////DOM (DISPLAY)///////////
const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

///////////EVENTLISTENER NUMBERS///////////
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        //Result Reset Fix//
        if (shouldResetDisplay) {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display.textContent = "";
            shouldResetDisplay = false;
        }
        //Number Input Logic//
        if (operator === "") {
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        } else {
            secondNumber += button.textContent;
            display.textContent = secondNumber
        }
    });
});

///////////EVENTLISTENER OPERATORS///////////
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (firstNumber === "") {
            return;
        }

        if (firstNumber !== "" && secondNumber !== "") {
            firstNumber = operate(operator, firstNumber, secondNumber);
            display.textContent = firstNumber;
            secondNumber = "";
        }

        operator = button.textContent;
    });
});

///////////EVENTLISTENER EQUALS///////////
equalsButton.addEventListener("click", () => {

    if (firstNumber === "" || operator === "" || secondNumber === "") {
        return;
    }

    const result = operate(operator, firstNumber, secondNumber);

    display.textContent = result;

    firstNumber = result;
    operator = "";
    secondNumber = "";

    shouldResetDisplay = true;
});

///////////EVENTLISTENER CLEAR///////////
clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;
    display.textContent = "0";
});

///////////EVENTLISTENER DECIMAL///////////
decimalButton.addEventListener("click", () => {

    //clears display
    if (shouldResetDisplay) {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        display.textContent = "";
        shouldResetDisplay = false;
    }

    //prevents user from entering multiple "decimal dots" 
    if (operator === "") {
        if (firstNumber.includes (".")) return;
        if (firstNumber === "") firstNumber = "0";

        firstNumber += ".";
        display.textContent = firstNumber;
    } else {
        if (secondNumber.includes (".")) return;
        if (secondNumber === "") secondNumber = "0";

        secondNumber += ".";
        display.textContent = secondNumber;
    }
});

///////////EVENTLISTENER BACKSPACE///////////
backspaceButton.addEventListener("click", () =>{

    //reset after result
    if (shouldResetDisplay) {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        shouldResetDisplay = false;
        display.textContent = firstNumber || "0";
        return;
    }

    //first number
    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber || "0";
    }
    //second number
    else {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber || "0";
    }
});
