function TodoItem(todoText) {
  this.id = Date.now();
  this.todo = todoText;
  this.completed = false;
}


function TodoApp() {
  this.todoItems= [];
  const todoList = new TodoList();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });
}


function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('#new-todo-title');

  const addTodoItem = (event) => {
    if (event.key === 'Enter') {
      const $newTodoTarget = event.target;
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  };

  $todoInput.addEventListener("keydown", addTodoItem);
}


function TodoList() {
  this.render = (items) => {
    const $todoList = document.querySelector("#todo-list");
    const htmlItems = items.map(todoItemTemplate)
    
    $todoList.innerHTML = htmlItems.join("");
  };
}

const todoItemTemplate = (item) => {
  if (item.todo === "") return null;
  return `
  <li ${item.completed && `class="completed"`}>
    <div class="view">
      <input class="toggle" type="checkbox" ${item.completed && `checked`}/>
      <label class="label">${item.todo}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.todo}" />
  </li>
  `;
};

new TodoApp();