import TodoState from "./TodoState.js"
import ItemController from "./ItemController.js"
export function TodoCount({onChangeView}){
    const $todoFilter = document.querySelector(".filters");
    const $todoFilters = $todoFilter.querySelectorAll(".filters a");
    const $count = document.querySelector(".todo-count strong");
  
    this.changeView = ({classList:$selectedMode}) => {
        onChangeView($selectedMode[0]);
        TodoState.view = $selectedMode[0];
        $todoFilters.forEach((node)=>{ node.classList.remove("selected"); });
        $selectedMode.add("selected");
        this.count($selectedMode[0]);
    }
    
    this.count = (view = TodoState.view) =>{
        $count.innerText = ItemController.getItemsByState(view).length;//굳이 아이템불러와야하나! state에 상태별갯수 저장?
        //$count.innerText = $todoList.childElementCount
    }

    $todoFilter.addEventListener("click", ({target}) => {
        if(target.nodeName == "A" && !target.classList.contains("selected")) {
            this.changeView(target);
        }
    });
}
