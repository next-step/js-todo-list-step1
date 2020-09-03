export default function TodoInput({ onAdd }) {
    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if(this.isValid(event, $newTodoTarget.value)) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    }

    let $todoInput = document.getElementById("new-todo-title");
    $todoInput.addEventListener('keyup', this.addTodoItem);

    this.isValid = ({target, key }, targetValue) => {
        return (target && key === "Enter" && targetValue !== "");
    }
};
