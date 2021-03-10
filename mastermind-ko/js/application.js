import {GameViewModel} from "./game.js";

let model = new GameViewModel();
window.onload = () => { // event-triggered -> callback
   ko.applyBindings(model);
};