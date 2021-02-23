import TodoListItem from "./TodoListItem.js";

export default function TodoList({todoItems, removeTodo, changeTodoDone}) {

    const parent = document.querySelector("#todo-list");
    console.log(this.todoItems)
    parent.textContent = '';

    const totalCount = size => {
        const todoCount = document.querySelector(".todo-count strong")
        todoCount.textContent = size;
    }

    const appendTodoItem = () => {
        return todoItems.map(todo => new TodoListItem({todo, removeTodo, changeTodoDone}).render())
    }

    const render = () => {

        appendTodoItem().forEach(v => {
            parent.append(v)
        })
        totalCount(todoItems.length);
    }

    return {
        render
    };
}