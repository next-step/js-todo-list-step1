export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setEventListener('add', (value) => {
      this.addItem(value);
    });
  }

  addItem(value) {
    this.model
      .create(value, this.view.currentUser)
      .then((item) => {
        this.view.renderTodo(item);
        // TODO: input box 클리어하자.
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
