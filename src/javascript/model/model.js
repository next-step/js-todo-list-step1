import { ERROR_MESSAGE } from '../utils/constants.js';
import { hasKey } from '../utils/utils.js';
export default class Model {
  constructor(storages) {
    this._storages = storages;
    this._todos = {};
    for (let userName in storages) {
      this._todos[userName] = storages[userName].todos;
    }
  }

  async create(value, userName) {
    if (!value.length) {
      throw new Error(ERROR_MESSAGE.CONTENT_EMPTY);
    }
    this._setCurrentStorage(userName);
    this._todos[userName].push(
      this._currentStorage.new({
        content: value,
        completed: false,
      })
    );
    this._currentStorage.save(this._todos[userName]);
    return this._todos[userName][this._todos[userName].length - 1];
  }

  async remove(todoId, userName) {
    return this._update({
      todoId,
      userName,
      cmd: 'remove',
    });
  }

  async updateStatus(todoId, userName) {
    return this._update({
      todoId,
      userName,
      cmd: 'updateStatus',
    });
  }

  async updateContent(todoId, content, userName) {
    return this._update({
      todoId,
      userName,
      content,
      cmd: 'updateContent',
    });
  }

  getTodosOf(userName) {
    return this._todos[userName].filter((todo) => !todo.removed);
  }

  _setCurrentStorage(userName) {
    this._currentStorage = this._storages[userName];
  }

  _findTodoById(id, userName) {
    return this._todos[userName].find((todo) => todo.id === id);
  }

  _update(params) {
    const targetTodo = this._findTodoById(params.todoId, params.userName);
    if (!targetTodo) {
      throw new Error(ERROR_MESSAGE.UNEXPECTED);
    }
    if (hasKey(params, 'content') && !params.content) {
      throw targetTodo;
    }
    const obj = {
      remove: () => (targetTodo.removed = true),
      updateStatus: () => (targetTodo.completed = !targetTodo.completed),
      updateContent: () => (targetTodo.content = params.content),
    };
    obj[params.cmd]();
    this._setCurrentStorage(params.userName);
    this._currentStorage.save(this._todos[params.userName]);
    return targetTodo;
  }
}
