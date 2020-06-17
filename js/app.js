import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';

class App {
  constructor() {
    this.todoItems = [
      {
        content: 'ABCD',
        isCompleted: false,
        editing: false
      },
      {
        content: 'EFGH',
        isCompleted: true,
        editing: false
      },
      {
        content: 'qwerqwer',
        isCompleted: false,
        editing: false
      }
    ];

    const getNewItem = (content, isCompleted = false, editing = false) => {
      return {
        content: content,
        isCompleted: isCompleted,
        editing: editing
      };
    };

    this.todoList = new TodoList({
      $element: document.getElementById('todo-list'),
      items: this.todoItems,
      onClickToggle: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(this.todoItems[id].content, !this.todoItems[id].isCompleted);
        this.setState(newTodoItems);
      },
      onClickDestroy: id => {
        const newTodoItems = [...this.todoItems];
        newTodoItems.splice(id, 1);
        this.setState(newTodoItems);
      },
      onToggleEdit: (id, newContent, editing) => {
        const newTodoItems = [...this.todoItems];
        newTodoItems[id] = getNewItem(
          newContent ? newContent.trim() : this.todoItems[id].content,
          this.todoItems[id].isCompleted,
          editing
        );
        this.setState(newTodoItems);
      }
    });

    this.todoInput = new TodoInput({
      $element: document.getElementById('new-todo-title'),
      onEnter: newContent => {
        this.setState([...this.todoItems, getNewItem(newContent)]);
      }
    });
  }

  setState(newItems) {
    this.todoList.setState(newItems);
    this.todoItems = newItems;
  }
}

new App();
