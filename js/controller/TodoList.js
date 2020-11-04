function TodoList(data, toDos) {
  const render = () => {
    toDos.innerHTML = `
    ${data
      .map(
        data =>
          `<li class=${data.state}>
            <div class="view" id=${data.id}>
            ${
              data.state === "completed"
                ? `<input class="toggle" type="checkbox" checked />`
                : `<input class="toggle" type="checkbox" />`
            }
              <label class="label">${data.text}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="" />
           </li>`
      )
      .join("")}`;
  };

  render();
}

export default TodoList;
