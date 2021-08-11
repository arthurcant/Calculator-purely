class CalcController {

    constructor() {        
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
    
    initButtonsEvents() {        
        let buttons = document.querySelectorAll("#buttons div");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e =>{

                console.log(btn.className);

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






