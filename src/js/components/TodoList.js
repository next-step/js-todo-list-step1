import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor({ todoListUl, todoCount, todoData }) {
    this.todoListUl = todoListUl;
    this.todoCount = todoCount;
    this.todoData = todoData;
    this.render();
  }

  setState(data) {
    this.todoData = data;
    this.todoListUl.innerHTML = '';
    this.render();
  }

  render() {
    this.todoCount.innerHTML = this.todoData.length;
    this.todoData.map((data, i) => {
      new TodoItem({
        todoListUl: this.todoListUl,
        data,
        todoData: this.todoData,
        onCheckItem: () => {
          data.completed = !data.completed;
          localStorage.setItem('item', JSON.stringify(this.todoData));
          this.setState(this.todoData);
        },
        onModifyItem: (title) => {
          data.title = title;
          localStorage.setItem('item', JSON.stringify(this.todoData));
          this.setState(this.todoData);
        },
        onDeleteItem: () => {
          this.todoData.splice(i, 1);
          localStorage.setItem('item', JSON.stringify(this.todoData));
          this.setState(this.todoData);
        },
      });
    });
  }
}
