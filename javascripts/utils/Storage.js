export default class Storage {

    constructor() {
        this.key = "todoItems";
        this.storage = localStorage;
    }

    isEmpty() {
        const todoItems = this.storage.getItem(this.key);
        console.log(todoItems)
        return todoItems === null;
    }

    getTodoItems () {
        if(this.isEmpty()) {
            return [];
        }
        const {todoItems} = JSON.parse(this.storage.getItem(this.key));
        return todoItems;
    }

    updateTodoItems (todoItems) {
        this.storage.setItem(this.key, JSON.stringify({[this.key] :todoItems }));
    }
}