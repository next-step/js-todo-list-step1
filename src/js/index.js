document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});

const TodoApp = class {
  constructor() {
    this.idx = 0;
    this.toDoItems = [];
    new TodoInput((value) => this.addToDoItem(value));
    this.toDoList = new ToDoList();
  }

  addToDoItem(value){
    this.toDoItems = [...this.toDoItems, { id: this.idx++, value }];
    this.toDoList.render(this.toDoItems);
  }
}

const TodoInput = class {
  constructor(handleAddTodo) {
    const $todoInput = document.querySelector('#new-todo-title');
    $todoInput.addEventListener('keyup', event=>this.inputChangeListener(event));
    
    this.handleAddTodo = handleAddTodo;
    // todoInput.addEventListener('keyup', this.inputChangeListener);//이렇게 넘겨주면, inputChangeListener에서 this를 이벤트 대상 객체를 바라보는 문제가 생김.
  }

  inputChangeListener({ target, key }) {
    if(key === 'Enter') {
      this.handleAddTodo(target.value);
      target.value = '';
    }
  }
}

const ToDoList = class {
  constructor() {
    this.$toDoList = document.querySelector('#todo-list');
  }
  
  render(items) {
    this.$toDoList.innerHTML = '';
    const views = items.map(({ value }) => {
      const li = document.createElement('li');
      li.innerHTML = value;
      return li;
    });

    for (const item of views) {
      this.$toDoList.append(item);
    }
  }
}
