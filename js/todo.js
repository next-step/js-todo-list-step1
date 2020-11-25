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
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener("dblclick", () => {
      this.items.map((item) => item.startEditMode());
    });
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      this.items.map((item) => item.cancelEditMode());
    });
    window.addEventListener("click", (e) => {
      if (this.el.contains(e.target)) return;
      this.items.map((item) => item.finishEditMode());
    });
  }

  add(todoItem) {
    console.log(todoItem);
    this.items.push(todoItem);
    this.render();
  }

  remove(todoItemId) {
    console.log("delete!!");
    this.items = this.items.filter((item) => item.id !== todoItemId);
    this.render();
  }

  updateItem(updatedItem) {
    const { id } = updatedItem;
    this.items = this.items.map((item) =>
      item.id === id ? updatedItem : item
    );
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
    this.el.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      this.register.apply(this);
    });
  }

  register() {
    if (!this.el.value) return;
    this.todoList.add(
      new TodoItem({ text: this.el.value, todoList: this.todoList })
    );
    this.el.value = "";
  }
}

class TodoItem {
  constructor({ text, todoList }) {
    this.id = new Date().getTime();
    this.el = document.createElement("li");
    this.text = text;
    this.todoList = todoList;
    this.completed = false;
    this.bindEvents();
  }

  set text(text) {
    this.el.innerHTML = todoItemTempate(text);
  }
  get text() {
    return this.el.querySelector(".label").textContent;
  }

  set editable(editable) {
    this.el.classList.toggle("editing", editable);
  }

  bindEvents() {
    this.el.addEventListener("click", (e) => {
      if (e.target.className.includes("toggle")) this.toggle();
    });
    this.el.addEventListener("click", (e) => {
      if (e.target.className.includes("destroy")) this.remove();
    });
  }

  toggle() {
    this.el.classList.toggle("completed");
  }

  remove() {
    this.todoList.remove(this.id);
  }

  startEditMode() {
    this.editable = true;
  }

  cancelEditMode() {
    this.editable = false;
    this.text = this.text;
  }

  finishEditMode() {
    this.editable = false;
    this.text = this.el.querySelector("input.edit").value;
    this.todoList.updateItem(this);
  }
}
