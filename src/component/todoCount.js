export default function TodoCount() {
    this.$todoCount = document.querySelector(".todo-count");
    
    this.count = updatedTodoItems => {
        this.$todoCount.querySelector("strong").innerHTML = updatedTodoItems.length;
    }
}