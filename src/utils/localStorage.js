function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    return JSON.parse(localStorage.getItem('todos'));
}

export { setTodos, getTodos };