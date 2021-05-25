import { getTodos, setTodo } from "./localStorage.js";
const editTodoText = ({key, target}, originValue, setState, toDos) => {
    switch (key) {
        case "Escape":
            target.value = originValue;
            target.closest("li").classList.remove("editing");
            return true;
        case "Enter":
            const idx = target.closest("li").dataset.idx;
            const newToDos = toDos.map(todo => {
                if(todo.idx === idx){
                    todo.value = target.value;
                }
                return todo;
            })
            setTodo(newToDos);
            setState({toDos: newToDos});
    }
}
const editTodo = (target, setState) => {
    const name = target.className;
    const callback = {"label": editTodoText}[name];

    if(!callback) return null;
    const toDos = getTodos();
    const originValue = target.innerText;
    const $li = target.closest("li");
    $li.classList.add("editing");
    $li.addEventListener("keyup",(e) => {
        editTodoText(e, originValue, setState, toDos);
    })

}

export {editTodo}