export default class TodoCountContainer {
    $count = null;
    $filters = null;

    onFilter = null;
    
    constructor({onFilter}) {
        this.$count = document.querySelector(".todo-count");
        this.$filters = document.querySelector(".filters");
        this.$filters.addEventListener("click", (event => {
            if (event.target && event.target.nodeName == "A") {                
                this.onFilterClick(event);
            }            
        }))

        this.onFilter = onFilter;
    }

    setCount(event) {
        this.$count.querySelector("strong").innerHTML = event;
    }

    onFilterClick(event) {
        document.querySelector(".selected").setAttribute("class", document.querySelector(".selected").hash.slice(1))
        event.target.setAttribute("class", `${event.target.hash.slice(1)} selected`);
        this.onFilter(event.target.hash.slice(1));        
    }
}