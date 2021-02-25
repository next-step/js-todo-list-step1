export default function TodoItemCheckBox({id, isDone, isUpdate, changeTodoDone}) {
    this.element = document.createElement("input");
    this.element.checked = isDone
    this.element.type = 'checkbox';
    this.element.classList.add("toggle");
    if(isUpdate) {
        this.element.classList.add("view")
    }
    this.element.addEventListener("click", () => {
        changeTodoDone(id, this.element.checked)
    });
}

TodoItemCheckBox.prototype.render = function () {
    return this.element;
}