export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.setEventListeners();
  }

  add(value) {
    this.model
      .create(value, this.view.currentUser)
      .then((todo) => {
        this.view.renderTodo(todo);
        this.view.clearInput();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  refreshPage() {
    const todos = this.model.getTodosOf(this.view.currentUser);
    this.view.renderAllTodo(todos);
  }

  destroy(todoId) {
    this.model
      .remove(todoId, this.view.currentUser)
      .then((todo) => {
        this.view.removeTodoFromList(todo);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  toggleCheckBox(todoId) {
    this.model
      .updateStatus(todoId, this.view.currentUser)
      .then((todo) => {
        this.view.renderAgain(todo);
      })
      .catch((error) => {
        console.log(error.meesage);
      });
  }

  edit(todo) {
    this.view.editMode(todo);
  }

  editApply(todoId, content) {
    this.model
      .updateContent(todoId, content, this.view.currentUser)
      .then((todo) => {
        this.view.renderAgain(todo);
      })
      .catch((todo) => {
        this.view.editEnd(todo);
      });
  }

  editEnd(todo) {
    this.view.editEnd(todo);
  }

  showAll() {
    this.view.filterAll();
  }

  showActive() {
    this.view.filterActive();
  }

  showCompleted() {
    this.view.filterCompleted();
  }

  setEventListeners() {
    this.view.setEventListener('add', (value) => {
      this.add(value);
    });
    this.view.setEventListener('refresh', () => {
      this.refreshPage();
    });
    this.view.setEventListener('destroy', (todoId) => {
      this.destroy(todoId);
    });
    this.view.setEventListener('toggle', (todoId) => {
      this.toggleCheckBox(todoId);
    });
    this.view.setEventListener('selectAll', () => {
      this.showAll();
    });
    this.view.setEventListener('selectActive', () => {
      this.showActive();
    });
    this.view.setEventListener('selectCompleted', () => {
      this.showCompleted();
    });
    this.view.setEventListener('edit', (todo) => {
      this.edit(todo);
    });
    this.view.setEventListener('editEnd', (todo) => {
      this.editEnd(todo);
    });
    this.view.setEventListener('editApply', (todoId, content) => {
      this.editApply(todoId, content);
    });
  }
}
