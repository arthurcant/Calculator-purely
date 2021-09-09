class CalcController {

    constructor() {    

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];    
        this._displayCalcEl = document.querySelector("#display_calc");
        this._hoursEl = document.querySelector("#hours")
        this._dateEl = document.querySelector("#date")
        
        this._locale = 'pt-BR';
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();


    }

    copyToClipboard(){
        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.writeText(input);
        
        input.remove()

    }

    pasteFromClipboard(){

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

            this.pushOperation(parseFloat(text))

        });

    }

    initKeyboard(){
        
        document.addEventListener('keyup', e =>{

            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                break;

                case 'Backspace': 
                    this.clearEntry();
                break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                break;

                case 'Enter':
                case '=':
                    this.calc();
                break;

                case '.':
                case ',':
                    this.addDot();
                break;

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                break;

            }

        });

    }    

    addEventListenerAll(element, events, fn){ // Função criada para adicionar em todos os elementos um addEventListener

        events.split(' ').forEach(event => { // Uma string vai ser passada pela variável events e esse variável vai ser dividida pela função split
                                             // fn = function.
            element.addEventListener(event, fn, false);

        });

    }
    
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();

        this.setLastNumberToDisplay();
    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){
        
        this._operation.push(value);

        if(this._operation.length > 3) {
        
            this.calc();
        
        }
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    calc(){
        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];        
        }

        if(this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }else if (this._operation.length === 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if(last === '%') {
            result /= 100;
            this._operation = [result]; 

        } else {
            this._operation = [result];

            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {
        let lastItem;
        
        for(let i = this._operation.length - 1; i >= 0; i--) {

            if(this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem){ // if lastItem is empty the if accept it;
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        
        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
        
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);
 
            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            if(this.isOperator(value)){
                
                this.pushOperation(value);
            
            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            
            }

        }

    }

    addDot() {
        let lastOperation = this.getLastItem();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');          
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    setError() {

        this.displayCalc = "Error";
    }


    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'plus':
                this.addOperation('+');
                break;
            case 'subtract':
                this.addOperation('-');
                break;
            case 'division':
                this.addOperation('/');
                break;
            case 'multiplication':
                this.addOperation('*');
                break;
            case 'percent':
                this.addOperation('%');
                break;
            case 'equal':
                this.calc();
                break;
            case 'dot':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseFloat(value));
                break;
            default:
                this.setError();
            
        }

    }

    initButtonsEvents() {        
        let buttons = document.querySelectorAll("#buttons div");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e =>{

                let textBtn = btn.className.replace("btn-","");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mousedown mouseup', e => {

                btn.style.cursor = 'pointer';
                // cursor: pointer

            });
            
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day:"2-digit",
            month:"long",
            year:"numeric"
        });

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){ // display funciona como propriedades no js; 
        return this._hoursEl.innerHTML;
    }

    set displayTime(value) {
        this._hoursEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}






