export default  function TodoItemWrapper({isDone, isUpdate}) {
    this.element = document.createElement("li");
    if(isDone) {
        this.element.classList.add("completed")
    }

    if(isUpdate) {
        this.element.classList.add("editing");
    }
}

TodoItemWrapper.prototype.updateTodo = function () {
    this.element.classList.add()
}

TodoItemWrapper.prototype.doneTodo = function () {this.element.classList.add("completed")}
TodoItemWrapper.prototype.doTodo = function () {this.element.classList.remove("completed")}
TodoItemWrapper.prototype.addItemChild = function({todoCheckbox,todoTitle,todoDestroy}) {
    this.element.appendChild(todoCheckbox.render())
    this.element.appendChild(todoTitle.render())
    this.element.appendChild(todoDestroy.render())

    return this;
}

TodoItemWrapper.prototype.render = function () {
    return this.element
}