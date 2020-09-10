import Todo from "./todo.js";
import { TYPE, TAB } from "../utils/constant.js";
import { checkArray, checkType, checkInstance } from "../utils/validator.js";


class Todos {
    constructor(todos, tab) {
        checkArray(todos);
        checkType(tab, TYPE.STRING);

        this.todos = todos;
        this.tab = tab;
    }

    static of(todos) {
        const newTodo = todos.map(todo => Todo.of(todo));
        return new Todos(newTodo, TAB.ALL)
    }

    static init() {
        const newTodo = [Todo.init()]
        return new Todos(newTodo, TAB.ALL);
    }

    addTodo(todo) {
        checkInstance(todo, Todo)
        this.todos = [...this.todos, todo]
    }
    
    setTodos(todos) {
        Object.assign(this, todos)
    }
}


export default Todos;
