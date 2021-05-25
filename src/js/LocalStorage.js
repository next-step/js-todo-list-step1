export default class LocalStorage {
  constructor() {
    this.todos = this.getTodos();
  }

  getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  setTodos(todos) {
    this.todos = todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo(title) {
    if (!title) {
      alert('할 일을 입력하세요!');
      return;
    }

    let id;
    if (this.todos.length > 0) {
      id = this.todos.reduce((prev, cur) => Math.max(cur.id), 0) + 1;
    } else {
      id = 0;
    }

    this.setTodos(
      this.todos.concat({
        id,
        title,
        isComplete: false,
      })
    );
  }

  toggleTodo(id) {
    this.setTodos(
      this.todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  }

  deleteTodo(id) {
    this.setTodos(this.todos.filter(todo => todo.id !== id));
  }

  editTodo(payload) {
    const { id, key, value } = payload;
    this.setTodos(
      this.todos.map(todo =>
        todo.id === id ? { ...todo, [key]: value } : todo
      )
    );
  }
}
