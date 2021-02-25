export default  function TodoItemTitle({id, title, updateTodoStatus}) {
    this.element = document.createElement("label");
    this.element.classList.add("label")
    this.element.textContent = title;
    this.element.addEventListener("dblclick", () => {
        updateTodoStatus({id ,"status":true});
    });
}

TodoItemTitle.prototype.render = function() {
    return this.element;
}
