import { checkTarget } from "../utils/validator.js";
import { KEY, SELECTOR } from "../utils/constant.js";
import { fetchTodos, saveTodo } from "../domain/todoService.js";
import TodoInput from "./TodoInput.js";
import Todo from "../domain/todo.js";

class App {
    constructor($target) {

        checkTarget($target)
        this.$target = $target;
        this.state = fetchTodos(KEY)
     
        this.todoInput = new TodoInput({
            $target: document.querySelector(SELECTOR.TODO_INPUT),
            onAddTodo: this.onAddTodo
        })
    }

    onAddTodo = (title) => {
        const todo = Todo.title(title);
        this.setState({
            ...this.state,
            todos: [...this.state.todos, todo]
        })
    }

    setState = (newState) => {
        this.state.setTodos(newState)
        saveTodo(KEY, this.state)
    }
}

export default App;