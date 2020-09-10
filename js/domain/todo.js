import { TYPE } from "../utils/constant.js";
import { checkType } from "../utils/validator.js";

class Todo {
    constructor(id, title, isComplete) {
        checkType(id, TYPE.NUMBER);
        checkType(title, TYPE.STRING);
        checkType(isComplete, TYPE.BOOLEAN);

        this.id = id;
        this.title = title;
        this.isComplete = isComplete;
    }

    static init() {
        return new Todo(Date.now(),"",false)
    }

    static of({id, title, content}) {
        return new Todo(id, title, content);
    }
}

export default Todo;