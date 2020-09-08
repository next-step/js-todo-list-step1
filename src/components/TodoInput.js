import {ACTIVE} from "../utils/constants.js";

export default function TodoInput({onAdd}) {
    const $todoInput = document.querySelector("#new-todo-title");
    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const valuableContent = event.target.value.length > 0 ? event.target.value.trim() : '';

        if(event.key === 'Enter' && valuableContent.length > 0) {
            event.preventDefault();
            onAdd({
                status: ACTIVE,
                title: valuableContent,
                checked: false
            });
            event.target.value = '';
        }

    };
}