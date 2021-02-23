export default function ItemCheckBox({id,isDone, changeTodoDone}) {
    this.element = document.createElement("input");
    this.element.checked = isDone
    this.element.type = 'checkbox';
    this.element.classList.add("toggle");
    this.element.addEventListener("click", () => {
        changeTodoDone(id, this.element.checked)
    });
}

ItemCheckBox.prototype.render = function() {
    return this.element;
}