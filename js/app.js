import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import CounterContainer from './components/CounterContainer.js';
import { FILTER } from './constants.js';

const STORAGE_KEY = 'js-todo-list';

class App {
  appFilter = window.location.hash.substr(2);

  constructor() {
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    this.todoItems = storageData || [];

    new TodoInput({
      $element: document.getElementById('new-todo-title'),
      onEnter: newContent => {
        this.setState([...this.todoItems, getNewItem(newContent)], this.appFilter);
      }
    });

    const getNewItem = (content, isCompleted = false, editing = false) => {
      return {
        content: content,
        isCompleted: isCompleted,
        editing: editing
      };
    };

    this.todoList = new TodoList({
      $element: document.getElementById('todo-list'),
      items:
        this.appFilter === ''
          ? this.todoItems
          : this.todoItems.filter(
              item => (this.appFilter === FILTER.COMPLETED) === item.isCompleted
            ),
      onClickToggle: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(this.todoItems[id].content, !this.todoItems[id].isCompleted);
        this.setState(newTodoItems, this.appFilter);
      },
      onClickDestroy: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems.splice(id, 1);
        this.setState(newTodoItems, this.appFilter);
      },
      onToggleEdit: (id, newContent, editing) => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          newContent ? newContent.trim() : this.todoItems[id].content,
          this.todoItems[id].isCompleted,
          editing
        );
        this.setState(newTodoItems, this.appFilter);
      }
    });

    this.countContainer = new CounterContainer({
      totalCount: this.todoItems.length,
      selectedFilter: this.appFilter
    });

    // 필터 변경 되었을 때
    window.addEventListener('hashchange', () => {
      const newFilter = window.location.hash.substr(2);
      this.setState(this.todoItems, newFilter);
    });
  }

  setState(newItems, newFilter) {
    this.todoItems = newItems;
    this.appFilter = newFilter;

    const filteredItems =
      this.appFilter === ''
        ? this.todoItems
        : this.todoItems.filter(item => (this.appFilter === FILTER.COMPLETED) === item.isCompleted);

    this.todoList.setState(filteredItems);
    this.countContainer.setState({
      newCount: filteredItems.length,
      newFilter: this.appFilter
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }
}

new App();
