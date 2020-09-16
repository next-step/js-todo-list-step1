import ItemController from "./ItemController.js"
import Render from "./render.js"
export function TodoList(){
    const $todoList = qs("#todo-list");

    this.remove = (target) => {
        if(confirm("정말로 삭제하시겠습니까?")){
            const id = Number(target.closest("li").dataset.id);
            ItemController.remove(id);
            Render.todoList.remove(target);
        }
    }

    this.toggleCompleted = (target) => {
        const id = Number(target.closest("li").dataset.id);
        ItemController.toggle(id,"completed");
        Render.todoList.toggleCompleted(target);
    }

    this.toggleEditing = (target) => {
        const id = Number(target.closest("li").dataset.id);
        ItemController.toggle(id,"editing");
        Render.todoList.toggleEditing(target);
    }

    this.titleUpdate = (target,key) => {
        const id = Number(target.closest("li").dataset.id);
        const title = qs(`li[data-id='${id}'] label`).textContent;
        const newTitle = target.value;

        ItemController.toggle(id,"editing");
        Render.todoList.toggleEditing(target);

        if(key === 'Enter' && !!newTitle.trim() && title !== newTitle){
            ItemController.changeTitle(id,newTitle);
            Render.todoList.changeTitle(target)
        }
        else 
            Render.todoList.undoChange(target);
    }

    $todoList.addEventListener("click", ({target}) => {
        if(target.classList.contains("destroy")) this.remove(target)
    });
    $todoList.addEventListener("change", ({target}) => {
        if(target.classList.contains("toggle")) this.toggleCompleted(target);
    });
    $todoList.addEventListener("dblclick", ({target}) => {
        if(target.classList.contains("label")) this.toggleEditing(target);
    });
    $todoList.addEventListener("keyup", ({target,key}) => {
        if(['Enter','Escape'].includes(key)) this.titleUpdate(target,key)
    });

    document.querySelector("h1").onclick = ()=>{
        ItemController.clear();
        Render.todoList.clear();
        Render.todoCount.count();
    }
}
