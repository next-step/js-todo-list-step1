import { checkTarget, checkInstance, checkFunction } from "../utils/validator.js";
import Todos from "../domain/todos.js";
import { todoListDOM } from "../utils/templates.js";
import { EVENT, CLASS } from "../utils/constant.js";

class TodoList {
    constructor({
        $target, 
        todos, 
        onToggleTodo,
        onRemoveTodo
    }) {
        checkTarget($target);
        checkInstance(todos, Todos)
        checkFunction(onToggleTodo)
        checkFunction(onRemoveTodo)

        this.$target = $target
        this.state = todos
        this.onToggleTodo = onToggleTodo
        this.onRemoveTodo = onRemoveTodo

        this.bindEvents();
        this.render();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.CLICK, this.onClick);
    }

    onClick = (e) => {
        const clickedClass = e.target.className
        if(
            clickedClass != CLASS.TOGGLE &&
            clickedClass != CLASS.DESTROY
        ) return;

        const todoId = parseInt(e.target.closest('li').id);
        
        if(clickedClass == CLASS.TOGGLE) {
            this.onToggleTodo(todoId);
            return;
        }

        if(clickedClass == CLASS.DESTROY) {
            this.onRemoveTodo(todoId);
            return;
        }
    }

    createTodoListDOM = (todos) => {
        return todos.reduce((html, todo) => 
            html + todoListDOM(todo)
        ,"")
    }

    setState = (state) => {
        this.state = state
        this.render();
    }

    render = () => {
        this.$target.innerHTML = this.createTodoListDOM(this.state.todos);
    }



    


}

export default TodoList;