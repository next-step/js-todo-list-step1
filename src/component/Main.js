import { changeTodo } from "../util/ChangeTodo.js";
import { editTodo } from "../util/editTodo.js";
import { getTodos, setTodo } from "../util/localStorage.js";
import TodoCount from "./TodoCount.js";
import TodoList from "./TodoList.js";

function Main({$app, initalState}) {
    this.state = initalState;
    const $main = document.createElement("main");
    $app.appendChild($main);

    const todoList = new TodoList({
        $main,
        initalState: this.state.toDos,
        onClick: (idx, name) => {
            if(changeTodo(idx, name) === null) return;
            const toDos = getTodos();
            this.setState({toDos})
        },
        onDbClick: (target) => {
            editTodo(target, this.setState)
        }
    })
    const todoCount = new TodoCount({
        $main,
        initalState: this.state.count,
        onChange: () => {
            this.setState();
        }
    })
    this.setState = (nextState) => {
        this.state = {...this.state, ...nextState};
        setTodo(this.state.toDos);
        todoList.setState(this.state.toDos);
        todoCount.setState(this.state.toDos);
    }
}

export default Main