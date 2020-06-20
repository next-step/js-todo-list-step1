const KEYCODE_ENTER = 13;

function TodoList(element) {
  this.$ul = element;
  this.todoList = [];

  this.addListItem = value => {
    this.todoList = [{ text: value }, ...this.todoList];
    this.render();
  };

  this.render = () => {
    this.$ul.innerHTML = this.todoList.map((item, index) => `<li><input type="checkbox" id="${index}" class="toggle"><label for="${index}">${item.text}</label></li>`).join('');
  };
}

function TodoInput(element, { addTodo }) {
  this.$input = element;
  this.$input.addEventListener('keypress', addTodo);
  this.setText = text => {
    this.$input.value = text;
  }
}

const addTodo = e => {
  if (e.keyCode === KEYCODE_ENTER) {
    todoList.addListItem(e.target.value);
    todoInput.setText('');
  }
};

const todoList = new TodoList(document.getElementById('todo-list'));
const todoInput = new TodoInput(document.getElementById('new-todo-title'), {
  addTodo
});