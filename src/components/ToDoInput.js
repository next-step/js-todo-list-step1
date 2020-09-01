export const ToDoInput = class {

  #state;
  #target;
  #props;

  constructor (target, props) {
    this.#target = target;
    this.#props = props;
    this.#state = {
      toDoItem: ''
    };
    this.#initEventListener();
  }

  #initEventListener () {
    this.#target.addEventListener('input', ({ target }) => {
      this.#setState({ toDoItem: target.value });
    })
    this.#target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.#props.addToDoItem(this.#state.toDoItem);
      }
    })
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
  }

}