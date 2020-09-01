import { TODO_STATE } from "../domain";

export const ToDoList = class {

  #state;
  #target;

  constructor (target) {
    this.#target = target;
    this.#setState({
      items: []
    })
  }

  #render () {
    const { items } = this.#state;
    this.#target.innerHTML = items.map(({ state, title }) => `
      <li ${ this.#getStateClass(state) }>
        <div class="view">
          <input class="toggle" type="checkbox" checked/>
          <label class="label">${title}</label>
          <button class="destroy"></button>
        </div>
        ${ state === TODO_STATE.EDITING &&
          `<input class="edit" value="${title}" />` }
      </li>
    `).join('');
  }

  #initEventListener () {

  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
    this.#render();
    this.#initEventListener();
  }

  #getStateClass (state) {
    return state === TODO_STATE.COMPLETED ? 'class="completed"' :
           state === TODO_STATE.EDITING   ? 'class="editing"'   :
           '';
  }

  addItem (item) {
    this.#setState({
      items: [ ...this.#state.items, item ],
    });
  }

}