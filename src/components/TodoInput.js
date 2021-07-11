import Component from "../core/Component";

export default class TodoInput extends Component{
    setEvent() {
        const { addItem } = this.$props;
        this.addEvent("keyup", ".new-todo", ({ key, target }) => {
            if (key !== "Enter") return;
            addItem(target.value);
        });
   }
}