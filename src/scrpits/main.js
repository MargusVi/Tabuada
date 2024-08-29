const firstNumber = document.getElementsByClassName("first")[0];
const equationSignal = document.getElementsByClassName("equation")[0];
const secondNumber = document.getElementsByClassName("second")[0];
const resultInput = document.getElementById('result');
const row = document.getElementsByClassName("row")[0];
const signals = ["+", "-", "x", "/"];

document.addEventListener('DOMContentLoaded', function() {
    function keepFocus() {
        resultInput.focus();
    }

    resultInput.addEventListener('blur', keepFocus);

    keepFocus();

    document.body.addEventListener('click', keepFocus);

    resultInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            validate();
        }
    });
});

function generate() {
    let first, second;
    let signal = signals[Math.floor(Math.random() * 4)];

    if (signal === "/") {
        second = Math.floor(Math.random() * 9) + 1;
        first = second * Math.floor(Math.random() * 10);
    } else {
        first = Math.floor(Math.random() * 10);
        second = Math.floor(Math.random() * 10);
    }

    firstNumber.innerText = first;
    equationSignal.innerText = signal;
    secondNumber.innerText = second;
}

function getEquationResult(firstNumber, signal, secondNumber) {
    switch (signal) {
        case "+":
            return parseInt(firstNumber) + parseInt(secondNumber);
        case "-":
            return parseInt(firstNumber) - parseInt(secondNumber);
        case "x":
            return parseInt(firstNumber) * parseInt(secondNumber);
        case "/":
            return parseInt(firstNumber) / parseInt(secondNumber);
    }
}

function validate() {
    const userResult = parseInt(resultInput.value);
    const correctResult = getEquationResult(firstNumber.innerText, equationSignal.innerText, secondNumber.innerText);

    if (userResult === correctResult) {
        showFeedback("correct");
    } else {
        showFeedback("wrong");
    }

    row.classList.add('animate-equation');

    setTimeout(() => {
        row.classList.remove('animate-equation');
        generate();
        resultInput.value = "";
    }, 1000);
}

function showFeedback(status) {
    const color = status === "correct" ? "green" : "red";
    document.body.style.backgroundColor = color;

    setTimeout(function() {
        document.body.style.transition = "background-color 1s ease";
        document.body.style.backgroundColor = "white";
    }, 500);
}

generate();