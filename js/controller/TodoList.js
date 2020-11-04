function TodoList(data, toDos) {
  const render = () => {
    toDos.innerHTML = `
    ${data
      .map(
        data =>
          `<li class=${data.state}>
            <div class="view">
            ${
              data.state === "completed"
                ? `<input class="toggle" type="checkbox" id=${data.id} checked/>`
                : `<input class="toggle" type="checkbox" id=${data.id} />`
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
