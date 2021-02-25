import KeyUtils from "../utils/KeyUtils.js";

export default function TodoInput({addTodo}) {
    const $todoInputBox = document.querySelector("#new-todo-title");

    const generateId = () => new Date().valueOf();
    const isEmpty = value => value.length <= 0;

    const register = title => {
        const todo = {
            id : generateId(),
            title : title,
            isDone : false,
            isUpdate : false
        }
        addTodo(todo)
    }

    function registerTodoItemListener({keyCode}) {
        const {value} = $todoInputBox

        if (KeyUtils.isNotEnter(keyCode)) return;
        if(isEmpty(value)) return;

        register(value)
        $todoInputBox.value = "";
    }

    $todoInputBox.addEventListener("keyup", registerTodoItemListener);
}