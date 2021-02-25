import TodoListItem from "./TodoListItem.js";

export default function TodoList({todoItems, removeTodo, changeTodoDone, updateTodoStatus, updateTodo}) {

    const parent = document.querySelector("#todo-list");
    parent.textContent = '';

    const appendTodoItem = () => {
        return todoItems.map(todo => new TodoListItem({
            todo,
            removeTodo,
            changeTodoDone,
            updateTodoStatus,
            updateTodo
        }).render())
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