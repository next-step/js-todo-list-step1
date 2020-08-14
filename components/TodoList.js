import {TODO_STATUS, KEYBOARD, TOGGLE_STATUS, TODO_TAB_STATUS} from "../utils/constant.js";

function TodoList({$target, todoListState, removeTodo, toggleTodo, editTodo}) {
    this.init = () => {
        this.$target = $target;
        this.state = todoListState;

        this.isEditing = false;

        this.render();
        this.addEvents();
    }

    this.addEvents = () => {
        this.$target.addEventListener("click", this.clickEvent);
        this.$target.addEventListener("dblclick", this.editTodo);
    }

    this.editTodo = $event => {
        const todoItem = $event.target.offsetParent;
        if (todoItem.className === TODO_STATUS.DONE || this.isEditing) {
            return;
        }

        this.isEditing = true;
        todoItem.classList.add(TODO_STATUS.EDITING);
        todoItem.addEventListener(KEYBOARD.KEYDOWN_EVENT, this.editTitle);
    }

    this.editTitle = $event => {
        const dbclickedTodoItem = $event.target.offsetParent;
        if ($event.key === KEYBOARD.ESC) {
            this.completeEditingTodoTitle(dbclickedTodoItem);
            return;
        }

        if ($event.key !== KEYBOARD.ENTER) {
            return;
        }

        const dbclickedTodoId = parseInt(dbclickedTodoItem.id);
        const editTodoTitle = $event.target.value;
        editTodo(dbclickedTodoId, editTodoTitle);
        this.completeEditingTodoTitle(dbclickedTodoItem);
    }

    this.completeEditingTodoTitle = (dbclickedTodoItem) => {
        dbclickedTodoItem.classList.remove("editing");
        this.isEditing = false;
    }

    this.clickEvent = $event => {
        const clickedClassName = $event.target.className;
        if (clickedClassName !== "destroy" && clickedClassName !== "toggle") {
            return;
        }

        const clickedTodoId = parseInt($event.target.offsetParent.id);
        if (clickedClassName === "destroy") {
            this.removeTodoItem(clickedTodoId);
            return;
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
        const undefined = this.filterTodos();
        console.table(undefined);
        this.$target.innerHTML = undefined
            .map(this.todoListTemplate);
    }

    this.filterTodos = () => {
        const selectedTab = this.state.selectedTab;
        if (selectedTab === TODO_TAB_STATUS.ALL) {
            return this.state.todos;
        }

        if (selectedTab === TODO_TAB_STATUS.DONE) {
            return this.state.todos.filter(todo => todo.isCompleted);
        }

        if (selectedTab === TODO_TAB_STATUS.TODO) {
            return this.state.todos.filter(todo => !todo.isCompleted);
        }
    }

    this.setState = (updatedState) => {
        this.state = updatedState;

        this.render();
    }

    this.removeTodo = (todoId) => {
        this.removeTodo(todoId);
    }

    this.todoListTemplate = (todo) => {
        return `<li id="${todo.id}" class="${todo.isCompleted ? TODO_STATUS.DONE : TODO_STATUS.TODO}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.isCompleted ? TOGGLE_STATUS.CHECKED : TOGGLE_STATUS.UNCHECKED}/>
        <label class="label">${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.title}" />
    </li>`
    }

    this.init();
}

export default TodoList;
