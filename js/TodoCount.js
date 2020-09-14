import TodoState from "./TodoState.js"
import ItemController from "./ItemController.js"
export class TodoCount{
    constructor({onChangeView}){
        this.$todoFilter = qs(".filters");
        this.$todoFilters = qsa("a",this.$todoFilter);
        this.$count = qs(".todo-count strong");
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
        this.$count.innerText = ItemController.getItemsByState(view).length;
    }
}
