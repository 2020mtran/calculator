let first = 0;
let operator = ""
let second = 0;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(first, operator, second) {
    if (operator == "+") {
        return add(first, second);
    } else if (operator == "-") {
        return subtract(first, second);
    } else if (operator == "*") {
        return multiply(first, second);
    } else if (operator == "/") {
        if (second != 0) {
            return divide(first, second);
        } else {
            return "Error: Division by zero is not allowed";
        }
    }
}

const page = document.querySelector(".page");

page.style.display = "flex";
page.style.flexDirection = "column";
page.style.justifyContent = "center";
page.style.alignItems = "center";

const calculator = document.querySelector(".calculator");

calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.alignItems = "center";
calculator.style.height = "400px";
calculator.style.backgroundColor = "#232324";

const numpad = document.createElement("div");

numpad.style.display = "flex";
numpad.style.flexDirection = "row";
numpad.style.justifyContent = "center";
numpad.style.alignItems = "center";
numpad.style.flexWrap = "wrap";
numpad.style.width = "440px";
numpad.style.height = "180px";
numpad.style.gap = "10px";

const display = document.createElement("div");

display.style.display = "flex";
display.style.justifyContent = "center";
display.style.alignItems = "center";
display.style.width = "420px";
display.style.height = "50px";
display.style.color = "white";
display.style.border = "2px solid grey";
display.style.borderRadius = "10px";
display.style.margin = "10px 0px 20px 0px";

calculator.append(display);

const buttonOrder = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "AC"]

let displayNumbers = "";

for (let i = 0; i < buttonOrder.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = buttonOrder[i];
    btn.style.color = "white";
    btn.style.backgroundColor = "grey";
    btn.style.width = "100px";
    btn.style.height = "50px";
    btn.style.borderRadius = "10px";
    btn.addEventListener("click", () => {
        if (buttonOrder[i] === "AC") {
            display.textContent = "";
            displayNumbers = "";
        } else if (buttonOrder[i] === "+" || buttonOrder[i] === "-"
                || buttonOrder[i] === "*" || buttonOrder[i] === "/") {
            operator = buttonOrder[i];
            display.textContent += buttonOrder[i];
            displayNumbers += buttonOrder[i];
        } else if (buttonOrder[i] === "=") {
            preoperate(displayNumbers);
            let result = operate(first, operator, second);
            display.textContent = parseFloat(result.toFixed(5)); 
            // ^ parseFloat removes trailing 0s, tofixed puts max 5 decimal
            displayNumbers = result.toString();
            console.log("Display numbers: " + displayNumbers);
        } else {
            display.textContent += buttonOrder[i];
            displayNumbers += buttonOrder[i];
        }
    })
    numpad.append(btn);
}

function preoperate(string) {
    let differentiatedString = string.split(/[+\-*/]+/);
    if (!/[+\-*/]/.test(string)) {
        first = first
        second = second // basically, do nothing
    } else {
        first = differentiatedString[0];
        second = differentiatedString[1];
    }
}

calculator.append(numpad);
page.append(calculator);