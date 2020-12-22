import TodoInputView from '../views/TodoInputView.js';
import TodoListResultView from '../views/TodoListResultView.js';
import TodoCountView from '../views/TodoCountView.js';

import Todo from '../models/Todo.js';

const tag = `[todoApp]`;
export default class TodoApp {
  init() {
    console.log(`${tag} init()`);
    this.todoList = new Todo();

    new TodoInputView()
      .setupInputSubmit()
      .on('submitInputTodo', (e) => this.onSubmitNewTodoHandler(e.detail));

    this.todoListResultView = new TodoListResultView()
      .setupRenderResult(this.todoList.getTodos())
      .on('changeTodoState', (e) => this.onChangeTodoStateHandler(e.detail))
      .on('removeTodoItem', (e) => this.onRemoveTodoStateHandler(e.detail));

    this.todoCountView = new TodoCountView().setupTodoCount();
    this.renderTodoList(this.todoList);
  }

  onSubmitNewTodoHandler(todoItem) {
    console.log(`${tag} onSubmitNewTodoHandler()`);
    this.todoList.addTodoItem(todoItem);
    this.renderTodoList(this.todoList);
  }

  renderTodoList(todoList) {
    this.todoListResultView.renderTodoList(this.todoList.getTodos());
    this.todoCountView.getTodoCountHTML(todoList);
  }

  onChangeTodoStateHandler(todoItemId) {
    console.log(`${tag} onChangeTodoStateHandler()`);
    this.todoList.changeCompletedState(todoItemId);
    this.renderTodoList(this.todoList);
  }

  onRemoveTodoStateHandler(todoItemId) {
    console.log(`${tag} onRemoveTodoStateHandler()`);
    this.todoList.removeTodoItem(todoItemId);
    this.renderTodoList(this.todoList);
  }
}
