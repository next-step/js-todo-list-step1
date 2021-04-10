export default class Model {
  constructor(storages) {
    this._storages = storages;
    this.todos = {};
    for (let userName in storages) {
      this.todos[userName] = storages[userName].todos;
    }
  }

  async create(value, userName) {
    if (value.length === 0) {
      throw new RangeError('value is empty!!');
    }
    this._setCurrentStorage(userName);
    this.todos[userName].push(
      this._currentStorage.new({
        content: value,
        completed: false,
      })
    );
    this._currentStorage.save(this.todos[userName]);
    return this.todos[userName][this.todos[userName].length - 1];
  }

  async remove(todoId, userName) {
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      return;
    }
    targetTodo.removed = true;
    this._currentStorage.save(this.todos[userName]);
    return targetTodo;
  }

  async updateStatus(todoId, userName) {
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      return;
    }
    targetTodo.completed = !targetTodo.completed;
    this._currentStorage.save(this.todos[userName]);
    return targetTodo;
  }

  async updateContent(todoId, content, userName) {
    this._setCurrentStorage(userName);
    const targetTodo = this._findTodoById(todoId, userName);
    if (!targetTodo) {
      return;
    }
    if (content.length === 0) {
      throw targetTodo;
    }
    targetTodo.content = content;
    this._currentStorage.save(this.todos[userName]);
    return targetTodo;
  }

  getTodosOf(userName) {
    return this.todos[userName].filter((todo) => !todo.removed);
  }

  _setCurrentStorage(userName) {
    this._currentStorage = this._storages[userName];
  }

  _findTodoById(id, userName) {
    return this.todos[userName].find((todo) => todo.id === id);
  }
}
