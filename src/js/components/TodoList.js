import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor({ todoListUl, todoData }) {
    this.todoListUl = todoListUl;
    this.todoData = todoData;
    this.render();
  }

  setState(data) {
    this.todoData = data;
    this.todoListUl.innerHTML = '';
    this.render();
  }

  render() {
    if (!this.todoData) return;
    this.todoData.map((data, i) => {
      new TodoItem({
        todoListUl: this.todoListUl,
        data,
        todoData: this.todoData,
        onCheckItem: () => {
          data.completed = !data.completed;
          localStorage.setItem('item', JSON.stringify(this.todoData));
        },
        onDeleteItem: () => {
          this.todoData = this.todoData.splice(i, 1);
          localStorage.setItem('item', JSON.stringify(this.todoData));
        },
      });
    });
  }
}
