export default class Model {
  constructor(storages) {
    this._storages = storages;
    this._todos = {};
    for (let userName in storages) {
      this._todos[userName] = storages[userName].todos;
    }
  }

  async create(value, userName) {
    if (value.length === 0) {
      throw new Error('입력칸이 비어있습니다.');
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
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      throw new Error('예상치 못한 문제가 발생했습니다. 새로고침을 해주세요.');
    }
    targetTodo.removed = true;
    this._currentStorage.save(this._todos[userName]);
    return targetTodo;
  }

  async updateStatus(todoId, userName) {
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      throw new Error('예상치 못한 문제가 발생했습니다. 새로고침을 해주세요.');
    }
    targetTodo.completed = !targetTodo.completed;
    this._currentStorage.save(this._todos[userName]);
    return targetTodo;
  }

  async updateContent(todoId, content, userName) {
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      throw new Error('예상치 못한 문제가 발생했습니다. 새로고침을 해주세요.');
    }
    if (content.length === 0) {
      throw targetTodo;
    }
    targetTodo.content = content;
    this._currentStorage.save(this._todos[userName]);
    return targetTodo;
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
}
