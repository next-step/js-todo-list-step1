import { changeTodo } from "../util/ChangeTodo.js";
import { editTodo } from "../util/editTodo.js";
import { filterTodo } from "../util/filterTodo.js";
import { getTodos, setTodo } from "../util/localStorage.js";
import TodoCount from "./TodoCount.js";
import TodoList from "./TodoList.js";

function Main({$app}) {
    const $main = document.createElement("main");
    $app.appendChild($main);

    const todoList = new TodoList({
        $main,
        onClick: (idx, name) => {
            if(!changeTodo(idx, name)) return;
            const toDos = getTodos();
            this.setState({toDos})
        },
        onDbClick: (target) => {
            editTodo(target, this.setState)
        }
    })
    const todoCount = new TodoCount({
        $main,
        onHashChange: () => {
            this.setState();
        }
    })
    this.setState = (nextState) => {
        this.state = {...this.state, ...nextState};
        setTodo(this.state.toDos);
        const hash = location.hash;
        const filteredTodos = filterTodo(this.state.toDos, hash);
        todoList.setState({toDos: filteredTodos});
        todoCount.setState({count: filteredTodos.length});
    }
}

export default Main
