import TodoCount from './TodoCount.js';
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilters.js"
import { setStorage, getStorage } from '../utils/storage.js';

function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
  this.editing = false;
}

function TodoApp() {
  this.todoItems = [];

  const todoList = new TodoList({
    onToggle: (id) => {
      const toggleItem = this.todoItems.find((item) => item.id === id);
      toggleItem.completed = !toggleItem.completed;
      this.setState(this.todoItems);
      setStorage('items', this.todoItems);
    },
    onDelete: (id) => {
      const deletedItemIndex = this.todoItems.findIndex((item) => item.id === id);
      this.todoItems.splice(deletedItemIndex, 1);
      this.setState(this.todoItems);
      setStorage('items', this.todoItems);
    },
    onEdit: (id) => {
      const editItem = this.todoItems.find((item) => item.id === id);
      editItem.editing = !editItem.editing;
      this.setState(this.todoItems);
    },
    onEndEdit: (contents, id) => {
      const editItem = this.todoItems.find((item) => item.id === id);
      editItem.todo = contents;
      editItem.editing = !editItem.editing;
      this.setState(this.todoItems);
      setStorage('items', this.todoItems);
    }
  });

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
    this.showCount(this.todoItems.length);
  };

  new TodoInput({
    onAdd: (contents) => {
      if (!contents) return;
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      setStorage('items', this.todoItems);
    }  
  });

  const todoCount = new TodoCount();
  this.showCount = (countTodoItem) => {
    todoCount.showCount(countTodoItem)
  };  

  new TodoFilter({
    onAllSelected: () => {
      const allTodoItems = this.todoItems;
      this.setState(allTodoItems);
    },
    onCompleted: () => {
      const completedTodoItems = this.todoItems.filter(item => item.completed)
      todoCount.showCount(completedTodoItems.length);
      todoList.setState(completedTodoItems);
    },
    onActive: () => {
      const activeTodoItems = this.todoItems.filter((item) => !item.completed);
      todoCount.showCount(activeTodoItems.length);
      todoList.setState(activeTodoItems);
    }
  });

}

new TodoApp().setState(getStorage());