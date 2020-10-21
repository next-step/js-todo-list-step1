import TodoState from "./TodoState.js"
import Render from "./render.js"
import ItemController from "./ItemController.js"
export class TodoCount{
    constructor(){
        this.$todoFilter = qs(".filters");
        this.$todoFilters = qsa("a",this.$todoFilter);
        this.$count = qs(".todo-count strong");
        
        this.$todoFilter.addEventListener("click", ({target}) => {
            if(target.nodeName == "A" && !target.classList.contains("selected")) {
                TodoState.view = target.classList[0];
                Render.todoList.view(target.classList[0]);
                this.$todoFilters.forEach((node)=>{ node.classList.remove("selected"); });
                target.classList.add("selected");
                this.count(target.classList[0]);
            }
        });
    }
    
    count = (view = TodoState.view) =>{
        this.$count.innerText = ItemController.getItemsByState(view).length;
    }
}
