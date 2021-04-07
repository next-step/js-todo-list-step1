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
      .then(() => {
        // TODO: 현재 하나만 삭제해도 전부를 다시 render하고 있다. 이 부분해결하자.
        this.view.renderAllTodo(this.model.getTodosOf(this.view.currentUser));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
