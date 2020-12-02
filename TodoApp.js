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
  let state = { count: 0, selectedFilter: 'all', todoItems: [] };

  const setState = updatedStates => {
    state = updatedStates;
    render();
    console.log(state);
  };

  const addTodo = title => {
    setState({
      ...state,
      count: state.count + 1,
      todoItems: [
        ...state.todoItems,
        { title, isCompleted: false, editing: false },
      ],
    });
  };

  const toggleTodo = key => {
    setState({
      ...state,
      todoItems: state.todoItems.map((todoItem, idx) => {
        if (idx === key) {
          todoItem.isCompleted = !todoItem.isCompleted;
        }
        return todoItem;
      }),
    });
  };

  const removeTodo = key => {
    setState({
      ...state,
      count: state.count - 1,
      todoItems: state.todoItems.filter((todoItem, idx) => idx !== key),
    });
  };

  const updateTodo = (key, value) => {
    setState({
      ...state,
      todoItems: state.todoItems.map((todoItem, idx) => {
        if (idx === key) {
          todoItem.title = value;
          todoItem.editing = false;
        }
        return todoItem;
      }),
    });
  };

  const toggleEditTodo = key => {
    setState({
      ...state,
      todoItems: state.todoItems.map((todoItem, idx) => {
        if (idx === key) {
          todoItem.editing = !todoItem.editing;
        }
        return todoItem;
      }),
    });
  };

  const setFilter = filter => {
    setState({
      ...state,
      selectedFilter: filter,
    });
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

    todoList.append(
      ...filteredTodoItems.map((todoItem, idx) =>
        TodoList({ ...todoItem, idx })
      )
    );
  };

  const renderTodoCount = () => {
    while (todoCount.firstChild) {
      todoCount.removeChild(todoCount.firstChild);
    }

    todoCount.append(TodoCount({ count: state.count }));
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

  const handleKeyDownNewTodoTitle = e => {
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
      const key = Number(li.getAttribute('key'));
      toggleTodo(key);
      return;
    }

    if (e.target.tagName === 'BUTTON') {
      const key = Number(li.getAttribute('key'));
      removeTodo(key);
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
      const key = Number(li.getAttribute('key'));
      toggleEditTodo(key);
    }
  };

  const handleKeydownTodoList = e => {
    const li = e.target.parentNode;
    const key = Number(li.getAttribute('key'));
    if (e.target.tagName === 'INPUT' && e.key === 'Escape') {
      toggleEditTodo(key);
      return;
    }

    if (e.target.tagName === 'INPUT' && e.key === 'Enter') {
      updateTodo(key, e.target.value);
    }
  };

  newTodoTitle.addEventListener('keydown', handleKeyDownNewTodoTitle);
  todoList.addEventListener('click', handleClickTodoList);
  todoList.addEventListener('dblclick', handleDblClickTodoList);
  todoList.addEventListener('keydown', handleKeydownTodoList);

  render();
};
