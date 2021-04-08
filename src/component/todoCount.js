export default function TodoCount(todoList) {
    this.$todoCount = document.querySelector(".count-container");
    
    this.count = updatedTodoItems => {
        this.$todoCount.querySelector("strong").innerHTML = updatedTodoItems.length;
    }

    const onClick = event => {
        if (event.target.className === "active") {
            todoList.active();
        }
        if (event.target.className === "completed") {
            todoList.completed();
        }
        if (event.target.className === "") {
            todoList.render();
        }
    }

    this.$todoCount.querySelector(".filters").addEventListener("click", onClick);
}