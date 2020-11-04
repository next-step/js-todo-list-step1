function TodoList(data, toDos) {
  this.data = data;
  this.toDos = toDos;

  this.setState = newData => {
    this.data = newData;
    this.render();
  };

  this.render = () => {
    this.toDos.innerHTML = `
    ${this.data
      .map(
        todo =>
          `<li class=${todo.state}>
            <div class="view" id=${todo.id}>
            ${
              todo.state === "completed"
                ? `<input class="toggle" type="checkbox" checked />`
                : `<input class="toggle" type="checkbox" />`
            }
              <label class="label">${todo.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="" />
          </li>`
      )
      .join("")}`;
  };

  this.render();
}

export default TodoList;
