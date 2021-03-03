import { generateKey } from './util.js';
import { todoInput } from './todoInput.js';

const $ulist = document.getElementById('todo-list');

const todoApp = (todoList, todoStatus) => {
  let _todoItems = new Map();

  const filterStatusPredicate = {
    all: () => true,
    completed: ({ status }) => status === 'completed',
    active: ({ status }) => status === '',
  };

  const _createTodoItem = (content, status) => {
    const todoItem = {
      index: generateKey(),
      content,
      status,
    };
    return todoItem;
  };

  const addTodoItem = (content, status = '') => {
    const todoItem = _createTodoItem(content, status);
    _todoItems.set(todoItem.index, todoItem);

    todoListHandler.addItem(todoItem);
    todoStatusHandler.updateCount(_todoItems.size);
  };

  const removeTodoItem = ({ index }) => {
    _todoItems.delete(index);
    todoStatusHandler.updateCount();
  };

  const updateTodoItem = ({ index, content, status }) => {
    const todoItem = _todoItems.get(index);
    todoItem.content = content;
    todoItem.status = status ?? '';

    _todoItems.set(todoItem.index, todoItem);
  };

  const setFilter = (filterType) => {
    const filteredItems = Array.from(_todoItems.values()).filter(
      filterStatusPredicate[filterType]
    );

    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList($ulist, updateTodoItem, removeTodoItem);
  const todoStatusHandler = todoStatus($ulist, setFilter);

  const init = () => {
    todoListHandler.refresh(Array.from(_todoItems.values));
    todoInputHandler.focus();
  };

  return {
    init,
  };
};

export { todoApp };
