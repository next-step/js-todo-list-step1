import TodoInputView from '../views/TodoInputView.js';
import TodoListResultView from '../views/TodoListResultView.js';
import TodoCountView from '../views/TodoCountView.js';
import TodoFilterView from '../views/TodoFilterView.js';

import Todo from '../models/Todo.js';
import { FILTERS } from '../utils/constants.js';

export default class TodoApp {
  init() {
    this.todoList = new Todo();

    new TodoInputView()
      .setupInputSubmit()
      .on('submitInputTodo', (e) => this.onSubmitNewTodoHandler(e.detail));
    this.todoListResultView = new TodoListResultView()
      .setupRenderResult(this.todoList.getTodos())
      .on('changeTodoState', (e) => this.onChangeTodoStateHandler(e.detail))
      .on('removeTodoItem', (e) => this.onRemoveTodoItemHandler(e.detail))
      .on('editTodoItem', (e) => this.onEditTodoItemHandler(e.detail));
    this.todoCountView = new TodoCountView().setupTodoCount();
    this.todoFilterView = new TodoFilterView()
      .setupFilterTodo()
      .on('filterTodo', (e) => this.onChangeFilterHandler(e.detail));

    this.renderTodoList(this.todoList.getTodos());
  }

  renderTodoList(todoList) {
    this.todoListResultView.renderTodoList(todoList);
    this.todoCountView.getTodoCountHTML(todoList);
  }

  onSubmitNewTodoHandler(todoItem) {
    this.todoList.addTodoItem(todoItem);
    this.todoFilterView.addSelectedClass(FILTERS.ALL);
    this.renderTodoList(this.todoList.getTodos());
  }

  onChangeTodoStateHandler(todoItemId) {
    this.todoList.changeCompletedState(todoItemId);
    this.renderTodoList(this.todoList.getTodos());
  }

  onRemoveTodoItemHandler(todoItemId) {
    this.todoList.removeTodoItem(todoItemId);
    this.renderTodoList(this.todoList.getTodos());
  }

  onChangeFilterHandler(filter) {
    if (filter === FILTERS.ALL) {
      this.renderTodoList(this.todoList.getTodos());
    } else if (filter === FILTERS.ACTIVE) {
      this.renderTodoList(this.todoList.getActiveTodos());
    } else if (filter === FILTERS.COMPLETE) {
      this.renderTodoList(this.todoList.getCompletedTodos());
    }

    this.todoFilterView.addSelectedClass(filter);
  }

  onEditTodoItemHandler(todoItem) {
    this.todoList.editTodoItem(todoItem);
    this.renderTodoList(this.todoList.getTodos());
  }
}
