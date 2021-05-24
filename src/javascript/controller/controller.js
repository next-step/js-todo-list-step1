import { EVENT_NAME, RENDER_COMMAND } from '../utils/constants.js';
export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.setEventListeners();
  }

  add(value) {
    this.model
      .create(value, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.ADD,
          todo: todo,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  refreshPage() {
    const todos = this.model.getTodosOf(this.view.getCurrentUser());
    this.view.render({
      cmd: RENDER_COMMAND.REFRESH,
      todos: todos,
    });
  }

  remove(todoId) {
    this.model
      .remove(todoId, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.REMOVE,
          todo: todo,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  toggleComplete(todoId) {
    this.model
      .updateStatus(todoId, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.TOGGLE,
          todo: todo,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  edit(todo) {
    this.view.render({
      cmd: RENDER_COMMAND.EDIT_START,
      todo: todo,
    });
  }

  editApply(todoId, content) {
    this.model
      .updateContent(todoId, content, this.view.getCurrentUser())
      .then((todo) => {
        this.view.render({
          cmd: RENDER_COMMAND.EDIT_APPLY,
          todo: todo,
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error);
        } else {
          this.view.render({
            cmd: RENDER_COMMAND.EDIT_END,
            todo: error,
          });
        }
      });
  }

  editEnd(todo) {
    this.view.render({
      cmd: RENDER_COMMAND.EDIT_END,
      todo: todo,
    });
  }

  showAll() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_ALL,
    });
  }

  showActive() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_ACTIVE,
    });
  }

  showCompleted() {
    this.view.render({
      cmd: RENDER_COMMAND.SHOW_COMPLETED,
    });
  }

  setEventListeners() {
    this.view.setEventListener(EVENT_NAME.ADD, (value) => {
      this.add(value);
    });
    this.view.setEventListener(EVENT_NAME.REFRESH, () => {
      this.refreshPage();
    });
    this.view.setEventListener(EVENT_NAME.DESTROY, (todoId) => {
      this.remove(todoId);
    });
    this.view.setEventListener(EVENT_NAME.TOGGLE, (todoId) => {
      this.toggleComplete(todoId);
    });
    this.view.setEventListener(EVENT_NAME.SELECT_ALL, () => {
      this.showAll();
    });
    this.view.setEventListener(EVENT_NAME.SELECT_ACTIVE, () => {
      this.showActive();
    });
    this.view.setEventListener(EVENT_NAME.SELECT_COMPLETED, () => {
      this.showCompleted();
    });
    this.view.setEventListener(EVENT_NAME.EDIT, (todo) => {
      this.edit(todo);
    });
    this.view.setEventListener(EVENT_NAME.EDIT_END, (todo) => {
      this.editEnd(todo);
    });
    this.view.setEventListener(EVENT_NAME.EDIT_APPLY, (todoId, content) => {
      this.editApply(todoId, content);
    });
  }
}
