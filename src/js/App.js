import TodoList from './components/TodoList.js';

const todoListUl = document.getElementById('todo-list');
const todoTitle = document.getElementById('new-todo-title');
const todoCount = document.querySelector('.todo-count strong');
const todoFilterButton = document.querySelectorAll('.filters li a');
const todoLocalData = localStorage.getItem('item');
const todoData = todoLocalData ? JSON.parse(todoLocalData) : [];
const todoList = new TodoList({
  todoListUl,
  todoCount,
  todoData,
});

todoTitle.onkeydown = (e) => {
  if (e.keyCode === 13) {
    const title = e.target.value.trim();

    if (title.length > 0) {
      todoData.push({ completed: false, title });
      localStorage.setItem('item', JSON.stringify(todoData));
      todoList.setState(todoData);
    }
    e.target.value = '';
  }
};

todoFilterButton.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    todoFilterButton.forEach((button) => button.classList.remove('selected'));
    const filterData = todoData.filter((data) =>
      el.classList.contains('all')
        ? data
        : el.classList.contains('completed')
        ? data.completed
        : !data.completed
    );
    todoList.setState(filterData);
    el.classList.add('selected');
  });
});
