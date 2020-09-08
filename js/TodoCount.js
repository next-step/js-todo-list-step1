export function TodoCount({onChangeView}){
    const $todoFilter = document.querySelector(".filters");
    const $todoFilters = document.querySelectorAll(".filters a");
  
    $todoFilter.addEventListener("click", event => this.changeView(event));
    this.changeView = event => {
        if(event.target && event.target.nodeName == "A"){
            const $selectedMode = event.target.classList;
            
            onChangeView($selectedMode[0]);
            $todoFilters.forEach((node)=>{ node.classList.remove("selected"); });
            $selectedMode.add("selected");
        }
    }
}
