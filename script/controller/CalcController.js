class CalcController {

    constructor() {    
        this._operation = [];    
        this._displayCalcEl = document.querySelector("#display_calc");
        this._hoursEl = document.querySelector("#hours")
        this._dateEl = document.querySelector("#date")
        
        this._locale = 'pt-BR';
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);
    }

    addEventListenerAll(element, events, fn){ // Função criada para adicionar em todos os elementos um addEventListener

        events.split(' ').forEach(event => { // Uma string vai ser passada pela variável events e esse variável vai ser dividida pela função split
                                             // fn = function.
            element.addEventListener(event, fn, false);

        });

    }
    

    clearAll() {

        this._operation = [];

    }

    clearEntry() {

        this._operation.pop();

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

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            } else if(isNaN(value)) {

                //Outra coisa
                console.log('value');

            } else {

                this._operation.push(value);

            }

        } else {

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }

        console.log(this._operation);

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

            break;
            case 'ponto':
                this.addOperation('.');
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
                this.addOperation(parseInt(value));
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
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._hoursEl.innerHTML = value;
    }

    get displayDate() {
        return this._hoursEl.innerHTML;
    }

    set displayDate(value) {
        this._hoursEl.innerHTML = value;
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






