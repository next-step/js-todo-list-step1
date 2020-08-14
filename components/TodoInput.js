import {MESSAGE, KEYBOARD, LOCAL_VALUE, VALUE} from "../utils/constant.js";

function TodoInput({$target, addTodoItem}) {
    this.init = () => {
        this.$target = $target;

        this.render();
        this.addEvent();
    };

    this.addEvent = () => {
        this.$target.addEventListener(KEYBOARD.KEYDOWN_EVENT, this.createNewTodo);
    };

    this.createNewTodo = (e) => {
        if (e.key !== KEYBOARD.ENTER) {
            return;
        }

        const newTitle = e.target.value;

        if (newTitle === VALUE.EMPTY) {
            alert(MESSAGE.NOT_ACCESS_EMPTY_TITLE);
            return;
        }

        const id = this.getId();
        const newTodo = {
            id: JSON.parse(id),
            title: newTitle,
            isCompleted: false
        }

        addTodoItem(newTodo);
        e.target.value = VALUE.CLEAR;
    };

    this.getId = () => {
        const id = JSON.parse(localStorage.getItem(LOCAL_VALUE.CURRENT_ID) || 1);
        const nextId = parseInt(id) + 1;
        localStorage.setItem(LOCAL_VALUE.CURRENT_ID, nextId.toString());
        return JSON.parse(id);
    }

    this.render = () => {
        this.$target.innerHTML = `<input
            id="new-todo-title"
            class="new-todo"
            placeholder="할일을 추가해주세요"
            autofocus
        />`;
    };

    this.init();
}

export default TodoInput;
