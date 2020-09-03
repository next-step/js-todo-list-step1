class TodoInput{

    constructor({ onAdd }) {
        this.onAdd = onAdd;
        this.$todoInput = document.getElementById("new-todo-title");
        this.$todoInput.addEventListener('keyup', event=>this.addTodoItem(event));
    }

    addTodoItem = event =>{
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)) {
            this.onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    }

    isValid = ({ target, key }, targetValue) => {
        return (target && key === "Enter" && targetValue !== "");
    };
}
export default TodoInput;
