import {ToDoItemService} from "../services";
import {Component} from "../_core";

const getToDoItemClass = (completed, editing) =>
  editing   ? 'class="editing"'   :
  completed ? 'class="completed"' :
  '';

export const ToDoList = class extends Component{

  constructor (target, props) {
    super(target, props, {
      items: ToDoItemService.fetchAll(),
      editingIndex: -1,
      type: 'all'
    });
  }

  get filteredItems () {
    const { items, type } = this.$state;
    return Object.entries(items)
                 .filter(([, { completed }]) => (type === 'all') ||
                                                (type === 'completed' && completed) ||
                                                (type === 'active' && !completed));
  }

  _render () {
    const { editingIndex } = this.$state;
    this.$target.innerHTML = this.filteredItems.map(([ index, { title, completed, editing } ]) => `
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
      this.$target.querySelector(`.edit[data-index="${editingIndex}"]`).focus();
    }
  }

  _initEventListener () {
    const { $target } = this;
    $target.addEventListener('change', ({ target }) => {
      if (target.classList.contains('toggle')) this.#toggle(target)
    })
    $target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('destroy')) this.#remove(target)
    })
    $target.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label')) this.#editing(target)
    })
    $target.addEventListener('keydown', ({ target, key }) => {
      if (target.classList.contains('edit')) this.#edited(target, key)
    })
  }

  #toggle (target) {
    const { items } = this.$state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.completed = target.checked;
    items[index] = { ...todoItem };
    super.setState({ items: [ ...items ] });
  }

  #remove (target) {
    const { items } = this.$state;
    const index = Number(target.parentNode.dataset.index);
    items.splice(index, 1);
    super.setState({ items: [ ...items ] });
  }

  #editing (target) {
    const { items } = this.$state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.editing = true;
    items[index] = { ...todoItem };
    super.setState({ items: [ ...items ], editingIndex: index });
  }

  #edited (target, key) {
    if (!['Enter', 'Escape'].includes(key)) return;
    const { items } = this.$state;
    const index = Number(target.dataset.index);
    const todoItem = items[index];
    if (key === 'Enter') {
      todoItem.title = target.value;
    }
    todoItem.editing = false;
    items[index] = { ...todoItem };
    super.setState({
      items: [ ...items ],
      editingIndex: -1
    });
  }

  count () {
    return this.filteredItems.length;
  }

  _setState (payload) {
    if (payload.items !== undefined) {
      ToDoItemService.put(payload.items);
    }
    requestAnimationFrame(() => this.$props.countUpdate());
  }

  addItem (itemTitle) {
    super.setState({
      items: [
        ...this.$state.items,
        { title: itemTitle, completed: false, editing: false }
      ],
    });
  }

  selectType (type) {
    super.setState({ type });
  }
}