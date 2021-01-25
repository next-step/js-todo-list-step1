/**
 * @namespace
 */
class LocalStorage {
  static fetchTodos() {
    return JSON.parse(localStorage.getItem(`todos`));
  }
  static setTodos(todos) {
    return localStorage.setItem(`todos`, JSON.stringify(todos));
  }
  static clearTodos() {
    return localStorage.removeItem(`todos`);
  }
}

export default LocalStorage;
