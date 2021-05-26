import { getTodos, setTodo } from "./localStorage.js"

const toggleTodo = (toDos,idx, setState) => {
    const newTodos = toDos.map((todo) => {
        if(todo.idx === idx){
            todo.completed = !todo.completed
        }
        return todo
    })
    setState({toDos: newTodos});
}

const removeTodo = (toDos,idx, setState) => {
    const newTodos = toDos.filter((todo)=> todo.idx !== idx);
    setState({toDos: newTodos});
}

const changeTodo = (idx, name, setState) => {
    const toDos = getTodos();
    const callback = {"toggle": toggleTodo, "destroy": removeTodo}[name];
    if(!callback) return false;
    
    callback(toDos,idx, setState);

    return true;
}
export {changeTodo}
