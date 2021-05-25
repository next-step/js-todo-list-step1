const getActiveTodos = (toDos) => {
    const newTodos = [];
    for (const todo of toDos) {
        if(!todo.completed) newTodos.push(todo);
    }
    return newTodos;
}

const getCompletedTodos = (toDos) => {
    const newTodos = [];
    for (const todo of toDos) {
        if(todo.completed) newTodos.push(todo);
    }
    return newTodos;
}
const getAll = (toDos) => {
    return toDos
}

const filterTodo = (toDos, hash) => {
    const callback = {"#active" : getActiveTodos, "#completed" : getCompletedTodos, "" : getAll}[hash];
    if(!callback) return;
    return callback(toDos);
}

export {filterTodo}