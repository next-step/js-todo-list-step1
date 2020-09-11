import { checkTarget } from "../utils/validator.js";
import { KEY, SELECTOR } from "../utils/constant.js";
import { fetchTodos, saveTodo } from "../domain/todoService.js";
import TodoInput from "./TodoInput.js";
import Todo from "../domain/todo.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";

class App {
    constructor($target) {

        checkTarget($target)
        this.$target = $target;
        this.state = fetchTodos(KEY)
     
        this.todoInput = new TodoInput({
            $target: document.querySelector(SELECTOR.TODO_INPUT),
            onAddTodo: this.onAddTodo
        });

        this.todoList = new TodoList({
            $target: document.querySelector(SELECTOR.TODO_LIST),
            todos: this.state,
            onToggleTodo: this.onToggleTodo,
            onRemoveTodo: this.onRemoveTodo,
            onEditTodo: this.onEditTodo,
        })

        this.todoTab = new TodoTab({
            $target: document.querySelector(SELECTOR.TODO_TAB),
            selectedTab: this.state.tab,
            onChangeTab : this.onChangeTab
        })
    }

    onAddTodo = (title) => {
        const todo = Todo.title(title);
        this.setTodos([...this.state.todos, todo])
    }

    onEditTodo = (id, newTitle) => {
        const newTodos = this.state.todos.map((todo) => {
            return (todo.id == id) 
            ? { ...todo, title : newTitle }
            : todo
        })
        this.setTodos(newTodos)
    }

    onToggleTodo = (id) => {
        const newTodos = this.state.todos.map((todo) => {
            return (todo.id == id) 
            ? { ...todo, isCompleted: !todo.isCompleted}
            : todo
        })
        this.setTodos(newTodos)
    }

    onRemoveTodo = (id) => {
        const newTodos = this.state.todos.filter((todo) => {
            return todo.id != id
        })
        this.setTodos(newTodos)
    }

    onChangeTab = (tab) => {
        this.setState({
            ...this.state, tab
        })
    }

    setTodos = (newTodos) => {
        this.setState({
            ...this.state,
            todos:newTodos
        })
    }

    setState = (newState) => {
        this.state.setTodos(newState)
        saveTodo(KEY, this.state)

        this.todoList.setState(this.state)
        this.todoTab.setState(this.state.tab)
    }
}

export default App;