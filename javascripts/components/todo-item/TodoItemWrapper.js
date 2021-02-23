export default  function ItemWrapper({isDone}) {
    this.element = document.createElement("li");
    if(isDone) {
        this.element.classList.add("completed")
    }
}

ItemWrapper.prototype.doneTodo = function () {
    this.element.classList.add("completed")
}
ItemWrapper.prototype.doTodo = function () {
    this.element.classList.remove("completed")
}

ItemWrapper.prototype.addItemChild = function({todoCheckbox,todoTitle,todoDestroy}) {
    this.element.appendChild(todoCheckbox.render())
    this.element.appendChild(todoTitle.render())
    this.element.appendChild(todoDestroy.render())

    return this;
}

ItemWrapper.prototype.render = function () {
    return this.element
}