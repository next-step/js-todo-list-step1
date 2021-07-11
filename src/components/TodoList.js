import Component from "../core/Component.js"
import $ from "./utils.js";


export default class TodoList extends Component{
    template() {
        const { filteredItems } = this.$props;
        const { todoItems, selectedItem } = this.$state;
        return `
    ${filteredItems.map(({ id, contents, isComplete }) =>
            `<li class=${isComplete ? 'completed' : selectedItem === id ? "editing" : "false"} data-id="${id}">
        <div class="view">
        <input class="toggle" type="checkbox" ${isComplete ? "checked" : ''}/>
        <label class="label">${content}</label>
        <button class="destroy" style="display:none"></button>
        <input class="edit" value="${content}" ${selectedItem === id ? "" : `readonly`}/>
        </div>
    </li>`).join(``)}`
    }

    setEvent(){
        const { deleteItem, toggleItem, editItem } = this.$props;
        const $deleter = $(".destroy")
        this.addEvent("focus", ".edit", () => $deleter.removeAttribute("style"));
        this.addEvent("click", ".destroy", ({ target }) => {
            deleteItem(Number(target.closest(`[data-id]`).dataset.id))
        });
        this.addEvent("dblclick", ".edit", ({ target }) => {
            editItem(Number(target.closest(`[data-id]`).dataset.id));
        });
        this.addEvent("input", ".toggle", ({ target }) => {
            toggleItem(Number(target.closest(`[data-id]`).dataset.id));
        })
    }
  
}