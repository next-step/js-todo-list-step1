export const ToDoStatus = class {
  #state;
  #target;
  #props;

  constructor (target, props) {
    this.#target = target;
    this.#props = props;
    this.#setState({ });
  }

  #initEventListener () {

  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
    this.#initEventListener();
  }
}