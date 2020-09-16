import { qs, qsa } from "./utils.js";
import TodoState from "./TodoState.js";
import ItemController from "./ItemController.js";
export default new class render{
    constructor(){
        this.$todoList = qs("#todo-list");
        this.$todoInput = qs("#new-todo-title");
        this.$todoFilter = qs(".filters");
        this.$todoFilters = qsa("a",this.$todoFilter);
        this.$count = qs(".todo-count strong");
    }

    todoList = {
        add : (item) => {
            if(TodoState.view !== "completed"){
                const template = this.todoItemTemplate(item);
                this.$todoList.insertAdjacentHTML("beforeend", template);
            }
        },
        remove : (target) => {
            target.closest("li").remove();
            this.todoCount.count();
        },
        toggleCompleted : (target) => {
            if(TodoState.view === "all") 
                return target.closest("li").classList.toggle("completed");
            target.closest("li").remove();
            this.todoCount.count();
        },
        toggleEditing : (target) => {
            target.closest("li").classList.toggle("editing");
            target.closest("li").lastElementChild.focus();
        },
        changeTitle : (target) => {
            qs("label",target.closest("li")).textContent = target.value;
        },
        undoChange : (target) => {
            target.value = qs("label",target.closest("li")).textContent;
        },
        view : (view) => {
            const items = ItemController.getItemsByState(view);
            const template = items.map(this.todoItemTemplate);
            this.$todoList.innerHTML = template.join("");
        },
        clear : () => {
            this.$todoList.innerHTML = "";
        }

    }

    todoCount = { //span > strong, ul.filter 따로 렌더
        count : (view = TodoState.view) => {
            this.$count.innerText = ItemController.getItemsByState(view).length;
            //strong tag innerText = view갯수
            //그냥 전체 새로 렌더는 어떨까 - _-...
        }
    }

    todoItemTemplate({title,id,completed,editing}){
        return ` <li data-id="${id}" class="${completed ? 'completed':''}${ editing ? ' editing':''}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${completed?"checked":""}>
                            <label class="label">${title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${title}">
                    </li>`;
    }
}