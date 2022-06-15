const display = document.querySelector('.calc-display');
const clear = document.querySelector('#clear');
const buttons = document.querySelector('.calc-btns-container');
const result = document.querySelector('#result');
const displayState = [];
const toEvaluate = [];
const digit = /[0-9]/;
//creates num to be calculated
buttons.addEventListener('click', (e) => {
    const classes = e.target.classList;
    const value = e.target.innerText;
    if (classes.contains('calc-btn') && digit.test(value)) {
        display.innerText = value;
        displayState.push(value)
        display.innerText = displayState.join('');
    };
})
// handles DEL button 
const deleteLastNumber = document.querySelector('#del');
deleteLastNumber.addEventListener('click', () => {
    if (displayState.length) {
        displayState.pop();
        display.innerText = displayState.join('');
        if (displayState.length < 1)
            display.innerText = '0';
    };
})
// restarts the calculator
const clearFunc = () => {
    displayState.splice(0, displayState.length);
    toEvaluate.splice(0, toEvaluate.length);
}
clear.addEventListener('click', () => {
    clearFunc()
    display.innerText = '0';
})
// if a math operator is clicked it is handled here 
buttons.addEventListener('click', (e) => {
    const classes = e.target.classList;
    const value = e.target.innerText;
    const operator = e.target.value;
    if (classes.contains('calc-btn')) {
        if (value === `+` || value === `-` || value === `/` || value === `x`) {
            if (displayState.length) {
                toEvaluate.push(displayState.join(''))
                toEvaluate.push(operator)
                displayState.splice(0, displayState.length);
                display.innerText = '0'
            } else if (toEvaluate.length && !digit.test(`${toEvaluate[toEvaluate.length - 1]}`)) {
                toEvaluate.pop();
                toEvaluate.push(operator);
            }
        }
    };
})
// handles user clicking equal button
result.addEventListener('click', () => {
    if (toEvaluate.length && !digit.test(`${toEvaluate[toEvaluate.length - 1]}`)) {
        toEvaluate.push(displayState[0]);
        let sum = eval(toEvaluate.join(''))
        display.innerText = sum;
        clearFunc();
        displayState.push(display.innerText);
        console.log(displayState)
    }
})