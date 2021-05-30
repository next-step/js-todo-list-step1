import TodoItem from "./TodoItem.js"

export default class  TodoList {
    $todoList = null;
    $todoItem = null;

    todoItem = null;
    itemClick = null;
    itemCheck = null;
    itemDelete = null;
    constructor({todoList, itemClick, itemCheck, itemDelete}) {
        this.todoItem = new TodoItem({
            itemClick: itemClick,
            itemCheck: itemCheck,
            itemDelete: itemDelete,
        });
        this.$todoList = todoList;
        this.itemClick = itemClick;
        this.itemCheck = itemCheck;
        this.itemDelete = itemDelete;
    }

    onAdd(event) {
        this.$todoList.append(this.todoItem.getItemTemplate(event.code, event.title, event.isComplete));

        return event;
    }
}