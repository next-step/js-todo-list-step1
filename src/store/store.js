import render from '../components/render.js';

const store = JSON.parse(localStorage.getItem('item')) || {
  todoItem: [],
  option: 'all',
};

export const getItemFilter = () => store.option;

export const getTodoItem = () => {
  const { todoItem, option } = store;
  return todoItem.filter((item) => {
    if (option === 'all') return true;
    if (option === 'active') return !item.completed;
    if (option === 'completed') return item.completed;
  });
};

export const toggleCheckItem = (event) => {
  const { todoItem, option } = store;
  if (event.target.className === 'toggle') {
    const parentNode = event.target.closest('li');
    const index = parentNode.getAttribute('data-index');
    const newTodoItem = [...todoItem];
    newTodoItem[index] = {
      ...newTodoItem[index],
      completed: !newTodoItem[index].completed,
    };
    setStore({ todoItem: newTodoItem });
  }
};

export const addTodoItem = (contents) => {
  const { todoItem, option } = store;
  const newTodoItem = [
    ...todoItem,
    { contents, completed: false, editing: false },
  ];
  console.log(newTodoItem);
  setStore({ todoItem: newTodoItem });
};

export const deleteItem = (event) => {
  const { todoItem, option } = store;
  const parentNode = event.target.closest('li');
  const index = parentNode.getAttribute('data-index');
  const newTodoItem = [...todoItem];
  if (event.target.tagName === 'BUTTON') {
    newTodoItem.splice(index, 1);
    setStore({ todoItem: newTodoItem });
  }
};

export const doubleClickItem = (event) => {
  const { todoItem, option } = store;
  if (event.target.className === 'label') {
    const parentNode = event.target.closest('li');
    const index = parentNode.getAttribute('data-index');
    const newTodoItem = [...todoItem];
    newTodoItem[index] = {
      ...newTodoItem[index],
      editing: !newTodoItem[index].editing,
    };
    setStore({ todoItem: newTodoItem });
  }
};

export const modifyItem = (event) => {
  const { todoItem, option } = store;
  const parentNode = event.target.closest('li');
  const index = parentNode.getAttribute('data-index');
  const newTodoItem = [...todoItem];
  if (event.key === 'Escape' || event.key === 'Enter') {
    newTodoItem[index] = {
      ...newTodoItem[index],
      editing: !newTodoItem[index].editing,
    };
  }
  if (newTodoItem[index].editing) {
    newTodoItem[index] = {
      ...newTodoItem[index],
      contents: event.target.value,
    };
  }

  setStore({ todoItem: newTodoItem });
};

export const filterItem = (event) => {
  event.preventDefault();
  const option = event.target.className.replace(' selected', '');
  setStore({ option });
};

const setStore = (todoItem) => {
  for (let key in todoItem) {
    store[key] = todoItem[key];
  }
  console.log(todoItem);
  localStorage.setItem('item', JSON.stringify(store));
  render({ todoItem: getTodoItem(), option: getItemFilter() });
};
