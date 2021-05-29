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

export const toggleCheckItem = (event) => {
  const { todoItem, option } = store;
  if (event.target.tagName === 'INPUT') {
    const parentNode = event.target.closest('li');
    const index = parentNode.getAttribute('data-index');
    const newTodoItem = [...todoItem];
    console.log(event.target.tagName);
    newTodoItem[index] = {
      ...newTodoItem[index],
      completed: !newTodoItem[index].completed,
    };
    setStore({ todoItem: newTodoItem });
  }
};

export const addTodoItem = (contents) => {
  const { todoItem, option } = store;
  const newTodoItem = [...todoItem, { contents, completed: false }];
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

const setStore = (todoItem) => {
  for (let key in todoItem) {
    store[key] = todoItem[key];
  }
  localStorage.setItem('item', JSON.stringify(store));
  render({ todoItem: getTodoItem(), option: getItemFilter() });
};
