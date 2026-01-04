const containerDiv = document.querySelector('.container');
const buttonDiv = document.querySelector('.buttons');
const calculatorInput = document.querySelector('.calculator-input');
const form = document.querySelector('.calculator-display');
let result = 0;
let operator = '';
let number = 0;
let i = 0;

// operation
function operation(opp, numb, res){
    switch(opp){
        case '+':
            res += numb;
            break;
        case '-':
            res -= numb;
            break;
        case '*':
            res *= numb;
            break;
        case '/':
            res /= numb;
            break;
        default:
    }
    localStorage.setItem('result', res);
    return res;
}

//create button function
function createButton(i){
    const button = document.createElement('button');
    button.textContent = i;
    buttonDiv.appendChild(button);
}

// app-heading
const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'Calculator';
header.appendChild(h1);
containerDiv.insertAdjacentElement('afterbegin', header);

// creating buttons
[1,2,3,'Clear',4,5,6,'BackSpace',7,8,9,'=','+',0,'.','empty','-','*','/'].forEach(i => createButton(i));

// events
const num = ['1','2','3','4','5','6','7','8','9','0'];
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    if(num.includes(button.innerText)){
        button.addEventListener('click', (e) => {
            if(typeof(number) === 'string' && number.includes('.')){
                number += e.target.innerText;
            }
            else{
                number = Number(number);
                number = number*10 + Number(e.target.innerText);
            }
            if(operator === ''){
                result = number;
            }
            calculatorInput.value = number;
        });
    }
    else if(['+', '-', '*', '/'].includes(button.innerText)){
        button.addEventListener('click', (e) => {
            if(operator !== ''){
                number = Number(number);
                result = Number(result);
                result = operation(operator, number, result);
                calculatorInput.value = result;
                operator = '';
            }
            operator = e.target.innerText;
            number = 0;
        });
    }
    else if(button.innerText === 'Clear'){
        button.addEventListener('click', (e) => {
            result = 0;
            number = 0;
            calculatorInput.value = result;
        });
    }
    else if(button.innerText === 'BackSpace'){
        button.addEventListener('click', (e) => {
            if(typeof(number) === 'string' && number.includes('.')){
                number = number.slice(0, number.length-1);
            }
            else{
                number = Number(number);
                number = Math.floor(number/10);
            }
            calculatorInput.value = number;
        });
    }
    else if(button.innerText === '.'){
        button.addEventListener('click', (e) => {
            number = number.toString();
            if (number.includes('.')){
            }
            else{number += '.';}
            calculatorInput.value = number ;
            i=0;
        });
    }
    else if(button.innerText === '='){
        button.addEventListener('click', () => {
            result = operation(operator, number, result);
            calculatorInput.value = result;
        });
    }
});
calculatorInput.addEventListener('keydown', (e) => {
    e.preventDefault();
    buttons.forEach((button) => {
        if(e.key === button.innerText){
            button.click();
        }
        else if(button.innerText === '=' && e.key === 'Enter'){
            button.click();
        }
        else if(button.innerText === 'BackSpace' && e.keyCode === 8){
            button.click();
        }
    });
});