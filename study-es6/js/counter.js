// JS: 1) Functional Programming (Core Lang. Feature)
//     2) Asynchronous Functions (Core Lang. Feature)
//     3) Event-Driven Programming (Core Lang. Feature)
//     4) Object-Oriented Programming (Core Lang. Feature)
//     5) Reactive Programming (Library -> Angular(RxJs)/Vue/KO, Backend (RxJs))
class App { // es6
    constructor() {
        this.counter = 0;
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
    }
    init(){
        this.spanCounter = document.getElementById("counter");
        window.setInterval(this.update, 1000);
    }
    update(){
        this.counter++;
        this.spanCounter.innerText = this.counter;
    }
}
function app() {
    let counter = 0; // Model
    // DOM API
    // let spanCounter = document.querySelector("#counter");
    let spanCounter = document.getElementById("counter");

    let updateCounter = function () { // (1)
        counter++; // Model Update
        // Model -> View
        // Dom Manipulation
        spanCounter.innerText = counter;
    }

    function alternativeUpdateCounter() { // (2)
        counter++; // Model Update
        // Model -> View
        // Dom Manipulation
        spanCounter.innerText = counter;
    }

    let lambdaUpdateCounter = () => { // (3) lambda function, arrow function
        counter++; // Model Update
        // Model -> View
        // Dom Manipulation
        spanCounter.innerText = counter;
    }

    // for every 1 sec, setInterval triggers Timeout Event
    // TimeoutEvent -> updateCounter
    // Note: setInterval is an async function
    let timerId = window.setInterval(updateCounter, 1000);
    // let timerId = window.setInterval(alternativeUpdateCounter, 1000);
    // let timerId = window.setInterval(lambdaUpdateCounter, 1000);
    // clearInterval(timerId)
}
let application = new App();
window.onload = application.init; // callback function <- onload
