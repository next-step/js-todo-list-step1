function TodoList(element, todos, { onAction }) {
  if (!(this instanceof TodoList)) {
    throw new Error("error: TodoList must be called with new!");
  }

  this.$list = element;
  this.todos = todos;
  this.onAction = onAction;

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => {
    if (!this.todos.length) return;

    const htmlString = this.todos
      .map((todo, idx) => {
        const { content, isCompleted = false } = todo;

        if (!content) return;

        return `<li data-idx=${idx} class=${isCompleted ? "completed" : ""}>
          <div class="view">
            <input class="toggle" type="checkbox" ${
              isCompleted ? "checked" : ""
            }>
            <label class="label">${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}">
        </li>`;
      })
      .join("");

    this.$list.innerHTML = htmlString;
  };

  this.init = () => {
    this.render();
  };

  this.init();

  this.$list.addEventListener("click", (e) => {
    const { className, type } = e.target;
    if (className === "toggle" && type === "checkbox") {
      const {
        dataset: { idx },
      } = e.target.parentNode.parentNode;
      this.onAction.toggle(idx);
    }
  });
}

export default TodoList;
