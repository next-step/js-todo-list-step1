import KeyUtils from "../utils/KeyUtils.js";

export default function TodoInput({addTodo}) {
    const $todoInputBox = document.querySelector("#new-todo-title");

    const generateId = () => {
        return new Date().valueOf();
    }

    const register = (item) => {
        const todo = {
            id : generateId(),
            title : item,
            isDone : false,
            isUpdate : false
        }
        addTodo(todo)
    }

    const isEmpty = value => value.length <= 0;

    function registerTodoItemListener({keyCode}) {
        const {value} = $todoInputBox

        if (KeyUtils.isNotEnter(keyCode)) return;
        if(isEmpty(value)) return;

        register(value)
        $todoInputBox.value = "";
    }

    $todoInputBox.addEventListener("keyup", registerTodoItemListener);
}