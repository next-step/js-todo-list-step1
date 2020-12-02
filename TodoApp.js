import { TodoList, TodoCount, TodoFilters } from './components/index.js';

// const dummy = [
//   { title: 'test1', isCompleted: true, editing: false },
//   { title: 'test2', isCompleted: false, editing: false },
//   { title: 'test3', isCompleted: true, editing: false },
// ];

export const TodoApp = () => {
  const todoList = document.getElementById('todo-list');
  const todoCount = document.querySelector('.todo-count');
  const filters = document.querySelector('.filters');
  const newTodoTitle = document.getElementById('new-todo-title');

  // let state = { count: 3, selectedFilter: 'all', todoItems: dummy };
  let state = JSON.parse(localStorage.getItem('state')) || {
    todoItems: [],
    selectedFilter: 'all',
    filteredTodoItems: [],
  };

  const setState = updatedStates => {
    state = updatedStates;
    localStorage.setItem('state', JSON.stringify(state));
    render();
    console.log(state);
  };

  const addTodo = title => {
    setState({
      ...state,
      todoItems: [
        ...state.todoItems,
        {
          id: new Date().getTime(),
          title,
          isCompleted: false,
          editing: false,
        },
      ],
    });

    setFilteredTodoItems();
  };

  const findIndexById = id => {
    for (const todoItem of state.todoItems) {
      if (todoItem.id === id) {
        return state.todoItems.indexOf(todoItem);
      }
    }
  };

  const toggleTodo = id => {
    const index = findIndexById(id);
    const targetTodo = state.todoItems[index];
    setState({
      ...state,
      todoItems: [
        ...state.todoItems.slice(0, index),
        { ...targetTodo, isCompleted: !targetTodo.isCompleted },
        ...state.todoItems.slice(index + 1),
      ],
    });

    setFilteredTodoItems();
  };

  const removeTodo = id => {
    const index = findIndexById(id);
    setState({
      ...state,
      todoItems: [
        ...state.todoItems.slice(0, index),
        ...state.todoItems.slice(index + 1),
      ],
    });

    setFilteredTodoItems();
  };

  const updateTodo = (id, value) => {
    const index = findIndexById(id);
    const targetTodo = state.todoItems[index];
    setState({
      ...state,
      todoItems: [
        ...state.todoItems.slice(0, index),
        { ...targetTodo, title: value, editing: !targetTodo.editing },
        ...state.todoItems.slice(index + 1),
      ],
    });

    setFilteredTodoItems();
  };

  const toggleEditTodo = id => {
    const index = findIndexById(id);
    const targetTodo = state.todoItems[index];
    setState({
      ...state,
      todoItems: [
        ...state.todoItems.slice(0, index),
        { ...targetTodo, editing: !targetTodo.editing },
        ...state.todoItems.slice(index + 1),
      ],
    });

    setFilteredTodoItems();
  };

  const setFilter = filter => {
    setState({
      ...state,
      selectedFilter: filter,
    });

    setFilteredTodoItems();
  };

  const setFilteredTodoItems = () => {
    const filteredTodoItems = state.todoItems.filter(todoItem => {
      if (state.selectedFilter === 'all') {
        return true;
      }

      if (state.selectedFilter === 'active') {
        return todoItem.isCompleted === false;
      }

      if (state.selectedFilter === 'completed') {
        return todoItem.isCompleted === true;
      }
    });

    setState({ ...state, filteredTodoItems });
  };

  const render = () => {
    renderTodoList();
    renderTodoCount();
    renderTodoFilters();
  };

  const renderTodoList = () => {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }

    todoList.append(
      ...state.filteredTodoItems.map(todoItem => TodoList({ ...todoItem }))
    );
  };

  const renderTodoCount = () => {
    while (todoCount.firstChild) {
      todoCount.removeChild(todoCount.firstChild);
    }

    todoCount.append(TodoCount({ count: state.filteredTodoItems.length }));
  };

  const renderTodoFilters = () => {
    while (filters.firstChild) {
      filters.removeChild(filters.firstChild);
    }

    filters.append(
      ...TodoFilters({
        handleClickFilter,
        selectedFilter: state.selectedFilter,
      })
    );
  };

  const handleKeydownNewTodoTitle = e => {
    const title = e.target.value;
    if (e.key === 'Enter' && title) {
      addTodo(title);
      e.target.value = '';
    }
  };

  const handleClickTodoList = e => {
    const input = e.target;
    const li = input.parentNode.parentNode;
    if (e.target.classList.contains('toggle')) {
      const id = Number(li.getAttribute('id'));
      toggleTodo(id);
      return;
    }

    if (e.target.tagName === 'BUTTON') {
      const id = Number(li.getAttribute('id'));
      removeTodo(id);
    }
  };

  const handleClickFilter = e => {
    const filter = e.target.classList[0];
    setFilter(filter);
  };

  const handleDblClickTodoList = e => {
    if (e.target.tagName === 'LABEL') {
      const label = e.target;
      const li = label.parentNode.parentNode;
      const id = Number(li.getAttribute('id'));
      toggleEditTodo(id);
    }
  };

  const handleKeydownTodoList = e => {
    const li = e.target.parentNode;
    const id = Number(li.getAttribute('id'));
    if (e.target.tagName === 'INPUT' && e.key === 'Escape') {
      toggleEditTodo(id);
      return;
    }

    if (e.target.tagName === 'INPUT' && e.key === 'Enter') {
      updateTodo(id, e.target.value);
    }
  };

  newTodoTitle.addEventListener('keydown', handleKeydownNewTodoTitle);
  todoList.addEventListener('click', handleClickTodoList);
  todoList.addEventListener('dblclick', handleDblClickTodoList);
  todoList.addEventListener('keydown', handleKeydownTodoList);

  render();
};
