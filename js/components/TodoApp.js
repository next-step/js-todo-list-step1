import todoInput from "./TodoInput.js";
import todoList from "./TodoList.js";
import todoFooter from "./TodoFooter.js";
import TodoItem from "./TodoItem.js";

class TodoApp{
    constructor(todoItems) {
        this.todoItems = todoItems || [];

        todoInput({
            onAdd: contents => {
                let todoItem = new TodoItem(contents);
                this.todoItems.push(todoItem);
                this.setState(this.todoItems);
            }
        })
    }

    setState(updateItems) {
        this.todoItems = updateItems;
        todoList.setState(this.todoItems);
    }
}

export default TodoApp;
