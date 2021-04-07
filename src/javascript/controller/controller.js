export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setEventListener('add', (value) => {
      this.addItem(value);
    });
    this.view.setEventListener('refresh', () => {
      this.refreshPage();
    });
  }

  addItem(value) {
    this.model
      .create(value, this.view.currentUser)
      .then((item) => {
        this.view.renderTodo(item);
        this.view.clearInput();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  refreshPage() {
    const items = this.model.getTodosOf(this.view.currentUser);
    this.view.renderAllTodo(items);
  }
}
