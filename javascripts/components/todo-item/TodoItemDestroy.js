export default function TodoItemDestroy({id, removeTodo}) {
    this.element = document.createElement("span");
    this.element.classList.add("destroy");
    this.element.textContent = ' ';
    this.element.addEventListener("click" , () => {
        if (confirm("삭제하시겠습니까?")) {
            removeTodo(id);
        }
    })
}

TodoItemDestroy.prototype.render = function(){
    return this.element;
}