import TodoHeader from "./TodoHeader.js";


class App {
    constructor() {
        try {
            this.todoHeader = new TodoHeader();

        } catch (e) {
            console.error(e.error);
        }
    }
}

export default App;
