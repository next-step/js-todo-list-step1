import KeyUtils from "../../utils/KeyUtils.js";

export default function TodoItemUpdateTitle({id, title, updateTodo, updateTodoStatus}) {
    const element = document.createElement("input");
    element.classList.add("edit");
    element.value = title;
    element.addEventListener("keyup", ({keyCode}) => {

        if (KeyUtils.isEsc(keyCode)) {
            updateTodoStatus({id, status: false})
        }

        if (KeyUtils.isEnter(keyCode)) {
            updateTodo({id, "title": element.value});
        }
    })

    return {
        render : () => element
    }
}