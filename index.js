//math functions
function add(a=0, b=0) {
	return(a + b);
};

function subtract(a=0, b=0) {
	return(a - b);
};

function multiply(a, b=1) {
  if (a==0||b==0) return 0;
  return(a * b); 
};

function divide(a, b) {
    if(a==false||b==false) return 'error';
    return(a / b);
};

function power(a, b) {
	return(a ** b);
};

function operate(a, operator, b=0) {
    justOperated = true;
    a = (a[a.length-1] == '.') ? parseFloat(a += '0') : parseFloat(a);
    b = (b[b.length-1] == '.') ? parseFloat(b += '0') : parseFloat(b);
    if(b==='') b = a;
    if(isNaN(a)) return b;
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case 'exp':
            return power(a, b);
        default:
            return a;
    };
};

//calculator logic functions
function updateDisplay(str) {
    if (str.length > 18) str = str.slice(0, 18);
    display.textContent = str;
    if(str=='') display.textContent = '0';
}

//does an evaluation if memory and input have something stored
//otherwise stores and resets input
function storeInput() {
    if (input==='0') return;
    if (!justOperated && memory) equalsButton();
    if (!justOperated) memory = input;
    input = '0';
}

//resets justOperated, updates ghost text and stored operator
function update(op=false) {
    if (justOperated == true) justOperated = false;
    ghost.textContent = '';
    if (!op) return;
    operator = `${op}`;
    ghost.textContent += `${memory} ${op} `;
}

function reset() {
    input = '0';
    memory = '';
    operator = '';
    ghost.textContent = '';
    justOperated = false;
    result = 0;
}

function addHistory() {
    div = document.createElement('div');
    div.classList.add('history-div')

    ghostHistory = document.createElement('p');
    ghostHistory.classList.add('ghost');
    ghostHistory.textContent = ghost.textContent;
    if (ghostHistory.textContent.length > 14) ghostHistory.textContent =
    ghostHistory.textContent.slice(0, 14) + '...';

    result = document.createElement('p');
    result.classList.add('result');
    result.textContent = memory;
    if (result.textContent.length > 10) result.textContent =
    result.textContent.slice(0, 10) + '...';

    div.appendChild(ghostHistory);
    div.appendChild(result);

    if (historyCounter < 6) historyCounter++;
    else history.removeChild(history.lastElementChild);
    
    history.prepend(div);
}


//button functions

function equalsButton() {
    if (justOperated) update(operator);
    ghost.textContent += ` ${input} =`;
    memory = String(operate(memory, operator, input));
    updateDisplay(memory);
    if (memory=='error'||memory=='Infinity') reset();
    else addHistory();
}

function delButton() {
    if (justOperated) reset();
    if (input && !memory && input.length == 1) input='0';
    if (input.length >1) input = input.substring(0, input.length-1);
    updateDisplay(input);
}

function acButton() {
    reset();
    updateDisplay(input);
}

function opButton(op) {
    storeInput();
    update(op);
}

function decimalButton() {
    if (input.indexOf('.') != -1) return;
    if (justOperated) {
        reset();
    };
    input += '.';
    updateDisplay(input);
};

function negButton() {
    if(input==''||input=='0' && !memory) return;
    if(justOperated) {
        if (!memory) memory = input;
        ghost.textContent = `neg(${memory})`;
        memory = memory/(-1);
        updateDisplay(memory);
    } else if (input) {
        input = input/(-1);
        updateDisplay(input);
    };
};

function digitButton(dig) {
    if (input.length == 14) return;
    if (justOperated) reset();
    if (input=='0') input='';
    input += dig;
    updateDisplay(input);
};


let display = document.getElementById('display-text');
let ghost = document.getElementById('ghost-text')
let history = document.getElementById('history');

let equals = document.getElementById('equals');
equals.addEventListener('click', (e) => equalsButton());
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') equalsButton();
})

let del = document.getElementById('del');
del.addEventListener('click', (e) => delButton());
document.addEventListener('keydown', (e) => {
    if(e.key == 'Backspace') delButton();
});

let allClear = document.getElementById('ac');
allClear.addEventListener('click', (e) => acButton());
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') acButton();
});

let operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => opButton(button.textContent));
    document.addEventListener('keydown', (e) =>  {
        if (e.key == `${button.textContent}`) opButton(button.textContent);
        });
});

let decimal = document.getElementById('decimal');
decimal.addEventListener('click', (e) => decimalButton());
document.addEventListener('keydown', (e) => {
    if (e.key == '.') decimalButton();
});

let neg = document.getElementById('neg');
neg.addEventListener('click', (e) => negButton());
document.addEventListener('keydown', (e) => {
    if (e.key == 'Shift') negButton();
});

let digits = document.querySelectorAll('.digit');
digits.forEach((digit) => {
    digit.addEventListener('click', (e) => {
        digitButton(parseInt(digit.textContent));
}); 
    digit.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') e.preventDefault();
    });
    document.addEventListener('keydown', (e) => {
    if (e.key == `${digit.textContent}`) {
        digitButton(parseInt(digit.textContent));
    }});
});


//defaults
let operator = '';
let input = '0';
let memory = '';
let justOperated = false;
let historyCounter = 0;