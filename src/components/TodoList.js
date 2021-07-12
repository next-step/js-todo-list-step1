import Component from "../core/Component.js"
import  { checklength, $ } from "./utils.js";


export default class TodoList extends Component {
    template() {
        const { filteredItems, selectedItem } = this.$props;
        
        return `
    ${filteredItems.map(({ id, content, isComplete }) => `
    <li class="${isComplete ? "completed" :'false'} ${selectedItem===id?"editing":""}" data-id="${id}">
        <div class="view">
        <input class="toggle" type="checkbox" ${isComplete? "checked" : ''}/>
        <label class="label">${content}</label>
        <button class="destroy"></button>
        <input class="edit" value="${content}"/>
        </div>
    </li>`).join(``)}`
    }

    setEvent() {
        const { deleteItem, toggleItem, editItem, updateItem, resetItem } = this.$props;
       
        this.addEvent("click", ".destroy", ({ target }) => {
            deleteItem(Number(target.closest(`[data-id]`).dataset.id))
        });
        this.addEvent("dblclick", ".label", (event) => {   
            editItem(Number(event.target.closest(`[data-id]`).dataset.id));         
        });
        this.addEvent("input", ".toggle", ({ target }) => {
            toggleItem(Number(target.closest(`[data-id]`).dataset.id));
        });
        this.addEvent("keyup", ".edit", ({ key, target }) => {
            const content = target.value.trim();
            if (key === 'Enter') {
                checklength(content);
                updateItem(content);
            } else if (key === 'escape') {
                resetItem();
            }
            return;
        });
  
}
}