function TodoList({$target, todos, removeTodo}) {
    this.init = () => {
        this.$target = $target;
        this.todos = todos;

        this.render();
        this.addEvent();
    }

    this.addEvent = () => {
        this.$target.addEventListener("click", this.removeTodoItem);
    }

    this.removeTodoItem = $event => {
        if ($event.target.className !== "destroy") {
            return;
        }

        const todoListItem = $event.target.offsetParent;
        removeTodo(todoListItem.id);
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
        return `<li id="${todo.id}">
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
