class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

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
        this.play = this.play.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.createMessageFromMatches = this.createMessageFromMatches.bind(this);
        this.init = this.init.bind(this);
        //endregion
    }

    play(guess = 123) {
        guess = Number(guess); // 549
        this.tries++;
        if (guess === this.secret) {
            this.gameLevel++;
            if (this.gameLevel > 10) {
                this.gameLevel = 3;
                this.init();
                this.moves.push(new Move("Game is over!","You win!"));
            } else {
                this.init();
            }
        } else {
            if (this.tries > 16){
                let temp = this.secret;
                this.init();
                this.moves.push(new Move(temp,"You lose!"));
                return;
            }
            let message = this.createMessage(this.secret, guess);
            this.moves.push(new Move(guess, message));
        }
    }

    createSecret() {
        let digits = []; // [5, 4, 9] -> 549
        digits.push(this.createRandomDigit(1, 9));
        while (digits.length < this.gameLevel) {
            let digit = this.createRandomDigit(0, 9);
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
        return digits.reduce((number, digit) => 10 * number + digit, 0);
    }

    createRandomDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    init() {
        this.moves = [];
        this.secret = this.createSecret();
        this.tries = 0;
    }

    createMessage(secret, guess) {
        let stringSecret = secret.toString();
        let stringGuess = guess.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i = 0; i < stringSecret.length; ++i) {
            let s = stringSecret.charAt(i);
            for (let j = 0; j < stringGuess.length; ++j) {
                let g = stringGuess.charAt(j);
                if (s === g) {
                    if (i === j) {
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        return this.createMessageFromMatches(perfectMatch, partialMatch);
    }

    createMessageFromMatches(perfectMatch, partialMatch) {
        if (perfectMatch === 0 && partialMatch === 0) return "No match";
        let message = ""; // empty string
        if (partialMatch > 0)
            message = `-${partialMatch}`;
        if (perfectMatch > 0)
            message = message + `+${perfectMatch}`;
        return message;
    }
}