export default function TodoInput({ onAdd }) {
    let $todoInput = document.getElementById("#new-todo-title");
    $todoInput.addEventListener('keyup', this.addTodoItem);

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if(this.isValid(event, $newTodoTarget.value)) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    }

    this.isValid = (event, targetValue) => {
        return (event.keyCode === 13 && targetValue != "");
    }
};
