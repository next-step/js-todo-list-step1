import KeyUtils from "../../utils/KeyUtils.js";

export default function TodoItemUpdateTitle({id, title, updateTodo, updateTodoStatus}) {
    this.element = document.createElement("input");
    this.element.classList.add("edit");
    this.element.value = title;

    this.element.addEventListener("keyup", ({keyCode}) => {

        if (KeyUtils.isEsc(keyCode)) {
            updateTodoStatus({id, status: false})
        }

        if (KeyUtils.isEnter(keyCode)) {
            updateTodo({id, "title": this.element.value});
        }
    })
}

TodoItemUpdateTitle.prototype.render = function () {
    return this.element;
}
