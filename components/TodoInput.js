import {MESSAGE} from "../utils/constant.js";

function TodoInput({$target, addTodoItem}) {
    this.init = () => {
        this.$target = $target;

        this.render();
        this.addEvent();
    };

    this.addEvent = () => {
        this.$target.addEventListener('keydown', this.createNewTodo);
    };

    this.createNewTodo = (e) => {
        if (e.key !== "Enter") {
            return;
        }

        const newTitle = e.target.value;

        if (newTitle === "") {
            alert(MESSAGE.NOT_ACCESS_EMPTY_TITLE);
            return;
        }
        let newTodo = {
            // id: todo: id를 count하면서 저장해주는.. 방법 찾기
            title: newTitle,
            isCompleted: false
        }

        addTodoItem(newTodo);
        e.target.value = "";
    };

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
