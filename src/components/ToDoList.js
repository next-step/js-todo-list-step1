import { TODO_STATE } from "../domain";

const getStateClass = state =>
  state === TODO_STATE.COMPLETED ? 'class="completed"' :
  state === TODO_STATE.EDITING   ? 'class="editing"'   :
  '';

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
      <li ${ getStateClass(state) }>
        <div class="view">
          <input class="toggle"
                 type="checkbox"
                 ${state === TODO_STATE.COMPLETED ? 'checked' : '' } />
          <label class="label">${title}</label>
          <button class="destroy"></button>
        </div>
        ${ state === TODO_STATE.EDITING ? `<input class="edit" value="${title}" />` : '' }
      </li>
    `).join('');
  }

  #initEventListener () {

    this.#addToggleEvent();
    this.#addRemoveEvent();
  }

  #addToggleEvent () {
    const toggleButtons = this.#target.querySelectorAll('.toggle');
    const { items } = this.#state;
    toggleButtons.forEach((v, key) => v.addEventListener('change', ({ target }) => {
      const todoItem = items[key];
      todoItem.state = target.checked ? TODO_STATE.COMPLETED : TODO_STATE.TODO;
      items[key] = { ...todoItem };
      this.#setState({ items: [ ...items ] });
    }))
  }

  #addRemoveEvent () {
    const destroyButtons = this.#target.querySelectorAll('.destroy');
    const { items } = this.#state;
    destroyButtons.forEach((v, key) => v.addEventListener('click', ({ target }) => {
      items.splice(key, 1);
      this.#setState({ items: [ ...items ] });
    }))
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
    this.#render();
    this.#initEventListener();
  }

  addItem (itemTitle) {
    this.#setState({
      items: [
        ...this.#state.items,
        { title: itemTitle, state: TODO_STATE.TODO }
      ],
    });
  }

}