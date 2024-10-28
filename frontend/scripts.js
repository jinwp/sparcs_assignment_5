// JavaScript for Bank Page

function signIn() {
    const name = document.getElementById('signin-name').value;
    fetch('/bank/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('signin-result').textContent = 
            `가입을 환영합니다, ${data.name}. ID: ${data.user_id}. 가입날짜: ${data.date_joined}.`;
    })
    .catch(error => {
        document.getElementById('signin-result').textContent = 'Error: ' + error.message;
    });
}

function getBalance() {
    const user_id = document.getElementById('balance-user-id').value;
    const name = document.getElementById('balance-name').value;
    fetch('/bank/balance', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, name })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('balance-result').textContent = 
            `현재 ${name} 고객님의 잔액은 $${data.balance} 입니다.`;
    })
    .catch(error => {
        document.getElementById('balance-result').textContent = 'Error: ' + error.message;
    });
}

function addMoney() {
    const user_id = document.getElementById('add-money-user-id').value;
    const name = document.getElementById('add-money-name').value;
    const amount = parseFloat(document.getElementById('add-amount').value);
    fetch('/bank/deposit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, name, amount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('add-money-result').textContent = 
            `충전이 완료되었습니다!`;
    })
    .catch(error => {
        document.getElementById('add-money-result').textContent = 'Error: ' + error.message;
    });
}

function withdrawMoney() {
    const user_id = document.getElementById('withdraw-user-id').value;
    const name = document.getElementById('withdraw-name').value;
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    fetch('/bank/withdraw', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, name, amount })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('withdraw-result').textContent = `Error: ${data.error}`;
        } else {
            document.getElementById('withdraw-result').textContent = 
                `인출이 완료되었습니다.`;
        }
    })
    .catch(error => {
        document.getElementById('withdraw-result').textContent = 'Error: ' + error.message;
    });
}



/////////////////////


function performAddition() {
    const number1 = parseFloat(document.getElementById('add-number1').value);
    const number2 = parseFloat(document.getElementById('add-number2').value);
    performOperation(number1, number2, 'add', 'add-result');
}

function performSubtraction() {
    const number1 = parseFloat(document.getElementById('sub-number1').value);
    const number2 = parseFloat(document.getElementById('sub-number2').value);
    performOperation(number1, number2, 'sub', 'sub-result');
}

function performMultiplication() {
    const number1 = parseFloat(document.getElementById('mul-number1').value);
    const number2 = parseFloat(document.getElementById('mul-number2').value);
    performOperation(number1, number2, 'mul', 'mul-result');
}

function performDivision() {
    const number1 = parseFloat(document.getElementById('div-number1').value);
    const number2 = parseFloat(document.getElementById('div-number2').value);
    performOperation(number1, number2, 'div', 'div-result');
}

function performOperation(number1, number2, operation, resultElementId) {
    // Check if either number is negative
    if (number1 < 0 || number2 < 0) {
        alert("Invalid Input!");
        return;
    }

    // Send the request to the server
    fetch(`/arithmetic/${operation}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number1, number2 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById(resultElementId).textContent = `Result: ${data.result}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while performing the operation.');
    });
}

