import Component from "../core/Component.js";
import { checklength } from "./utils.js";

export default class TodoInput extends Component{
    setEvent() {
        const { addItem } = this.$props;
        this.addEvent("keyup", "#new-todo-title", ({ key, target }) => {
            if (key !== "Enter") return;
            checklength(target.value);
            addItem(target.value);
        });
   }
}