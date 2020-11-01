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
        return new Todos([], TAB.ALL);
    }

    setTodo(todo) {
        checkInstance(todo, Todo);
        this.todos = [...this.todos, todo];
    }

    editTodo(id, newTitle) {
        this.todos = this.todos.map((todo) => {
            return (todo.id == id) 
            ? todo.setTitle(newTitle)
            : todo
        })
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => {
            return (todo.id == id) 
            ? todo.toggle()
            : todo
        })
    }

    removeTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id != id
        })
    }

    countTodos() {
        return this.getSelectedTodos().length;
    }

    getSelectedTodos = () => {
        switch (this.tab) {
          case TAB.ALL:
            return this.todos;
    
          case TAB.ACTIVE:
            return this.getActive();
    
          case TAB.COMPLETED:
            return this.getCompleted();
          
          default :
            console.error(`Error : ${MESSAGE.INVALID_TAB}`)
        }
    };

    changeTab(selectedTab) {
        this.tab = selectedTab
    }

    getActive() {
        return this.todos.filter(({ isCompleted }) => !isCompleted)
    }

    getCompleted() {
        return this.todos.filter(({ isCompleted }) => isCompleted);
    }
}


export default Todos;
