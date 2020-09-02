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
    const { items, type } = this.#state;
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
  }

  #initEventListener () {
    this.#target.addEventListener('change', ({ target }) => {
      if (target.classList.contains('toggle')) this.#toggle(target)
    })
    this.#addRemoveEvent();
    this.#addEditingEvent();
    this.#addEditedEvent();
  }

  #toggle (target) {
    const { items } = this.#state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.completed = target.checked;
    items[index] = { ...todoItem };
    this.#setState({ items: [ ...items ] });
  }

  #addRemoveEvent () {
    const destroyButtons = this.#target.querySelectorAll('.destroy');
    const { items } = this.#state;
    destroyButtons.forEach(v => v.addEventListener('click', ({ target }) => {
      const index = Number(target.parentNode.dataset.index);
      items.splice(index, 1);
      this.#setState({ items: [ ...items ] });
    }))
  }

  #addEditingEvent () {
    const labels = this.#target.querySelectorAll('.label');
    const { items } = this.#state;
    labels.forEach(v => v.addEventListener('dblclick', ({ target }) => {
      const index = Number(target.parentNode.dataset.index);
      const todoItem = items[index];
      todoItem.editing = true;
      items[index] = { ...todoItem };
      this.#setState({
        items: [ ...items ],
        editingIndex: index
      });
    }))
  }

  #addEditedEvent () {
    const editors = this.#target.querySelectorAll('.edit');
    const { editingIndex, items } = this.#state;

    editors.forEach(v => {
      const index = Number(v.dataset.index);
      if (editingIndex === index) v.focus();

      v.addEventListener('keydown', ({ target, key }) => {
        const todoItem = items[index];
        switch (key) {
          case 'Enter':
            todoItem.title = target.value;
          case 'Escape':
            todoItem.editing = false;
            items[index] = { ...todoItem };
            this.#setState({
              items: [ ...items ],
              editingIndex: -1
            });
            break;
        }
      })
    })
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