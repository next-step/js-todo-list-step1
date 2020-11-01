import { checkTarget } from "../utils/validator.js";
import { KEY, SELECTOR } from "../utils/constants.js";
import { fetchTodos, saveTodo } from "../domain/todoRepository.js";
import TodoInput from "./TodoInput.js";
import Todo from "../domain/todo.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";
import TodoCount from "./TodoCount.js";

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

        this.todoCount = new TodoCount({
            $target: document.querySelector(SELECTOR.TODO_COUNT),
            state: this.state
        })
    }

    onAddTodo = (title) => {
        const todo = Todo.title(title);
        this.state.setTodo(todo);
        this.setState()
    }

    onEditTodo = (id, newTitle) => {
        this.state.editTodo(id, newTitle);
        this.setState()
    }

    onToggleTodo = (id) => {
        this.state.toggleTodo(id);
        this.setState()
    }

    onRemoveTodo = (id) => {
        this.state.removeTodo(id)
        this.setState()
    }

    onChangeTab = (selectedTab) => {
        this.state.changeTab(selectedTab);
        this.setState();
    }

    setState = () => {
        saveTodo(KEY, this.state)

        this.todoList.setState(this.state)
        this.todoTab.setState(this.state.tab)
        this.todoCount.setState(this.state)
    }
}

export default App;