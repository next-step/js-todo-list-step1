import TodoInput from './components/TodoInput.js';
import { TodoList, Item } from './components/TodoList.js';
import FilterContainer from './components/FilterContainer.js';
import { FILTER } from './constants.js';
import { STORAGE_KEY, $TODO_INPUT, $TODO_LIST } from './config.js';

const getWindowLocation = () => {
  return window.location.hash.substring(2);
};

const getNewItem = (id, content, isCompleted = false, editing = false) => {
  return Item({
    id,
    content,
    isCompleted,
    editing
  });
};

class App {
  filter = getWindowLocation();

  constructor() {
    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const storedTodoItems = storageData || [];

    this.todoItems = this.makeTemplateTodoItems(storedTodoItems);
    this.filteredItems = this.filterTodoItems(this.filter, this.todoItems);

    new TodoInput({
      $element: $TODO_INPUT,
      onEnter: newContent => {
        this.setState({
          newItems: [...this.todoItems, getNewItem(this.todoItems.length, newContent)],
          newFilter: this.filter
        });
      }
    });

    this.todoList = new TodoList({
      $element: $TODO_LIST,
      items: this.filteredItems,
      onClickToggle: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          id,
          this.todoItems[id].content,
          !this.todoItems[id].isCompleted
        );
        this.setState({
          newItems: newTodoItems,
          newFilter: this.filter
        });
      },
      onClickDestroy: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems.splice(id, 1);
        this.setState({
          newItems: newTodoItems,
          newFilter: this.filter
        });
      },
      onToggleEdit: (id, newContent, editing) => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          id,
          newContent ? newContent.trim() : this.todoItems[id].content,
          this.todoItems[id].isCompleted,
          editing
        );
        this.setState({
          newItems: newTodoItems,
          newFilter: this.filter
        });
      }
    });

    this.FilterContainer = new FilterContainer({
      totalCount: this.filteredItems.length,
      selectedFilter: this.filter
    });

    // 필터 변경 되었을 때
    window.addEventListener('hashchange', () => {
      this.setState({
        newItems: this.todoItems,
        newFilter: getWindowLocation()
      });
    });
  }

  setState({ newItems, newFilter }) {
    this.filter = newFilter;
    this.todoItems = this.makeTemplateTodoItems(newItems);
    this.filteredItems = this.filterTodoItems(newFilter, newItems);

    this.todoList.setState(this.filteredItems);
    this.FilterContainer.setState({
      newCount: this.filteredItems.length,
      newFilter
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
  }

  makeTemplateTodoItems(todoItems) {
    return todoItems.map((item, id) =>
      Item({
        id,
        content: item.content,
        isCompleted: item.isCompleted,
        editing: item.editing || false
      })
    );
  }

  filterTodoItems(filter, todoItems) {
    const isCompletedFilter = filter === FILTER.COMPLETED;
    return filter !== ''
      ? todoItems.filter(item => isCompletedFilter === item.isCompleted)
      : todoItems;
  }
}

new App();
