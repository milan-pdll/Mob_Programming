function add() {
    let number1 = Number(document.getElementById("num1").value);
    let number2 = Number(document.getElementById("num2").value);
    sum= number1 + number2;
    document.getElementById("result").innerHTML = "The sum is: " + sum;
    document.getElementById("result").style.color="blue";
}

function subtract() {
    let number1 = Number(document.getElementById("num1").value);
    let number2 = Number(document.getElementById("num2").value);
    difference= number1 - number2;
    document.getElementById("result").innerHTML = "The difference is: " + difference;
    document.getElementById("result").style.color="red";
}

function multiply() {
    let number1 = Number(document.getElementById("num1").value);
    let number2 = Number(document.getElementById("num2").value);
    product= number1 * number2;
    document.getElementById("result").innerHTML = "The product is: " + product;
    document.getElementById("result").style.color="green";
}