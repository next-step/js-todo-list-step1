import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoItem from "./TodoItem.js";

class TodoApp{
    constructor(todoItems) {
        this.todoItems = todoItems || [];
        this.todoList = new TodoList();

        new TodoInput({
            onAdd: contents => {
                let todoItem = new TodoItem(contents);
                this.todoItems.push(todoItem);
                this.setState(this.todoItems);
            }
        });
    }

    setState(updateItems) {
        this.todoItems = updateItems;
        this.todoList.setState(this.todoItems);
    }
}

export default TodoApp;
