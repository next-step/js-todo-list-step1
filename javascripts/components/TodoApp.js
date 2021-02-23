import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'

export default function TodoApp() {
    this.state = {
        todoItems: []
    };


    const addTodo = (todo) => {
        const {todoItems} = this.state;
        setState([...todoItems, todo])
    }

    const removeTodo = todoId => {
        const {todoItems} = this.state;
        setState(todoItems.filter(({id}) => id !== todoId))
    }

    const changeTodoDone = (todoId, status) => {
        const {todoItems} = this.state;
        setState(todoItems.map( todo => {
            if (todoId === todo.id) {
                todo.isDone = status;
            }
            return todo;
        }))
    }

    const setState = (todoItems) => {
        this.state.todoItems = todoItems;
        new TodoList({todoItems, removeTodo,changeTodoDone}).render();
    }

    new TodoInput({addTodo})
}