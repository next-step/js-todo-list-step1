import TodoInputView from '../views/TodoInputView.js';
import TodoListResultView from '../views/TodoListResultView.js';
import TodoCountView from '../views/TodoCountView.js';
import TodoFilterView from '../views/TodoFilterView.js';

import Todo from '../models/Todo.js';
import { FILTERS } from '../utils/constants.js';

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

    this.todoFilterView = new TodoFilterView()
      .setupFilterTodo()
      .on('filterTodo', (e) => this.onChangeFilterHandler(e.detail));

    this.renderTodoList(this.todoList.getTodos());
  }

  onSubmitNewTodoHandler(todoItem) {
    console.log(`${tag} onSubmitNewTodoHandler()`);
    this.todoList.addTodoItem(todoItem);
    this.renderTodoList(this.todoList.getTodos());
  }

  renderTodoList(todoList) {
    this.todoListResultView.renderTodoList(todoList);
    this.todoCountView.getTodoCountHTML(todoList);
  }

  onChangeTodoStateHandler(todoItemId) {
    console.log(`${tag} onChangeTodoStateHandler()`);
    this.todoList.changeCompletedState(todoItemId);
    this.renderTodoList(this.todoList.getTodos());
  }

  onRemoveTodoStateHandler(todoItemId) {
    console.log(`${tag} onRemoveTodoStateHandler()`);
    this.todoList.removeTodoItem(todoItemId);
    this.renderTodoList(this.todoList.getTodos());
  }

  onChangeFilterHandler(filter) {
    console.log(`${tag} onChangeFilterHandler()`);
    if (filter === FILTERS.ALL) {
      this.renderTodoList(this.todoList.getTodos());
    } else if (filter === FILTERS.ACTIVE) {
      this.renderTodoList(this.todoList.getActiveTodos());
    } else if (filter === FILTERS.COMPLETE) {
      this.renderTodoList(this.todoList.getCompletedTodos());
    }

    this.todoFilterView.addSelectedClass(filter);
  }
}
