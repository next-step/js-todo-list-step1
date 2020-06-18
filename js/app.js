import TodoInput from './components/TodoInput.js';
import { TodoList, Item } from './components/TodoList.js';
import FilterContainer from './components/FilterContainer.js';
import { FILTER } from './constants.js';

const STORAGE_KEY = 'js-todo-list';

class App {
  filter = window.location.hash.substr(2);

  constructor() {
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    this.todoItems = storageData || [];

    const getNewItem = (id, content, isCompleted = false, editing = false) => {
      return Item({
        id,
        content,
        isCompleted,
        editing
      });
    };

    new TodoInput({
      $element: document.getElementById('new-todo-title'),
      onEnter: newContent => {
        this.setState(
          [...this.todoItems, getNewItem(this.todoItems.length, newContent)],
          this.appFilter
        );
      }
    });

    this.filterTodoItems(this.todoItems);

    this.todoList = new TodoList({
      $element: document.getElementById('todo-list'),
      items: this.filteredItems,
      onClickToggle: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          id,
          this.todoItems[id].content,
          !this.todoItems[id].isCompleted
        );
        this.setState(newTodoItems, this.filter);
      },
      onClickDestroy: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems.splice(id, 1);
        this.setState(newTodoItems, this.filter);
      },
      onToggleEdit: (id, newContent, editing) => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          id,
          newContent ? newContent.trim() : this.todoItems[id].content,
          this.todoItems[id].isCompleted,
          editing
        );
        this.setState(newTodoItems, this.filter);
      }
    });

    this.FilterContainer = new FilterContainer({
      totalCount: this.filteredItems.length,
      selectedFilter: this.filter
    });

    // 필터 변경 되었을 때
    window.addEventListener('hashchange', () => {
      const newFilter = window.location.hash.substr(2);
      this.setState(this.todoItems, newFilter);
    });
  }

  setState(newItems, newFilter) {
    this.filter = newFilter;
    this.filterTodoItems(newItems);

    this.todoList.setState(this.filteredItems);
    this.FilterContainer.setState({
      newCount: this.filteredItems.length,
      newFilter: this.filter
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        newItems.map(item => {
          const saveItem = {
            id: item.id,
            content: item.content,
            isCompleted: item.isCompleted
          };
          return saveItem;
        })
      )
    );
    this.todoItems = newItems;
    this.appFilter = newFilter;
  }

  filterTodoItems(todoItems) {
    this.todoItems = todoItems.map((item, id) =>
      Item({
        id,
        content: item.content,
        isCompleted: item.isCompleted,
        editing: item.editing
      })
    );

    this.filteredItems =
      this.filter === ''
        ? this.todoItems
        : this.todoItems.filter(item => (this.filter === FILTER.COMPLETED) === item.isCompleted);
  }
}

new App();
