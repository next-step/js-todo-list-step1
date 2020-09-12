import { TodoState } from "./TodoState.js"
export function TodoList(itemController,state){
    const $todoList = document.querySelector("#todo-list");

    this.remove = ({target}) => {
        if(target.classList.contains("destroy")){
            if(confirm("정말로 삭제하시겠습니까?")){
                const id = Number(target.closest("li").dataset.id);
                itemController.deleteItem(id);
                target.closest("li").remove();//this.render.remove(id); 
                //todoCount.renderCount();
            }
        }
    }

    this.toggle = (target,value) => {
        const id = Number(target.closest("li").dataset.id);
        itemController.toggleItem(id,value);
        if(state.viewMode === "all" || value === "editing"){ 
            target.closest("li").classList.toggle(value);
            target.closest("li").lastElementChild.focus();
        }
        else {
            target.closest("li").remove();
            if(value === "completed") console.log("todoCount render()");//value == "completed" && console.log("todoCount"); //anti pattern
        }
    }

    this.update = event => {
        if(!['Enter','Escape'].includes(event.key)) return;
        const id = Number(event.target.closest("li").dataset.id);
        const newTitle = event.target.value;
        itemController.toggleItem(id,"editing");
        event.target.closest("li").classList.toggle("editing");//this.render.toggle("editing");

        if(event.key === 'Enter' && !!newTitle.trim() &&
            event.target.closest("li").querySelector("label").textContent != newTitle){
            itemController.changeTitle(id,newTitle);
            event.target.closest("li").querySelector("label").textContent = newTitle;//this.render.changeTitle(id,newTitle)
        }
        else {
            event.target.value = event.target.closest("li").querySelector("label").textContent;//this.render.stopChangeTitle(id)
        }
    }

    $todoList.addEventListener("click", this.remove);
    $todoList.addEventListener("change", ({target}) => {
        if(target.classList.contains("toggle")) this.toggle(target,"completed");
    });
    $todoList.addEventListener("dblclick", ({target}) => {
        if(target.classList.contains("label")) this.toggle(target,"editing");
    });
    $todoList.addEventListener("keyup", this.update);

    this.render = {
        add : (item) => {
                if(state.viewMode !== "completed"){
                    const template = todoItemTemplate(item);
                    $todoList.insertAdjacentHTML("beforeend", template);
                }
        },
        view : (view) => {//view = "all, active, completed"
                const items = itemController.getItemsByState(view);
                const template = items.map(todoItemTemplate);
                $todoList.innerHTML = template.join("");
        },
        clear : () => {
                $todoList.innerHTML = "";
        } 
    }

    function todoItemTemplate({title,id,completed,editing}){
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
