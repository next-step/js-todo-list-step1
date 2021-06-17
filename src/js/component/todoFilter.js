export default class TodoFilter {
    $target;
    $props;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        
        console.log(this.$props);
        console.log(this.$target);
        this.render();
    }
    template() {
        return `
        <li class="filter">
            <a id="all" class="" href="/#">전체보기</a>
        </li>
        <li class="filter">
            <a id="active" href="#active">해야할 일</a>
        </li>
        <li class="filter">
            <a id="completed" href="#completed">완료한 일</a>
        </li>
        `;
    }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted()
    }
    mounted(){
        const nowMode = this.$props.filterMode;
        const filterModes = document.querySelectorAll('.filter > a');
        filterModes.forEach(mode => {
           if(mode.id == nowMode){
               mode.classList.add("selected");
           }
        });

        const todoFilters = document.querySelectorAll('.filter')
        todoFilters.forEach(todoFilter => todoFilter.addEventListener("click",this.filterItem.bind(this)));
       
    }
    filterItem(event){
        const todoFilters = document.querySelectorAll('.filter > a');
        console.log(todoFilters);
        todoFilters.forEach(todoFilter => {
            console.log(todoFilter);
            todoFilter.classList.remove("selected")
        })
        event.target.classList.add("selected");
        this.$props.onfilterItem(event.target.id);
    }
}
