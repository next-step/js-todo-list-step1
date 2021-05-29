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
  });
};

export const addTodoItem = (contents) => {
  const { todoItem, option } = store;
  const newTodoItem = [...todoItem, { contents }];
  setStore({ todoItem: newTodoItem });
};

const setStore = (todoItem) => {
  for (let key in todoItem) {
    store[key] = todoItem[key];
  }
  localStorage.setItem('item', JSON.stringify(store));
  render({ todoItem: getTodoItem(), option: getItemFilter() });
};
