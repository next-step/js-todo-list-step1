export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

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
      .changeStatus(todoId, this.view.currentUser)
      .then((todo) => {
        this.view.renderAgain(todo);
      })
      .catch((error) => {
        console.log(error.meesage);
      });
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
}
