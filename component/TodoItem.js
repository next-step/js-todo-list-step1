export class TodoItem {
  constructor(contents, state) {
    this.content = this.templateTodoItem(contents);
  }

  templateTodoItem = (contents) => {
    return `<li>
              <div class="view">
                <input class="toggle" type="checkbox">
               
                <label >${contents}</label>
                <button class="destroy"></button>
              </div>
            </li>`;
  };
}

const checkedTodos = () => {
  const $checkBoxes = document.querySelectorAll(".toggle");
  $checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", onCheckedTodoHandle);
  });
};

const onCheckedTodoHandle = (event) => {
  let li = event.target.parentNode.parentNode;
  li.classList.toggle("completed");
};

const deleteTodos = () => {
  const $deleteTodos = document.querySelectorAll(".destroy");
  $deleteTodos.forEach((deleteTodo) => {
    deleteTodo.addEventListener("click", onClickDeleteTodoHandle);
  });
};

const onClickDeleteTodoHandle = (event) => {
  let li = event.target.parentNode.parentNode;
  li.remove();
};

const renderTodoItem = ({ id, value }) => {
  return `<li>
                <div class="view">
                  <input class="toggle" type="checkbox">
                  <label key=${id}>${value}</label>
                  <button class="destroy"></button>
                </div>
              </li>`;
};

// export {
//   checkedTodos,
//   onCheckedTodoHandle,
//   deleteTodos,
//   onClickDeleteTodoHandle,
//   renderTodoItem,
// };
