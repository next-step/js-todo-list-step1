import { filters } from './todoStatus.js';
import { generateKey } from './util.js';

const $ulist = document.getElementById('todo-list');

const todoApp = (todoInput, todoList, todoStatus) => {
  let _todoItems = new Map();
  let _currentFilter = 'all';

  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
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
    _setState();
  };

  const removeTodoItem = ({ index }) => {
    _todoItems.delete(index);
    _setState();
  };

  const updateTodoItem = ({ index, content, status }) => {
    const todoItem = _todoItems.get(index);
    todoItem.content = content;
    todoItem.status = status ?? '';

    _todoItems.set(todoItem.index, todoItem);
    _setState();
  };

  const setFilter = (filterType) => {
    _currentFilter = filterType;
    _setState();
  };

  const _setState = () => {
    const filteredItems = Array.from(_todoItems.values()).filter(
      _filterStatusPredicate[_currentFilter]
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
