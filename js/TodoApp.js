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

    const onKeydown = (content) => {
        console.log(content);
        const newData = this.data.concat({
            id: this.nextId++,
            content,
            isCompleted: false,
        });
        this.setState(newData);
    };

    this.todoInput = new TodoInput({
        $target: $todoInput,
        onKeydown,
    });

    this.todoList = new TodoList({
        $target: $todoList,
        data: this.data
    });

    this.setState = (newData) => {
        console.log(newData);
        this.data = newData;

        this.todoList.setState(this.data);
        saveTodos(this.data);
        this.render();
    };

    this.render = () => {
        this.todoList.render();
    };

};