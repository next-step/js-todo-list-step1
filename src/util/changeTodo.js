import { getTodos, setTodo } from "./localStorage.js"

const toggleTodo = (toDos,idx) => {
    const newTodos = toDos.map((todo) => {
        if(todo.idx === idx){
            todo.completed = !todo.completed
        }
        return todo
    })
    setTodo(newTodos)
}

const removeTodo = (toDos,idx) => {
    const newTodos = toDos.filter((todo)=> todo.idx !== idx);
    setTodo(newTodos)
}

const changeTodo = (idx, name) => {
    const toDos = getTodos();
    const callback = {"toggle": toggleTodo, "destroy": removeTodo}[name];
    if(!callback) return null;
    
    callback(toDos,idx);
}
export {changeTodo}