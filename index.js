function add(a=0, b=0) {
	return(a + b);
};

function subtract(a=0, b=0) {
	return a - b;
};

function multiply(a, b=1) {
  if (a==0||b==0) return 0;
  return a*b; 
};

function divide(a, b) {
    if(a==0||b==0) return 'nice try';
    return a/b;
}

function power(a, b) {
	return a**b;
};

function operate(a, operator, b=0) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '^':
            return power(a, b);
    }
}


function updateDisplay(str) {
    display.textContent = str;
}

function storeInput() {
    if (!memory) memory = input;
    input = '0';
}

function update(op) {
    if (operated == true) operated = false;
    ghost.textContent = '';
    operator = `${op}`;
    ghost.textContent += `${memory} ${op} `;
}

function reset() {
    input = '0';
    memory = '';
    ghost.textContent = '';
    operated = false;
    result = 0;
}

let display = document.getElementById('display-text');
let ghost = document.getElementById('ghost-text')


let equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', (e) => {
    if (operated) ghost.textContent = '';
    operated = true;
    result = operate(parseFloat(memory), operator, parseFloat(input));
    ghost.textContent += `${input} =`;
    storeInput();
    memory = result;
    updateDisplay(result);
    if (result=='nice try') reset();
    ans = result;
});




let delButton = document.getElementById('del');
delButton.addEventListener('click', (e) => {
    if (input.length <= 1) input = '0';
    if (input.length >1) input = input.substring(0, input.length-1);
    updateDisplay(input);
});

let acButton = document.getElementById('ac');
acButton.addEventListener('click', (e) => {
    reset();
    updateDisplay(input);
})

let addButton = document.getElementById('add');
addButton.addEventListener('click', (e) => {
    storeInput();
    update('+');
});

let substractButton = document.getElementById('substract');
substractButton.addEventListener('click', (e) => {
    storeInput();
    update('-');
});

let multiplyButton = document.getElementById('multiply');
multiplyButton.addEventListener('click', (e) => {
    storeInput();
    update('*');
});

let divideButton = document.getElementById('divide');
divideButton.addEventListener('click', (e) => {
    storeInput();
    update('/');
});


let digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', (e) => {
    if (operated) reset();
    if (input=='0') input='';
    input += digit.textContent;
    updateDisplay(input)
}))

let decimal = document.getElementById('decimal');
decimal.addEventListener('click', (e) => {
    if(decimal) {}
})


let operator = '';
let input = '';
let memory = '';
let ans = '';
let operated = false;
