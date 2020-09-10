import { TYPE } from "../utils/constant.js";
import { checkType } from "../utils/validator.js";

class Todo {
    constructor(id, title, isCompleted) {
        checkType(id, TYPE.NUMBER);
        checkType(title, TYPE.STRING);
        checkType(isCompleted, TYPE.BOOLEAN);

        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
    }

    static init() {
        return new Todo(Date.now(), "", false)
    }

    static title(title) {
        return new Todo(Date.now(), title, false)
    }

    static of({id, title, isCompleted}) {
        return new Todo(id, title, isCompleted);
    }
}

export default Todo;