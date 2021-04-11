import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import TodoStore from './TodoStore.js';

function TodoItem(todoText) {
  this.id = Date.now().toString();
  this.todo = todoText;
  this.completed = false;
}

function TodoApp() {
  this.todoItems = TodoStore.getStore() || [];
  this.filter = 'all';

  this.setFilter = (selectedFilter) => {
    this.filter = selectedFilter;
    todoFilter.render(this.filter);

    this.setState(this.todoItems);
  };

  this.setState = (updatedItems) => {
    TodoStore.setStore(updatedItems);
    this.todoItems = updatedItems;

    if (this.filter === 'active') {
      return render(this.todoItems.filter((item) => item.completed === false));
    }
    if (this.filter === 'completed') {
      return render(this.todoItems.filter((item) => item.completed === true));
    }
    return render(this.todoItems);
  };

  const render = (updatedItems) => {
    todoList.render(updatedItems);
    todoCount.render(updatedItems.length);
  };

  const handleAdd = (contents) => {
    const newTodoItem = new TodoItem(contents);
    this.setState([...this.todoItems, newTodoItem]);
  };

  const handleToggle = (id) => {
    const toggledItem = this.todoItems.find((item) => item.id === id);
    toggledItem.completed = !toggledItem.completed;
    this.setState(this.todoItems);
  };

  const handleDelete = (id) => {
    this.setState(this.todoItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id, todo) => {
    const editItem = this.todoItems.find((item) => item.id === id);
    editItem.todo = todo;
    this.setState(this.todoItems);
  };

  const handleChangeFilter = (selectedFilter) => {
    this.setFilter(selectedFilter);
  };

  TodoInput({ onAdd: handleAdd });

  const todoList = new TodoList({
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  const todoCount = new TodoCount();

  const todoFilter = new TodoFilter({ onChangeFilter: handleChangeFilter });

  const init = () =>
    this.setFilter(
      window.location.hash.length > 0 ? window.location.hash.slice(1) : 'all'
    );

  init();
}

export default TodoApp;
