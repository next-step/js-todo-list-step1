// store
class TodoList {
  add(todoItem) {
    console.log(todoItem);
  }

  render() {}
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
  }
}

class TodoItem {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.editable = false;
  }
}
