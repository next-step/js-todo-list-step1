import {ToDoItemService} from "../services";

const getToDoItemClass = (completed, editing) =>
  editing   ? 'class="editing"'   :
  completed ? 'class="completed"' :
  '';

export const ToDoList = class {

  #state;
  #target;
  #props;

  constructor (target, props) {
    this.#target = target;
    this.#props = props;
    this.#setState({
      items: ToDoItemService.fetchAll(),
      editingIndex: -1,
      type: 'all'
    })
    this.#initEventListener();
  }

  #render () {
    const { items, type, editingIndex } = this.#state;
    this.#target.innerHTML =
      Object.entries(items)
        .filter(entry => {
          const completed = entry[1].completed;
          return (type === 'all') ||
                 (type === 'completed' && completed) ||
                 (type === 'active' && !completed);
        })
        .map(([ index, { title, completed, editing } ]) => `
          <li ${ getToDoItemClass(completed, editing) }>
            <div class="view" data-index="${index}">
              <input class="toggle"
                     type="checkbox"
                     ${completed ? 'checked' : '' } />
              <label class="label">${title}</label>
              <button class="destroy"></button>
            </div>
            ${ editing ? `<input class="edit" value="${title}" data-index="${index}" />` : '' }
          </li>
        `).join('');

    if (editingIndex !== -1) {
      this.#target.querySelector(`.edit[data-index="${editingIndex}"]`).focus();
    }
  }

  #initEventListener () {
    this.#target.addEventListener('change', ({ target }) => {
      if (target.classList.contains('toggle')) this.#toggle(target)
    })
    this.#target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('destroy')) this.#remove(target)
    })
    this.#target.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label')) this.#editing(target)
    })
    this.#target.addEventListener('keydown', ({ target, key }) => {
      if (target.classList.contains('edit')) this.#edited(target, key)
    })
  }

  #toggle (target) {
    const { items } = this.#state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.completed = target.checked;
    items[index] = { ...todoItem };
    this.#setState({ items: [ ...items ] });
  }

  #remove (target) {
    const { items } = this.#state;
    const index = Number(target.parentNode.dataset.index);
    items.splice(index, 1);
    this.#setState({ items: [ ...items ] });
  }

  #editing (target) {
    const { items } = this.#state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.editing = true;
    items[index] = { ...todoItem };
    this.#setState({ items: [ ...items ], editingIndex: index });
  }

  #edited (target, key) {
    const { items } = this.#state;
    const index = Number(target.dataset.index);
    const todoItem = items[index];
    if (key === 'Enter') {
      todoItem.title = target.value;
    }
    if (['Enter', 'Escape'].includes(key)) {
      todoItem.editing = false;
      items[index] = { ...todoItem };
      this.#setState({
        items: [ ...items ],
        editingIndex: -1
      });
    }
  }

  count () {
    return this.#state.items.length;
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
    if (payload.items !== undefined) {
      ToDoItemService.put(payload.items);
    }
    this.#render();
    requestAnimationFrame(() => this.#props.countUpdate());
  }

  addItem (itemTitle) {
    this.#setState({
      items: [
        ...this.#state.items,
        { title: itemTitle, completed: false, editing: false }
      ],
    });
  }

  selectType (type) {
    this.#setState({ type });
  }
}