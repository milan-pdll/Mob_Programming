function calculateMarks() {
    const inputs = document.querySelectorAll("#marks input");
    let total = 0;

    for (const input of inputs) {
        const mark = Number(input.value);

        if (mark < 1 || mark > 100 || input.value === "") {
            const status = document.getElementById("status");
            input.value = "";
            input.focus();
            status.textContent = "Enter marks between 1 and 100.";
            status.style.color = "red";
            return;
        }

        total += mark;
    }

    const totalMark = document.getElementById("total_mark");
    const status = document.getElementById("status");

    let grade;

    if (total > 600) {
        grade = "Distinction";
    } else if (total >= 500) {
        grade = "First Division";
    } else if (total >= 400) {
        grade = "Second Division";
    } else if (total >= 20) {
        grade = "Pass";
    } else {
        grade = "Fail";
    }

    totalMark.textContent = "You got " + grade + " with " + total + " marks";

    if (total >= 20) {
        status.textContent = "You are Pass";
        status.style.color = "green";
    } else {
        status.textContent = "You are Fail";
        status.style.color = "red";
    }
}

