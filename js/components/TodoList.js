import todoItem from "./TodoItem.js";

export default function TodoList(){
    this.init = () =>{
        this.$todoList = document.getElementById('todo-list');
    }

    this.setState = (updateItems) => {
        this.render(updateItems);
    };

    this.render = (items) => {
        for (const item of items) {
            this.$todoList.append(item);
        }
    };
}
