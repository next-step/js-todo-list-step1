import {todoInput} from "./components/todoInput.js";
import {todoCheckbox} from "./components/todoCheckbox.js";
import {todoEdit} from "./components/todoEdit.js";
import {todoCount} from "./components/todoCount.js";
import {todoFliter} from "./components/todoFilter.js";

export const app = () => {
    todoInput();
    todoCheckbox();
    todoEdit();
    todoCount('all');
    todoFliter();
}

