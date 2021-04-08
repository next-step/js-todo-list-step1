const KEYCODE_ENTER = 13;

function TodoItem(todoText) {
  this.id = Date.now();
  this.todo = todoText;
  this.completed = false;
}

function TodoApp() {
  this.todoItems = [];
  const todoList = new TodoList();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });
}

const TodoInput = ({ onAdd }) => {
  const $todoInput = document.querySelector("#new-todo-title");

  const addTodoItem = (e) => {
    if (e.keyCode === KEYCODE_ENTER) {
      const todoTarget = e.target;
      onAdd(todoTarget.value);
      todoTarget.value = "";
    }
  };

  $todoInput.addEventListener("keydown", addTodoItem);
};

const template = ({ todo = "", completed = false }) => {
  if (todo === "") return null;
  return `
    <li ${completed && `class="completed"`}>
      <div class="view">
        <input class="toggle" type="checkbox" ${completed && `checked`} />
        <label class="label">${todo}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo}" />
    </li>
  `;
};

function TodoList() {
  this.render = (items) => {
    const $list = document.getElementById("todo-list");
    const htmlItems = items.map((item) => template(item));

    $list.innerHTML = htmlItems.join("");
  };
}

new TodoApp();
