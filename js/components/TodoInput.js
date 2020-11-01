import { checkTarget, checkFunction } from "../utils/validator.js"
import { TYPE, EVENT } from "../utils/constants.js";

class TodoInput {
    constructor({$target, onAddTodo}) {
        checkTarget($target)
        checkFunction(onAddTodo)

        this.$target = $target;
        this.onAddTodo = onAddTodo

        this.bindEvents();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.KEY_DOWN, this.onKeyDown)
    }

    onKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        const title = e.target.value.trim();
        this.onAddTodo(title);
        e.target.value = "";
    }
}

export default TodoInput