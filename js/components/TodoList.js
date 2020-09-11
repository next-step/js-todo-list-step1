import { checkTarget, checkInstance, checkFunction } from "../utils/validator.js";
import Todos from "../domain/todos.js";
import { todoListDOM } from "../utils/templates.js";
import { EVENT, CLASS, NODE, KEY_EVENT, TAB, MESSAGE } from "../utils/constant.js";

class TodoList {
    constructor({
        $target, 
        todos, 
        onToggleTodo,
        onRemoveTodo,
        onEditTodo
    }) {
        checkTarget($target);
        checkInstance(todos, Todos)
        checkFunction(onToggleTodo)
        checkFunction(onRemoveTodo)
        checkFunction(onEditTodo)

        this.$target = $target
        this.state = todos
        this.onToggleTodo = onToggleTodo
        this.onRemoveTodo = onRemoveTodo
        this.onEditTodo = onEditTodo
        this.isEditing = false;

        this.bindEvents();
        this.render();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.CLICK, this.onClick);
        this.$target.addEventListener(EVENT.KEY_DOWN, this.onKeypress);
        this.$target.addEventListener(EVENT.DOUBLE_CLICK, this.onDblClick);
    }

    onClick = (e) => {
        const clickedClass = e.target.className
        if(
            clickedClass != CLASS.TOGGLE &&
            clickedClass != CLASS.DESTROY
        ) return;

        const todoId = parseInt(e.target.closest("li").id);
        
        if(clickedClass == CLASS.TOGGLE) {
            this.onToggleTodo(todoId);
            return;
        }

        if(clickedClass == CLASS.DESTROY) {
            this.onRemoveTodo(todoId);
            return;
        }
    }

    onDblClick = (e) => {
        if(this.isEditing) return;
        if(e.target.nodeName != NODE.LABEL) return;

        this.isEditing = true;

        const $todo = e.target.closest("li");
        $todo.classList.add(CLASS.EDITING);

        const $input = document.createElement('input');
        $input.className = CLASS.EDIT;
        $input.value = e.target.innerText;
        $todo.appendChild($input);
        $input.focus();
    }

    onKeypress = (e) => {
        if(e.key != KEY_EVENT.ENTER && e.key != KEY_EVENT.ESCAPE) return;

        const $todo = e.target.closest("li")
        const title = e.target.value.trim();
        
        switch (e.key) {
            case KEY_EVENT.ENTER:
                this.onEditTodo(parseInt($todo.id), title)
                this.isEditing = false;
                return;

            case KEY_EVENT.ESCAPE: 
                $todo.classList.remove(CLASS.EDITING);
                $todo.removeChild(e.target);
                this.isEditing = false;
                return;
        }
    }

    getSelectedTodos = (selectedTab) => {
        const { todos } = this.state;
    
        switch (selectedTab) {
          case TAB.ALL:
            return todos;
    
          case TAB.ACTIVE:
            return todos.filter(({ isCompleted }) => !isCompleted);
    
          case TAB.COMPLETED:
            return todos.filter(({ isCompleted }) => isCompleted);
          
          default :
            console.error(`Error : ${MESSAGE.INVALID_TAB}`)
            return;
        }
      };
    

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
        const selectedTodos = this.getSelectedTodos(this.state.tab)
        this.$target.innerHTML = this.createTodoListDOM(selectedTodos);
    }
}

export default TodoList;