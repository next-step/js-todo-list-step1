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
    this.view.setEventListener('destroy', (itemId) => {
      this.destroyItem(itemId);
    });
    this.view.setEventListener('toggle', (itemId) => {
      this.toggleCheckBox(itemId);
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

  destroyItem(itemId) {
    this.model
      .removeItem(itemId, this.view.currentUser)
      .then((item) => {
        this.view.removeItemFromTodoList(item);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  toggleCheckBox(itemId) {
    this.model
      .changeStatus(itemId, this.view.currentUser)
      .then((item) => {
        this.view.renderAgain(item);
      })
      .catch((error) => {
        console.log(error.meesage);
      });
  }
}
