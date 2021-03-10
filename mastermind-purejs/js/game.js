class GameViewModel {
    constructor() {
        //region fields
        this.tries = 0;
        this.gameLevel = 3;
        this.secret = this.createSecret();
        this.moves = [];
        //endregion

        //region bindings
        this.createSecret = this.createSecret.bind(this);
        this.createRandomDigit = this.createRandomDigit.bind(this);
        //endregion
    }


    createSecret() {
        let digits = []; // [5, 4, 9] -> 549
        digits.push(this.createRandomDigit(1,9));
        while (digits.length<this.gameLevel){
            let digit = this.createRandomDigit(0,9);
            if (!digits.includes(digit))
                digits.push(digit);
        }
        /*
        let number = 0;
        for (let digit of digits){
            number = 10 * number + digit ;
        }
        return number;
        */
        return digits.reduce((number,digit)=>10*number+digit, 0);
    }

    createRandomDigit(min, max) {
        return Math.floor(Math.random()*(max-min+1))+min;
    }
}