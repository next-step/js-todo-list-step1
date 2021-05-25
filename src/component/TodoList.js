function TodoList({$main, initalState, onClick}) {
    this.state = initalState;
    this.onClick = onClick;
    this.$target = document.createElement("ul");
    this.$target.id = "todo-list"
    this.$target.className = "todo-list"
    $main.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
    this.template = () => {
        return this.state ? this.state.map(({idx, value, completed}) => `
        <li class="${completed ? "completed" : "incomplete"}">
            <div data-idx = ${idx} class="view">
                <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
                <label class="label">${value}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀" />
        </li>
        `).join("") : ""
    }
    this.render = () => {
        this.$target.innerHTML = this.template();
        this.mounted()
    }

    this.mounted = () => {
        this.$target.querySelectorAll("li").forEach($li => {
           $li.addEventListener("click", (e) => {
               const { idx } = e.target.parentNode.dataset;
               const name = e.target.className;
               this.onClick(idx, name);
           })
        })
    }
}

export default TodoList