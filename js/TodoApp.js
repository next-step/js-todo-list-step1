import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import {loadTodos, saveTodos} from "../utils/localStorage.js";

export default function TodoApp(props) {
    const {
        $todoInput,
        $todoList,
    } = props;
    this.data = loadTodos() || [];
    this.nextId = this.data.length + 1;

    const handleKeydown = (description) => {
        const newData = this.data.concat({
            id: this.nextId++,
            description,
            isCompleted: false,
        });
        this.setState(newData);
    };

    const handleToggle = (id) => {
        const newData = this.data.map(todo => {
            if (todo.id === id) {
                return Object.assign({}, todo, {isCompleted: !todo.isCompleted})
            }
            return todo;
        });

        this.setState(newData);
    }

    this.todoInput = new TodoInput({
        $target: $todoInput,
        handleKeydown,
    });

    this.todoList = new TodoList({
        $target: $todoList,
        data: this.data,
        handleToggle,
    });

    this.setState = (newData) => {
        this.data = newData;

        this.todoList.setState(this.data);
        saveTodos(this.data);
        this.render();
    };

    this.render = () => {
        this.todoList.render();
    };

};