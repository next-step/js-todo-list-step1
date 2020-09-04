import { Component } from "../core/index.js";
import { toDoStore } from "../store/index.js";
import { SET_EDITING_INDEX, SET_ITEMS } from "../store/toDoStore.js";

const getToDoItemClass = (completed, editing) =>
  editing   ? 'class="editing"'   :
  completed ? 'class="completed"' :
  '';

export const ToDoList = class extends Component{

  constructor (target) {
    super(target, {});
  }

  _render () {
    const { editingIndex } = toDoStore.$state;
    const filteredItems = toDoStore.$getters.filteredItems;
    this.$target.innerHTML = filteredItems.map(([ index, { title, completed, editing } ]) => `
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
    const { items } = toDoStore.$state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.completed = target.checked;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
  }

  #remove (target) {
    const { items } = toDoStore.$state;
    const index = Number(target.parentNode.dataset.index);
    items.splice(index, 1);
    toDoStore.commit(SET_ITEMS, [ ...items ]);
  }

  #editing (target) {
    const { items } = toDoStore.$state;
    const index = Number(target.parentNode.dataset.index);
    const todoItem = items[index];
    todoItem.editing = true;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
    toDoStore.commit(SET_EDITING_INDEX, index);
  }

  #edited (target, key) {
    if (!['Enter', 'Escape'].includes(key)) return;
    const { items } = toDoStore.$state;
    const index = Number(target.dataset.index);
    const todoItem = items[index];
    if (key === 'Enter') {
      todoItem.title = target.value;
    }
    todoItem.editing = false;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
    toDoStore.commit(SET_EDITING_INDEX, -1);
  }
}