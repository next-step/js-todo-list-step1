import TodoInput from './TodoInput.js'
import TodoList from './TodoList.js'

export default function TodoApp() {
    this.state = {
        todoItems: []
    };



    const addTodo = (todo) => {
        const {todoItems} = this.state
        setState([...todoItems, todo])
    }

    const setState = (todoItems) => {
        this.state.todoItems = todoItems;
        new TodoList(todoItems).render();
    }

    new TodoInput({addTodo})
}