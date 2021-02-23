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
        $todoInputBox.value = "";
    }

    function registerTodoItemListener({keyCode}) {
        if (isNotEnter(keyCode)) {
            return;
        }
        register($todoInputBox.value)
    }


    $todoInputBox.addEventListener("keyup", registerTodoItemListener);
}