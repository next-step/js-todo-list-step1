export default function TodoInput({addTodo}) {
    const $todoInputBox = document.querySelector("#new-todo-title");

    const generateId = () => {
        return new Date().valueOf();
    }

    const isNotEnter = (keyCode) =>  keyCode !== 13;

    const register = (item) => {
        const todo = {
            id : generateId(),
            title : item,
            isDone : false
        }
        addTodo(todo)
    }

    const isEmpty = value => value.length <= 0;

    function registerTodoItemListener({keyCode}) {
        const {value} = $todoInputBox

        if (isNotEnter(keyCode)) return;
        if(isEmpty(value)) return;

        register(value)
        $todoInputBox.value = "";
    }


    $todoInputBox.addEventListener("keyup", registerTodoItemListener);
}