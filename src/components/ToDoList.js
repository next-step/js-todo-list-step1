import { Component } from "../core/Component.js";
import { toDoStore, SET_EDITING_INDEX, SET_ITEMS } from "../store/toDoStore.js";

const getToDoItemClass = (completed, editing) => editing   ? 'class="editing"'   :
                                                 completed ? 'class="completed"' :
                                                 '';

export const ToDoList = class extends Component{

  #toggle (target) {
    const { items } = toDoStore.$state;
    const index = Number(target.closest('[data-index]').dataset.index);
    const todoItem = items[index];
    todoItem.completed = target.checked;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
  }

  #remove (target) {
    const { items } = toDoStore.$state;
    const index = Number(target.closest('[data-index]').dataset.index);
    items.splice(index, 1);
    toDoStore.commit(SET_ITEMS, [ ...items ]);
  }

  #editing (target) {
    const { items } = toDoStore.$state;
    const index = Number(target.closest('[data-index]').dataset.index);
    const todoItem = items[index];
    todoItem.editing = true;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
    toDoStore.commit(SET_EDITING_INDEX, index);
  }

  #edited (target, key) {
    if (!['Enter', 'Escape'].includes(key)) return;
    const { items } = toDoStore.$state;
    const index = Number(target.closest('[data-index]').dataset.index);
    const todoItem = items[index];
    if (key === 'Enter') {
      todoItem.title = target.value;
    }
    todoItem.editing = false;
    items[index] = { ...todoItem };
    toDoStore.commit(SET_ITEMS, [ ...items ]);
    toDoStore.commit(SET_EDITING_INDEX, -1);
  }

  render () {
    const { editingIndex } = toDoStore.$state;
    const filteredItems = toDoStore.$getters.filteredItems;
    return filteredItems.map(([ index, { title, completed, editing } ]) => `
      <li ${ getToDoItemClass(completed, editing) } data-index="${index}">
        <div class="view">
          <input class="toggle"
                 type="checkbox"
                 ${completed ? 'checked' : '' } />
          <label class="label">${title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${title}" />
      </li>
    `).join('');
    if (editingIndex !== -1) {
      this.$target.querySelector(`.edit[data-index="${editingIndex}"]`).focus();
    }
  }

  setEvent ($target) {
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
}