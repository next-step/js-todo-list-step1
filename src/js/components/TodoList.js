import TodoItem from './TodoItem.js';

export default class TodoList {
    constructor({todoList, data}){
        this.todoList = todoList;
        this.data = data;
        this.render();
    }

    setState(data){
        this.data = data;
        this.todoList.innerHTML = '';
        this.render();
    }

    render() {
        if(!this.data) return;
        this.data.map(data => {
            new TodoItem({
                todoList: this.todoList,
                completed: data.completed,
                text: data.title
            });
        })
    }
}