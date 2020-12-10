const todoTemplate = (text) => {
  return `<li>
                <div class="view">
                  <input class="toggle" type="checkbox" />
                  <label class="label">${text}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${text}" />
              </li>`;
};

export const addTodoItem = (text) => {
  const todos = JSON.parse(localStorage.getItem('todos'));

  if (todos === null) {
    return localStorage.setItem('todos', JSON.stringify(todoTemplate(text)));
  }
  return localStorage.setItem(
    'todos',
    JSON.stringify(todos + todoTemplate(text)),
  );
};

export const removeTodoItem = () => {
  //
};

export const changeStateTodoItem = () => {
  //
};
