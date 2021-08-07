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

    initButtonsEvents() {        
        let buttons = document.querySelectorAll("#fist div, #aside > div, #others_buttons > div");

        buttons.forEach((btn, index) => {
            
            btn.addEventListener('click', e => {
                console.log(btn);
            });
            
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day:"2-digit",
            month:"long",
            year:"numeric"
        });
        
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
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






