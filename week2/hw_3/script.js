function calculator(operation) {
    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);
    let result;

    if (operation === "sum") {
        result = num1 + num2;
    } else if (operation === "subtract") {
        result = num1 - num2;
    } else {
        result = num1 * num2;
    }

    document.getElementById("result").textContent = result;
}