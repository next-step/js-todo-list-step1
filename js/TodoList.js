import TodoState from "./TodoState.js"
import ItemController from "./ItemController.js"
export function TodoList({count}){
    const $todoList = document.querySelector("#todo-list");

    this.remove = ({target}) => {
        if(target.classList.contains("destroy")){
            if(confirm("정말로 삭제하시겠습니까?")){
                const id = Number(target.closest("li").dataset.id);
                ItemController.deleteItem(id);
                target.closest("li").remove();//this.render.remove(id); 
                count();
            }
        }
    }

    this.toggle = (target,value) => {
        const id = Number(target.closest("li").dataset.id);
        ItemController.toggleItem(id,value);
        if(TodoState.view === "all" || value === "editing"){ 
            target.closest("li").classList.toggle(value);
            target.closest("li").lastElementChild.focus();
        }
        else {
            target.closest("li").remove();
            if(value === "completed") count();//value == "completed" && console.log("todoCount"); //anti pattern
        }
    }

    this.update = (target,key) => {
        if(!['Enter','Escape'].includes(key)) return;
        const id = Number(target.closest("li").dataset.id);
        const newTitle = target.value;
        ItemController.toggleItem(id,"editing");
        target.closest("li").classList.toggle("editing");//this.render.toggle("editing");

        if(key === 'Enter' && !!newTitle.trim() &&
            target.closest("li").querySelector("label").textContent != newTitle){
            ItemController.changeTitle(id,newTitle);
            target.closest("li").querySelector("label").textContent = newTitle;//this.render.changeTitle(id,newTitle)
        }
        else {
            target.value = target.closest("li").querySelector("label").textContent;//this.render.stopChangeTitle(id)
        }
    }

    $todoList.addEventListener("click", this.remove);
    $todoList.addEventListener("change", ({target}) => {
        if(target.classList.contains("toggle")) this.toggle(target,"completed");
    });
    $todoList.addEventListener("dblclick", ({target}) => {
        if(target.classList.contains("label")) this.toggle(target,"editing");
    });
    $todoList.addEventListener("keyup", ({target,key}) => this.update(target,key));

    document.querySelector("h1").onclick = ()=>{
        ItemController.clear();
    }
    this.render = {
        add : (item) => {
                if(TodoState.view !== "completed"){
                    const template = todoItemTemplate(item);
                    $todoList.insertAdjacentHTML("beforeend", template);
                }
        },
        view : (view) => {//view = "all, active, completed"
                const items = ItemController.getItemsByState(view);
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
