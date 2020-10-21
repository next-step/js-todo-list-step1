function TodoInput({onAdd}){
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => {
        this.addTodoItem(event);
    });

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if(isValid(event, $newTodoTarget.value)){
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    const isValid = (event, value) => {
        if(event.key === "Enter" && value !== ""){
            return true;
        }
    };
};

export default TodoInput;