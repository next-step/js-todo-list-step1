import TodoInputView from '../views/TodoInputView.js';

import Todo from '../models/Todo.js';
import TodoListResultView from '../views/TodoListResultView.js';

const tag = `[todoApp]`;
export default class TodoApp {
  init() {
    console.log(`${tag} init()`);
    this.todoList = new Todo();

    new TodoInputView()
      .setupInputSubmit()
      .on('submitInputTodo', (e) => this.onSubmitNewTodoHandler(e.detail));

    this.todoListResultView = new TodoListResultView().setupRenderResult(this.todoList.getTodos());
  }

  onSubmitNewTodoHandler(todoItem) {
    console.log(`${tag} onSubmitNewTodoHandler()`);
    this.todoList.addTodoItem(todoItem);
    this.renderTodoList();
  }

  renderTodoList() {
    this.todoListResultView.renderTodoList(this.todoList.getTodos());
  }
}
