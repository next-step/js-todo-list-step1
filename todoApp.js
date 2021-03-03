import { generateKey } from './util.js';
import { todoInput } from './todoInput.js';
import { todoList } from './todoList.js';
import { todoStatus } from './todoStatus.js';

// const { setItem, getItem } = storage();

// const STORAGE_KEY = "todoList";

const todoApp = () => {
  let todoItems = new Map();
  let todoListHandler;
  let todoStatusHandler;
  let currentFilter;

  const createTodoItem = (content, status) => {
    const todoItem = {
      index: generateKey(),
      content,
      status,
    };
    return todoItem;
  };

  const filterStatusMapper = {
    all: null,
    completed: 'completed',
    active: '',
  };

  const addTodoItem = (content, status = '') => {
    const todoItem = createTodoItem(content, status);
    todoItems.set(todoItem.index, todoItem);

    todoListHandler.addItem(todoItem);
    todoStatusHandler.updateCount(todoItems.size);
    // setItem(STORAGE_KEY, convertMapToArray(todoItems));
  };

  const removeTodoItem = ({ index }) => {
    todoItems.delete(index);
    currentFilter ??
      todoStatusHandler.updateCount(
        Array.from(todoItems.values()).filter(
          (todoItem) => todoItem.status === filterStatusMapper[currentFilter]
        ).length
      );
    // setItem(STORAGE_KEY, convertMapToArray(todoItems));
  };

  const updateTodoItem = ({ index, content, status }) => {
    const todoItem = todoItems.get(index);
    content && (todoItem.content = content); //TODO
    todoItem.status = status ?? '';

    todoItems.set(todoItem.index, todoItem);
  };

  const setFilter = (filterType) => {
    const status = filterStatusMapper[filterType];
    if (status === null) {
      todoListHandler.refresh(Array.from(todoItems.values()));
      todoStatusHandler.updateCount(todoItems.size);
      return;
    }
    const filteredItems = Array.from(todoItems.values()).filter(
      (todoItem) => todoItem.status === status
    );
    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const init = () => {
    todoInput(addTodoItem);
    todoListHandler = todoList(updateTodoItem, removeTodoItem);
    todoStatusHandler = todoStatus(setFilter);
    todoListHandler.refresh(todoItems);
  };

  return {
    init,
  };
};

// const convertMapToArray = (todoItems) => {
//   return Object.entries(todoItems).reduce(
//     (array, todo) => array.push(todo),
//     []
//   );
// };

export { todoApp };
