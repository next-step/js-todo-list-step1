import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";


class App {
    constructor() {
        try {
            this.todos = this.getTodos();

            this.todoHeader = new TodoHeader({
                    $target: document.querySelector("#todo-app-header")
                }
            );

            this.todoInput = new TodoInput({
                $target: document.querySelector("#todo-input"),
                addTodoItem: this.addTodoItem.bind(this)
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    getTodos() {
        const todos = localStorage.getItem("todos");
        return JSON.parse(todos) || [];
    }

    setState(todos) {
        this.todos = todos;
        this.saveTodos(todos);
        this.render();
    }

    saveTodos(todos) {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    addTodoItem(todo) {
        this.setState([...this.todos, todo]);
    };

    render() {
        // todoList 조회 (선택 혹은 default 조회 : 여기는 동일하게 설정하고 추후 선택에 따라 선택적으로 값을 보여주면 될 듯!)
    }
}

export default App;
