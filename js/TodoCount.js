import TodoState from "./TodoState.js"
import ItemController from "./ItemController.js"
export class TodoCount{
    constructor({onChangeView}){
        this.$todoFilter = document.querySelector(".filters");
        this.$todoFilters = $todoFilter.querySelectorAll(".filters a");
        this.$count = document.querySelector(".todo-count strong");
        this.onChangeView = onChangeView;
        
        this.$todoFilter.addEventListener("click", ({target}) => {
            if(target.nodeName == "A" && !target.classList.contains("selected")) {
                this.changeView(target);
            }
        });
    }
    
    changeView = ({classList:$selectedMode}) => {
        this.onChangeView($selectedMode[0]);
        TodoState.view = $selectedMode[0];
        this.$todoFilters.forEach((node)=>{ node.classList.remove("selected"); });
        $selectedMode.add("selected");
        this.count($selectedMode[0]);
    }
    
    count = (view = TodoState.view) =>{
        this.$count.innerText = ItemController.getItemsByState(view).length;//굳이 아이템불러와야하나! state에 상태별갯수 저장?
        //this.$count.innerText = $todoList.childElementCount
    }
}
