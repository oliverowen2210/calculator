//math functions
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
    if(a==false||b==false) return 'error';
    return a/b;
};

function power(a, b) {
	return a**b;
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
    }
}

//calculator logic functions
function updateDisplay(str) {
    if (str.length > 18) str = str.slice(0, 18);
    display.textContent = str;
    if(str=='') display.textContent = '0';
}

function storeInput() {
    if (input==='0') return;
    if (!justOperated && memory) equals()
    if (!justOperated) memory = input;
    input = '0';
}

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

function equals() {
    if (justOperated) update(operator);
    ghost.textContent += ` ${input} =`;
    memory = String(operate(memory, operator, input));
    updateDisplay(memory);
    if (memory=='error'||memory=='Infinity') reset();
    else addHistory();
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

//HTML elements and event listeners
let display = document.getElementById('display-text');
let ghost = document.getElementById('ghost-text')
let history = document.getElementById('history');

let equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', (e) => equals());

let delButton = document.getElementById('del');
delButton.addEventListener('click', (e) => {
    if (justOperated) reset();
    if (input.length >1) input = input.substring(0, input.length-1);
    updateDisplay(input);
});

let acButton = document.getElementById('ac');
acButton.addEventListener('click', (e) => {
    reset();
    updateDisplay(input);
})

let operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => button.addEventListener('click', (e) => {
    storeInput();
    update(`${button.textContent}`);
}))

let decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', (e) => {
    if (input.indexOf('.') != -1) return;
    if (justOperated) {
        reset();
    }
    input += '.';
    updateDisplay(input);
})

let negButton = document.getElementById('neg');
negButton.addEventListener('click', (e) => {
    if(input==''||input=='0' && !memory) return;
    if(justOperated) {
        if (!memory) memory = input;
        ghost.textContent = `neg(${memory})`;
        memory = memory/(-1);
        updateDisplay(memory);
    } else if (input) {
        input = input/(-1);
        updateDisplay(input);
    } 
});

let digits = document.querySelectorAll('.digit');
digits.forEach((digit) => digit.addEventListener('click', (e) => {
    if (input.length == 14) return
    if (justOperated) reset();
    if (input=='0') input='';
    input += digit.textContent;
    updateDisplay(input)
}))


//defaults
let operator = '';
let input = '0';
let memory = '';
let justOperated = false;
let historyCounter = 0;