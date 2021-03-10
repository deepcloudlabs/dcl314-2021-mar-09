Customer = function(identity, fullname, email){ // constructor
    // this -> object reference
    self = this;
    this.identity = identity;
    this.fullname = fullname;
    this.email = email;
    this.sayHello = function(){
        console.log("Hello, "+self.fullname+" !");
    }
}

jack = new Customer("11111111110", "jack bauer", "jack.bauer@example.com");
// jack.sayHello(); // sayHello, jack -> this
window.fullname = "kate austen";
window.setInterval(jack.sayHello , 3000);
// sayHello, window -> this
