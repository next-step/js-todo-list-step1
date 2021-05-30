import TodoItem from './js/TodoItem.js';
import TodoList from './js/TodoList.js';
import TodoInput from './js/TodoInput.js';
import TodoCount from './js/TodoCount.js';
import TodoFilter from './js/TodoListFilter.js';
import WebStorage from './js/WebStorage.js';

function TodoApp() {
  this.todoItems = [];

  const webStorage = new WebStorage();
  const todoCount = new TodoCount();
  const todoList = new TodoList({
    toggle: (event) => {
      if (!event.target.classList.contains('toggle')) return;

      const id = Number(event.target.closest('li').dataset.id);
      const item = this.todoItems.find((i) => i.id === id);
      item.complete = !item.complete;

      this.setState(this.todoItems);
    },
    destroy: (event) => {
      if (!event.target.classList.contains('destroy')) return;

      const id = Number(event.target.closest('li').dataset.id);
      const itemIdx = this.todoItems.findIndex((i) => i.id === id);
      this.todoItems.splice(itemIdx, 1);

      this.setState(this.todoItems);
    },
    edit: (event) => {
      if (!event.target.classList.contains('label')) return;

      const $li = event.target.closest('li');
      $li.classList.add('editing');
    },
    update: (event) => {
      if (!event.target.classList.contains('edit')) return;

      const id = Number(event.target.closest('li').dataset.id);

      if (event.code === 'Escape') {
        const item = this.todoItems.find((i) => i.id === id);
        event.target.value = item.contents;
        const $li = event.target.closest('li');
        $li.classList.remove('editing');
      }

      const newContents = event.target.value;
      if (event.code === 'Enter' && newContents) {
        const item = this.todoItems.find((i) => i.id === id);
        item.contents = event.target.value;

        this.setState(this.todoItems);
      }
    },
  });

  this.init = () => {
    this.setState(webStorage.search() ?? []);
  };

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    webStorage.save(this.todoItems);
    todoList.setState(this.todoItems);
    todoCount.showCount(this.todoItems.length);
  };

  this.getList = (items) => {
    todoList.setState(items);
    todoCount.showCount(items.length);
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  new TodoFilter({
    onSelectedAll: () => {
      this.getList(this.todoItems);
    },
    onSelectedActive: () => {
      this.getList(this.todoItems.filter((item) => !item.complete));
    },
    onSelectedCompleted: () => {
      this.getList(this.todoItems.filter((item) => item.complete));
    },
  });
}

new TodoApp().init();
