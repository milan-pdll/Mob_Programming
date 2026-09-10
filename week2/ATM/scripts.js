let has_login=false
let amount=10000

function login(email,password){

    if (email === "milandada" && password === "milandada") {
        console.log("login")
        has_login=true
        document.getElementById('status').innerHTML="You are loggin"
    }
    else {
        console.log("bad auth")
        document.getElementById('status').innerHTML="Authentication error"
    }
}


function checkBalance() {
    if (has_login){
        document.getElementById('get_balance').textContent = "Your balance is " + amount
    }
    else {
        document.getElementById('get_balance').textContent = "Please login first"
    }
}

function getTransactionAmount() {
    const transactionAmount = Number(document.getElementById('transaction-amount').value)

    if (transactionAmount <= 0) {
        document.getElementById('get_balance').textContent = "Enter a valid amount"
        return null
    }

    if (transactionAmount %100 !== 0) {
        document.getElementById('get_balance').textContent = "Enter an amount in multiples of 100"
        return null
    }

    return transactionAmount
}

function deposit() {
    if (!has_login) {
        document.getElementById('get_balance').textContent = "Please login first"
        return
    }

    const transactionAmount = getTransactionAmount()
    if (transactionAmount === null) {
        return
    }

    amount += transactionAmount
    document.getElementById('get_balance').textContent = "Deposited " + transactionAmount + ". Your balance is " + amount
}

function withdraw() {
    if (!has_login) {
        document.getElementById('get_balance').textContent = "Please login first"
        return
    }

    const transactionAmount = getTransactionAmount()
    if (transactionAmount === null) {
        return
    }

    if (transactionAmount > amount) {
        document.getElementById('get_balance').textContent = "Insufficient balance"
        return
    }

    amount -= transactionAmount
    document.getElementById('get_balance').textContent = "Withdrew " + transactionAmount + ". Your balance is " + amount
}