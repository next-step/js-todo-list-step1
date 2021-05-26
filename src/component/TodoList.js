import { filterTodo } from "../util/filterTodo.js";

function TodoList({$main, onClick, onDbClick}) {
    this.onClick = onClick;
    this.onDbClick = onDbClick;

    this.$target = document.createElement("ul");
    this.$target.id = "todo-list"
    this.$target.className = "todo-list"
    $main.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
    this.template = () => {
        const hash = location.hash;
        const filteredTodos = filterTodo(this.state, hash);
        
        return filteredTodos ? filteredTodos.map(({idx, value, completed}) => `
        <li class="${completed ? "completed" : "incomplete"}" data-idx = ${idx}>
            <div class="view">
                <input class="toggle" type="checkbox" ${completed ? "checked" : ""}/>
                <label class="label">${value}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${value}" />
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
               const { idx } = e.target.closest("li").dataset;
               const name = e.target.className;
               this.onClick(idx, name);
           })
           $li.addEventListener("dblclick", (e) => {
                this.onDbClick(e.target)
            })
        })
    }
}

export default TodoList