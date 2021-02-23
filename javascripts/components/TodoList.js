import TodoListItem from "./TodoListItem.js";

export default function TodoList({todoItems, removeTodo, changeTodoDone}) {

    const parent = document.querySelector("#todo-list");
    parent.textContent = '';

    const appendTodoItem = () => {
        return todoItems.map(todo => new TodoListItem({todo, removeTodo, changeTodoDone}).render())
    }

    const render = () => {
        appendTodoItem().forEach(v => {
            parent.append(v)
        })
    }

    return {
        render
    };
}