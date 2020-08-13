function TodoList({$target, todos, removeTodo, toggleTodo}) {
    this.init = () => {
        this.$target = $target;
        this.todos = todos;

        this.render();
        this.addEvents();
    }

    this.addEvents = () => {
        this.$target.addEventListener("click", this.clickEvent);
    }

    this.clickEvent = $event => {
        const clickedClassName = $event.target.className;
        if (clickedClassName !== "destroy" && clickedClassName !== "toggle") {
            return;
        }
        const clickedTodoId = parseInt($event.target.offsetParent.id);

        if (clickedClassName === "destroy") {
            this.removeTodoItem(clickedTodoId);
        }

        if (clickedClassName === "toggle") {
            this.toggleTodoItem(clickedTodoId);
        }


    }

    this.toggleTodoItem = todoId => {
        toggleTodo(todoId);
    }

    this.removeTodoItem = todoId => {
        removeTodo(todoId);
    }

    this.render = () => {
        this.$target.innerHTML = this.todos.map(this.todoListTemplate);
    }

    this.setState = (updatedTodos) => {
        this.todos = updatedTodos;
        this.render();
    }

    this.removeTodo = (todoId) => {
        this.removeTodo(todoId);
    }

    this.todoListTemplate = (todo) => {
        return `<li id="${todo.id}" class="${todo.isCompleted ? "completed" : ""}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.isCompleted ? "checked" : ""}/>
        <label class="label">${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.title}" />
    </li>`
    }

    this.init();
}

export default TodoList;
