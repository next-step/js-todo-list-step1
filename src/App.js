import { ToDoInput } from "./component/index.js";
class App {
    $todoInput;
    constructor(){
        console.log("asd")
        this.$todoInput = new ToDoInput();
    }
}

const app = new App();