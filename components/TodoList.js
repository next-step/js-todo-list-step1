function TodoList(element, todos) {
  if (!(this instanceof TodoList)) {
    throw new Error("error: TodoList must be called with new!");
  }

  this.$list = element;
  this.todos = todos;

  this.setState = (todos) => {
    this.todos = todos;
    this.render();
  };

  this.render = () => {
    if (!this.todos.length) return;

    const htmlString = this.todos
      .map((todo) => {
        const { content, isCompleted = false } = todo;

        if (!content) return;

        return `<li>
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
}

export default TodoList;
