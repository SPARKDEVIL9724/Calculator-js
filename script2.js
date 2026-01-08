function initializeCalculator(){
    const containerDiv = document.querySelector('.container');
    const buttonDiv = document.querySelector('.buttons');
    const calculatorInput = document.querySelector('.calculator-input');
    // const form = document.querySelector('.calculator-display');
    let result = 0;
    let cNumber = 0;
    let operator = '';
    let number = '';

    //null checks
    if(!containerDiv || !buttonDiv || !calculatorInput){
        console.error("DOM elements not found!!!");
        return;
    }

    // operation handling
    function operation(operator, number, cNumber){
        switch(operator){
            case '+':
                result = cNumber + number;
                break;
            case '-':
                result = cNumber - number;
                break;
            case '*':
                result = cNumber * number;
                break;
            case '/':
                if(number === 0){
                    return NaN;
                }
                else{
                    result = cNumber / number;
                }
                break;
            default:
        }
        return result;
    }

    // input handling
    function handleInput(value){
        if(value === 'empty') return;

        if (number === '' && operator && value !== '=') return;

        if (/[0-9]/.test(value)){
            number += value;
            calculatorInput.value = number;
            return;
        }

        if(value === '.'){
            if(!number.includes('.')){
                if(number === '') number += '0';
                number += value;
                calculatorInput.value = number;
            }
            return;
        }

        if(['+', '-', '*', '/'].includes(value)){
            if(number === '' && operator === '') return;
            if(operator && number !== ''){
                result = operation(operator, Number(number), cNumber);
                if (Number.isNaN(result)) {
                    calculatorInput.value = 'Cannot divide by 0';
                    number = '';
                    operator = '';
                    cNumber = 0;
                    return;
                }
                calculatorInput.value = result;
                cNumber =  result;
            }
            else{
                cNumber = Number(number);
            }
            operator = value;
            number = '';
            return;
        }

        if(value === 'Clear'){
            number = '';
            result = 0;
            cNumber = 0;
            operator = '';
            calculatorInput.value = number;
            return;
        }

        if(value === 'BackSpace'){
            if(number === '') return;
            number = number.slice(0, -1);
            calculatorInput.value = number;
            return;
        }

        if(value === '='){
            if(!operator || number === '') return;
            result = operation(operator, Number(number), cNumber);
            if (Number.isNaN(result)) {
                calculatorInput.value = 'Cannot divide by 0';
                number = '';
                operator = '';
                cNumber = 0;
                return;
            }
            calculatorInput.value = result;
            number = '';
            cNumber = result;
            operator = '';
            return;
        }
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
    const buttons = document.querySelectorAll('button');

    //button input events
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => handleInput(button.innerText));
    });

    //keyboard input events
    calculatorInput.addEventListener('keydown', (e) => {
        let key = e.key;
        if(key === 'Enter') key = '=';
        else if(key === 'Backspace') key = 'BackSpace';
        if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)){}
        else{
            e.preventDefault();
            handleInput(key);
        }
    });

}

//initializing the calculator
initializeCalculator();