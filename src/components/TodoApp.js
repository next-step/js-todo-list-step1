import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { TodoFilter, FilterType } from './TodoFilter.js';

export default function TodoApp(storage) {
  this.storage = storage;
  this.todoItems = [];
  let id = 0;

  this.init = (savedData) => {
    this.todoItems = savedData ?? [];
    id = savedData.length ?? 0;

    savedData && this.setState(savedData);
  };

  this.setState = (updatedItems) => {
    todoList.setState(updatedItems);
    todoCount.setState(updatedItems);
  };

  const onAdd = (contents) => {
    const newTodoItem = new TodoItem(contents, ++id);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
    this.storage.saveItems(this.todoItems);
  };

  const onComplete = (id) => {
    this.todoItems = this.todoItems.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState(this.todoItems);
    this.storage.saveItems(this.todoItems);
  };

  const onDelete = (id) => {
    this.todoItems = this.todoItems.filter((item) => {
      return item.id !== id;
    });
    this.setState(this.todoItems);
    this.storage.saveItems(this.todoItems);
  };

  const onEdit = (id) => {
    this.todoItems = this.todoItems.map((item) => {
      if (item.id === id) {
        item.editing = !item.editing;
      }
      return item;
    });
    this.setState(this.todoItems);
    this.storage.saveItems(this.todoItems);
  };

  const onUpdate = (e, id) => {
    if (e.key === 'Enter') {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.contents = e.target.value;
          item.editing = false;
        }
        return item;
      });
      this.setState(this.todoItems);
      this.storage.saveItems(this.todoItems);
    }
    if (e.key === 'Escape') {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          item.editing = false;
        }
        return item;
      });
      this.setState(this.todoItems);
      this.storage.saveItems(this.todoItems);
    }
  };

  const onFilter = (type) => {
    if (type === FilterType.all) {
      this.setState(this.todoItems);
    } else if (type === FilterType.active) {
      const activeItems = this.todoItems.filter(
        (item) => item.completed === false
      );
      this.setState(activeItems);
    } else if (type === FilterType.completed) {
      const completedItems = this.todoItems.filter(
        (item) => item.completed === true
      );
      this.setState(completedItems);
    }
  };

  const todoInput = new TodoInput();
  todoInput.setEventListener(onAdd);

  const todoList = new TodoList();
  todoList.setEventListener(onComplete, onDelete, onEdit, onUpdate);

  const todoCount = new TodoCount();

  const todoFilter = new TodoFilter();
  todoFilter.setEventListener(onFilter);
}
