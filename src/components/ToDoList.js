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
      items: [],
      editing: -1,
    })
  }

  #render () {
    const { items } = this.#state;
    this.#target.innerHTML = items.map(({ state, title }, key) => `
      <li ${ getStateClass(state) }>
        <div class="view">
          <input class="toggle"
                 type="checkbox"
                 ${state === TODO_STATE.COMPLETED ? 'checked' : '' } />
          <label class="label">${title}</label>
          <button class="destroy"></button>
        </div>
        ${ state === TODO_STATE.EDITING ? `<input class="edit" value="${title}" data-index="${key}" />` : '' }
      </li>
    `).join('');
  }

  #initEventListener () {
    this.#addToggleEvent();
    this.#addRemoveEvent();
    this.#addEditingEvent();
    this.#addEditedEvent();
  }

  #addToggleEvent () {
    const toggleButtons = this.#target.querySelectorAll('.toggle');
    const { items } = this.#state;
    toggleButtons.forEach((v, index) => v.addEventListener('change', ({ target }) => {
      const todoItem = items[index];
      todoItem.state = target.checked ? TODO_STATE.COMPLETED : TODO_STATE.TODO;
      items[index] = { ...todoItem };
      this.#setState({ items: [ ...items ] });
    }))
  }

  #addRemoveEvent () {
    const destroyButtons = this.#target.querySelectorAll('.destroy');
    const { items } = this.#state;
    destroyButtons.forEach((v, index) => v.addEventListener('click', ({ target }) => {
      items.splice(index, 1);
      this.#setState({ items: [ ...items ] });
    }))
  }

  #addEditingEvent () {
    const labels = this.#target.querySelectorAll('.label');
    const { items } = this.#state;
    labels.forEach((v, index) => v.addEventListener('dblclick', ({ target }) => {
      const todoItem = items[index];
      todoItem.state = TODO_STATE.EDITING;
      items[index] = { ...todoItem };
      this.#setState({
        items: [ ...items ],
        editing: index
      });
    }))
  }

  #addEditedEvent () {
    const editors = this.#target.querySelectorAll('.edit');
    const { editing, items } = this.#state;

    editors.forEach(v => {
      const index = Number(v.dataset.index);
      if (editing === index) v.focus();

      v.addEventListener('keydown', ({ target, key }) => {
        switch (key) {
          case 'Enter':
            break;
          case 'Esc':
            this.#setState({

            });
            break;
        }
      })
    })
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
        { title: itemTitle, completed: false, editing: false }
      ],
    });
  }

}