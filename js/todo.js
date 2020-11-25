const todoItemTempate = (text) => `<li>
<div class="view">
  <input class="toggle" type="checkbox"/>
  <label class="label">${text}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="${text}" />
</li>`;

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
    const html = this.items.map((item) => todoItemTempate(item.text)).join("");
    this.el.innerHTML = html;
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
    this.el.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && this.register.apply(this)
    );
  }

  register() {
    if (!this.el.value) return;
    this.todoList.add(new TodoItem(this.el.value));
    this.el.value = "";
  }
}

class TodoItem {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.editable = false;
  }
}
