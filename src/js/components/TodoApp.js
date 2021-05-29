import TodoCount from './TodoCount.js';
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
  this.editing = false;
}


function TodoApp() {
  this.todoItems= [];

  const todoList = new TodoList({
    onToggle: (id) => {
      const toggleItem = this.todoItems.find((item) => item.id === id);
      toggleItem.completed = !toggleItem.completed;
      this.setState(this.todoItems);
    },
    onDelete: (id) => {
      const deletedItemIndex = this.todoItems.findIndex((item) => item.id === id);
      this.todoItems.splice(deletedItemIndex, 1);
      this.setState(this.todoItems);
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
    }  
  });

  const todoCount = new TodoCount();
  this.showCount = (countTodoItem) => {
    todoCount.showCount(countTodoItem)
  };  

  const todoFilter = new TodoFilter({
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

function TodoFilter({onAllSelected, onCompleted, onActive}) {
  const $todoFilter = document.querySelector('.filters');

  const showAll = (event) => {
    if (!event.target.classList.contains('all')) return;
    onAllSelected();
  }
  const showCompleted = (event) => {
    if (!event.target.matches('.completed')) return;
    onCompleted();
  }
  
  const showActive =(event) => {
    if (!event.target.matches('.active')) return;
    onActive();
  }

  $todoFilter.addEventListener('click', event => showCompleted(event));
  $todoFilter.addEventListener('click', event => showActive(event));
  $todoFilter.addEventListener('click', event => showAll(event));
  
}

new TodoApp();