class ToDoItem {
    constructor(id, text, isCompleted = false){
        this.id = id;
        this.text = text;
        this.isCompleted = isCompleted;
    }

    static getTodoItem(object){
        return Object.setPrototypeOf(object, ToDoItem.prototype);
    }

}