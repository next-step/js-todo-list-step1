import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";
import Storage from "../utils/Storage.js";

export default function TodoApp() {
    this.storage = new Storage();

    this.state = {
        todoItems: this.storage.getTodoItems(),
        filter: "all",
    };

    const filterType = {
        all: () => true,
        active: v => !v.isDone,
        completed: v => v.isDone,
    }

    const addTodo = todo => {
        const {todoItems} = this.state;
        setState([...todoItems, todo])
    }

    const removeTodo = todoId => {
        const {todoItems} = this.state;
        setState(todoItems.filter(({id}) => id !== todoId))
    }

    const changeTodoDone = (todoId, status) => {
        setState(this.state.todoItems.map(todo => {
            if (todoId === todo.id) {
                todo.isDone = status;
            }
            return todo;
        }))
    }

    const updateTodo = ({id, title}) => {
        const newTodoItems = this.state.todoItems.map(v => {
            if (v.id === id) {
                v.title = title;
                v.isUpdate = false;
            }

            return v;
        });
        setState(newTodoItems);
    }

    const updateTodoStatus = ({id, status}) => {
        const newTodoItems = this.state.todoItems.map(v => {
            if (v.id === id) {
                v.isUpdate = status;
            }

            return v;
        });
        setState(newTodoItems);
    }

    const filteringTodoItems = () => this.state.todoItems.filter(filterType[this.state.filter]);

    const changeFilter = filter => {
        this.state.filter = filter;
        setState(this.state.todoItems)
    }

    const setState = todoItems => {
        this.state.todoItems = todoItems;
        this.storage.updateTodoItems(todoItems);
        const data = filteringTodoItems()
        new TodoList({"todoItems": data, removeTodo, changeTodoDone, updateTodoStatus, updateTodo}).render();
        new TodoCount({"todoItems": data});
    }

    new TodoFilter({changeFilter})
    setState(this.state.todoItems);
}

TodoApp.prototype.render = function () {
    new TodoInput({addTodo})
}