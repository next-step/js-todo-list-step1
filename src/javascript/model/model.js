export default class Model {
  constructor(storages) {
    this.stroages = storages;
  }

  async create(value, userName) {
    if (value.length === 0) {
      throw new RangeError('value is empty!!');
    }
    const storage = this.stroages[userName];
    return storage.save({
      content: value,
      completed: false,
    });
  }

  getTodosOf(userName) {
    const storage = this.stroages[userName];
    return storage.getTodos();
  }

  async remove(todoId, userName) {
    const storage = this.stroages[userName];
    return storage.remove(todoId);
  }

  async changeStatus(todoId, userName) {
    const storage = this.stroages[userName];
    return storage.updateStatus(todoId);
  }

  async updateContent(todoId, content, userName) {
    const storage = this.stroages[userName];
    return storage.updateContent(todoId, content);
  }
}
