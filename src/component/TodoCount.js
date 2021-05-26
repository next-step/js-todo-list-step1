import { filterTodo } from "../util/filterTodo.js";

function TodoCount({$main, onHashChange}) {
    this.onHashChange = onHashChange;

    this.$target = document.createElement("div");
    this.$target.className = "count-container"
    $main.appendChild(this.$target);

    window.addEventListener("hashchange", () => {
      this.onHashChange();
    })

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
    this.template = () => {
      const hash = location.hash;
      const filteredTodos = filterTodo(this.state, hash);
      const count = filteredTodos.length;
        return `
        <span class="todo-count">총 <strong>${count}</strong> 개</span>
          <ul class="filters">
            <li>
              <a class="all ${hash === "" ? "selected" : ""}" href="#">전체보기</a>
            </li>
            <li>
              <a class="active ${hash === "#active" ? "selected" : ""}" href="#active">해야할 일</a>
            </li>
            <li>
              <a class="completed ${hash === "#completed" ? "selected" : ""}" href="#completed">완료한 일</a>
            </li>
          </ul>
          `
    }
    this.render = () => {
        this.$target.innerHTML = this.template();
    }
}

export default TodoCount