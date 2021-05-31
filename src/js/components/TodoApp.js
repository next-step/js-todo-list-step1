import TodoCount from './TodoCount.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoFilter from './TodoFilters.js'
import { setTodoData, getTodoData } from '../utils/storage.js';
import TodoItem from './TodoItem.js';

export default function TodoApp() {
  this.todoItems = getTodoData() ?? [];

  this.setState = (updatedItems) => {
    todoCount.showCount(updatedItems.length);
    todoList.setState(updatedItems);
  };

  const todoCount = new TodoCount();

  const todoList = new TodoList({
    onToggle: (id) => {
      const toggleItem = this.todoItems.find((item) => item.id === id);
      toggleItem.completed = !toggleItem.completed;
      this.setState(this.todoItems);
      setTodoData('items', this.todoItems);
    },
    onDelete: (id) => {
      const deletedItemIndex = this.todoItems.findIndex((item) => item.id === id);
      this.todoItems.splice(deletedItemIndex, 1);
      this.setState(this.todoItems);
      setTodoData('items', this.todoItems);
    },
    onEdit: (contents, id) => {
      const editItem = this.todoItems.find((item) => item.id === id);
      editItem.todo = contents;
      this.setState(this.todoItems);
    }
  });

  const todoInput = new TodoInput({
    onAdd: (contents) => {
      if (!contents) return;
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      setTodoData('items', this.todoItems);
    }  
  });

  const todoFilter = new TodoFilter({
    onAllSelected: () => {
      const allTodoItems = this.todoItems;
      this.setState(allTodoItems);
    },
    onCompleted: () => {
      const completedTodoItems = this.todoItems.filter(item => item.completed)
      this.setState(completedTodoItems);
    },
    onActive: () => {
      const activeTodoItems = this.todoItems.filter((item) => !item.completed);
      this.setState(activeTodoItems);
    }
  });

  this.setState(this.todoItems);
}
