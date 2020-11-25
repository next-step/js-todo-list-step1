const todoItemTempate = (text) => `<div class="view">
  <input class="toggle" type="checkbox"/>
  <label class="label">${text}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="${text}" />`;

class TodoList {
  constructor({ el }) {
    if (!el) return;
    this.el = el;
    this.items = [];
  }

  add(todoItem) {
    console.log(todoItem);
    this.items.push(todoItem);
    this.render();
  }

  render() {
    this.el.innerHTML = "";
    this.items.map((item) => this.el.append(item.el));
  }
}

class TodoRegister {
  constructor({ el, todoList }) {
    if (!el) return;
    this.el = el;
    this.todoList = todoList;
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener("blur", this.register.bind(this));
    this.el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.register.apply(this);
    });
  }

  register() {
    if (!this.el.value) return;
    this.todoList.add(new TodoItem(this.el.value));
    this.el.value = "";
  }
}

class TodoItem {
  constructor(text) {
    this.el = document.createElement("li");
    this.el.innerHTML = todoItemTempate(text);
    this.completed = false;
    this.editable = false;
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener("click", (e) => {
      if (e.target.className.includes("toggle")) this.toggle();
    });
  }

  toggle() {
    this.el.classList.toggle("completed");
  }

  delete() {
    console.log("delete!");
  }
}
