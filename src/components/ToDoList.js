const getToDoItemClass = (completed, editing) =>
  editing   ? 'class="editing"'   :
  completed ? 'class="completed"' :
  '';

export const ToDoList = class {

  #state;
  #props;
  #target;

  constructor (target, props) {
    this.#target = target;
    this.#props = props;
    this.#setState({
      items: [],
      editingIndex: -1,
    })
  }

  #render () {
    const { items } = this.#state;
    this.#target.innerHTML = items.map(({ title, completed, editing }, key) => `
      <li ${ getToDoItemClass(completed, editing) }>
        <div class="view">
          <input class="toggle"
                 type="checkbox"
                 ${completed ? 'checked' : '' } />
          <label class="label">${title}</label>
          <button class="destroy"></button>
        </div>
        ${ editing ? `<input class="edit" value="${title}" data-index="${key}" />` : '' }
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
      todoItem.completed = target.checked;
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

  #setState (payload) {
    this.#state = { ...this.#state, ...payload };
    this.#props.emitItems(this.#state.items);
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