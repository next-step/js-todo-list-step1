export default class Model {
  constructor(storages) {
    // NOTE: this.storages 는 실제 DB
    // NOTE: this.todos 는 Model 에서 관리하는 데이터.
    // NOTE: 앞으로 이 데이터에 변화가 생기면 그 변화를 storages 에 저장하고,
    // NOTE: 뷰를 변화시키는 로직을 실행하면 된다.
    // NOTE: 그리고 이전에는 storages 에서 모든 로직을 다 수행하고 있었는데
    // NOTE: 그 로직 전부를 여기에서 실행하고 db는 정말 데이터를 저장하는 용도로만 사용하자.
    this.storages = storages;
    this.currentStorage;
    this.todos = {};
    for (let userName in storages) {
      this.todos[userName] = storages[userName].todos;
    }
  }

  _getStorageOf(userName) {
    return this.storages[userName];
  }

  async create(value, userName) {
    if (value.length === 0) {
      throw new RangeError('value is empty!!');
    }
    const storage = this._getStorageOf(userName);
    this.todos[userName].push(
      storage.new({
        content: value,
        completed: false,
      })
    );
    storage.save(this.todos[userName]);
    return this.todos[userName][this.todos[userName].length - 1];
  }

  async remove(todoId, userName) {
    const storage = this._getStorageOf(userName);
    const targetTodo = this.todos[userName].find((todo) => todo.id === todoId);
    if (!targetTodo) {
      return;
    }
    targetTodo.removed = true;
    storage.save(this.todos[userName]);
    return targetTodo;
  }

  async updateStatus(todoId, userName) {
    const storage = this._getStorageOf(userName);
    const targetTodo = this.todos[userName].find((todo) => todo.id === todoId);
    if (!targetTodo) {
      return;
    }
    targetTodo.completed = !targetTodo.completed;
    storage.save(this.todos[userName]);
    return targetTodo;
  }

  async updateContent(todoId, content, userName) {
    const storage = this._getStorageOf(userName);
    const targetTodo = this.todos[userName].find((todo) => todo.id === todoId);
    if (!targetTodo) {
      return;
    }
    if (content.length === 0) {
      throw targetTodo;
    }
    targetTodo.content = content;
    storage.save(this.todos[userName]);
    return targetTodo;
  }

  getTodosOf(userName) {
    return this.todos[userName].filter((todo) => !todo.removed);
  }
}
