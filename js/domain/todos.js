import Todo from "./todo.js";
import { TYPE, TAB } from "../utils/constant.js";
import { checkArray, checkType } from "../utils/validator.js";


class Todos {
    constructor(todos, tab) {
        checkArray(todos);
        checkType(tab, TYPE.STRING);

        this.todos = todos;
        this.tab = tab;
    }

    static of({todos, tab}) {
        const newTodo = todos.map(todo => Todo.of(todd));
        return new Todos(newTodo, tab)
    }

    static init() {
        const newTodo = [Todo.init()]
        return new Todos(newTodo, TAB.ALL);
    }
}


export default Todos;
