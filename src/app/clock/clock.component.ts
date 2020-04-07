import { Component } from '@angular/core';

@Component({
    selector: 'clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css']
})
export class ClockComponent {
    title = 'London Clock';
    interval: any;

    hh: number;
    mm: number;
    ss: number;
    a: string;

    inputHH: string;
    inputMM: string;
    inputSS: string;
    inputA: string;

    isAM: boolean;
    showInputHH: boolean = false;
    showInputMM: boolean = false;
    showInputSS: boolean = false;
    showInputA: boolean = false;
    showRollButton: boolean = false;

    errorMessage: string;

    // testing data
    // haha: boolean = false;
    // testNumber: number = 5;
    // testString: string = "abc";
    // testString2: string;
    // end of testing data


    constructor() {
        this.hh = new Date().getHours();
        this.mm = new Date().getMinutes();
        this.ss = new Date().getSeconds();
        if (this.hh > 12) {
            this.hh = this.hh - 12;
            this.isAM = false;
        }
        else this.isAM = true;
    }
    ngOnInit() {
        this.startTicking();
    }

    startTicking = () => {
        this.interval = setInterval(() => {
            this.addOneSecond();
        }, 1000);
    }

    pauseTicking = () => {
        clearInterval(this.interval);
    }
    //----------
    addOneSecond = () => {
        if (this.ss < 59)
            this.ss++;
        else {
            this.ss = 0;
            this.addOneMinute();
        }
    }
    addOneMinute = () => {
        if (this.mm < 59)
            this.mm++;
        else {
            this.mm = 0;
            this.addOneHour();
        }
    }
    addOneHour = () => {
        if (this.hh < 12)
            this.hh++;
        else {
            this.hh = 1;
            this.toggleAMPM();
        }
    }

    toggleAMPM = () => {
        this.isAM = !this.isAM;
    }

    //-------------
    toggleShowInputHH = () => {
        this.showInputHH = !this.showInputHH;
    }
    toggleShowInputMM = () => {
        this.showInputMM = !this.showInputMM;
    }
    toggleShowInputSS = () => {
        this.showInputSS = !this.showInputSS;
    }
    toggleShowInputA = () => {
        this.showInputA = !this.showInputA;
    }
    toggleShoRollButton = () => {
        this.showRollButton = !this.showRollButton;
    }

    //-------------
    clickHH = () => {
        this.toggleShowInputHH();
        this.inputHH = this.hh.toString();
        this.showRollButton = true;
        this.pauseTicking();

    }
    clickMM = () => {
        this.toggleShowInputMM();
        this.inputMM = this.mm.toString();
        this.showRollButton = true;
        this.pauseTicking();
    }
    clickSS = () => {
        this.toggleShowInputSS();
        this.inputSS = this.ss.toString();
        this.showRollButton = true;
        this.pauseTicking();
    }
    clickA = () => {
        this.toggleShowInputA();
        this.showRollButton = true;
        this.pauseTicking();
    }
    clickRoll = () => {
        this.errorMessage = "";
        var hhError = "";
        var mmError = "";
        var ssError = "";
        var aError = "";
        var invalidInput = false;
        // this.copyTimeToInput();

        if (this.inputHH) {
            if (this.hasNonDigit(this.inputHH)) {
                hhError = "Hour should be an integer between 1 to 12. ";
                invalidInput = true;
            }
            else if (parseInt(this.inputHH) < 1 || parseInt(this.inputHH) > 12) {
                hhError = "Hour should be an integer between 1 to 12. ";
                invalidInput = true;
            }
        } else {
            this.inputHH = this.hh.toString();
        }
        console.log(this.inputHH, "inputHH")

        if (this.inputMM) {
            if (this.hasNonDigit(this.inputMM)) {
                mmError = "Minute should be an integer between 0 to 59. ";
                invalidInput = true;
            }
            else if (parseInt(this.inputMM) < 0 || parseInt(this.inputMM) > 59) {
                mmError = "Minute should be an integer between 0 to 59. ";
                invalidInput = true;
            }
        } else {
            this.inputMM = this.mm.toString();
        }

        console.log(this.inputMM, "inputMM")
        if (this.inputSS) {
            if (this.hasNonDigit(this.inputSS)) {
                ssError = "Second should be an integer between 0 to 59. ";
                invalidInput = true;
            }
            else if (parseInt(this.inputSS) < 0 || parseInt(this.inputSS) > 59) {
                ssError = "Second should be an integer between 0 to 59. ";
                invalidInput = true;
            }
        } else {
            this.inputSS = this.ss.toString();
        }
        console.log(this.inputSS, "inputSS");

        if (this.inputA) {
            if (this.inputA !== "AM" && this.inputA !== "PM") {
                console.log(this.inputA,"input A    !==AM !==PM")
                aError = "Meridiem should be AM or PM ";
                invalidInput = true;
            }
        } else {
            if (this.isAM)
                this.inputA = "AM";
            else 
                this.inputA = "PM";
        }


        if (invalidInput)
            this.errorMessage = hhError + mmError + ssError + aError;
        else {
            this.hh = parseInt(this.inputHH);
            this.ss = parseInt(this.inputSS)
            this.mm = parseInt(this.inputMM)
            if(this.inputA ==="AM")
                this.isAM = true;
            else this.isAM = false;
            this.hideInputs();
            this.startTicking();
        }
        console.log(this.errorMessage, "errormessage");

    }


    hideInputs = () => {
        this.showInputHH = false;
        this.showInputMM = false;
        this.showInputSS = false;
        this.showInputA = false;
        this.showRollButton = false;
    }

    copyTimeToInput = () => {
        this.inputHH = this.hh.toString();
        this.inputMM = this.mm.toString();
        this.inputSS = this.ss.toString();

    }


    // testClick = () => {
        // console.log(tt,tt2)
        // console.log(typeof(this.testString)
        // console.log(this.testString2)

        // console.log(parseInt(this.inputHH)) // 1234
        // console.log(this.String.search("\\D"), "abc");
        // console.log(this.hasNonDigit(this.testString), "HasNonDigit")
    // }

    hasNonDigit = (str: string) => {
        return str.search("\\D") != -1
    }
}