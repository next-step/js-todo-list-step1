import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import {loadTodos, saveTodos} from "../utils/localStorage.js";

export default function TodoApp(props) {
    const {
        $todoInput,
        $todoList,
        $todoCount,
        $todoFilter,
    } = props;
    this.data = loadTodos() || [];
    this.nextId = this.data.length + 1;
    this.filter = "all";

    const handleKeydown = (description) => {
        const newData = this.data.concat({
            id: this.nextId++,
            description,
            isCompleted: false,
        });
        this.setState(newData, this.filter);
    };

    const handleToggle = (id) => {
        const newData = this.data.map(todo =>
            todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
        );
        this.setState(newData, this.filter);
    }

    const handleRemove = (id) => {
        const newData = this.data.filter(todo => (todo.id !== id));
        this.setState(newData);
    };

    const handleEdit = (id, description) => {
        const newData = this.data.map(todo =>
            todo.id === id ? {...todo, description: description} : todo
        );
        this.setState(newData, this.filter);
    };

    const handleFilter = (filter) => {
        this.setState(this.data, filter);
    };

    this.todoInput = new TodoInput({
        $target: $todoInput,
        handleKeydown,
    });

    this.todoList = new TodoList({
        $target: $todoList,
        data: this.data,
        handleToggle,
        handleRemove,
        handleEdit,
    });

    this.todoCount = new TodoCount({
        $target: $todoCount,
        count: this.data.length,
    })

    this.todoFilter = new TodoFilter({
        $target: $todoFilter,
        filter: this.filter,
        handleFilter
    });

    this.setState = (data, filter) => {
        this.data = data;
        this.filter = filter;
        let filteringData = this.data;


        if (this.filter === "active") {
            filteringData = this.data.filter(todo => !todo.isCompleted)
        } else if(this.filter === "completed") {
            filteringData = this.data.filter(todo => todo.isCompleted)
        }

        this.todoList.setState(filteringData);
        this.todoCount.setState(filteringData.length);
        saveTodos(this.data);
        this.render();
    };

    this.render = () => {
        this.todoList.render();
        this.todoCount.render();
    };

};