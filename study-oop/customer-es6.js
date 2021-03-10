class Customer {
    constructor(identity, fullname, email) { // constructor
        this.identity = identity;
        this.fullname = fullname;
        this.email = email;
        this.sayHello = this.sayHello.bind(this);
    }
    sayHello(){
        console.log(`Hello, ${this.fullname} !`);
    }
    lambdaSayHello = () => { // automatically binds to "this"
        console.log(`Hello, ${this.fullname} !!!`);
    }
}

jack = new Customer("11111111110", "jack bauer", "jack.bauer@example.com");
console.table(jack)
// jack.sayHello(); // sayHello, jack -> this
//window.fullname = "kate austen";
window.setInterval(jack.sayHello , 3000);
window.setInterval(jack.lambdaSayHello , 3100);
// sayHello, window -> this
