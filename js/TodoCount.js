function TodoCount({onChangeFilter}){
    const $countContainer = document.querySelector(".count-container");
    const $count = $countContainer.querySelector(".todo-count strong");
    const $todoFilters = $countContainer.querySelector(".filters");

    $todoFilters.addEventListener("click", event => {
        const $target = event.target;

        if($target.tagName === "A"){
            onChangeFilter($target.classList[0]);
            $target.closest("ul").querySelector(".selected").classList.remove("selected");
            $target.classList.toggle("selected");
        }
    });

    this.setstate = count => {
        this.count = count;
        this.render(this.count);
    }

    this.render = count => {
        $count.innerText = count;
    }
}

export default TodoCount;