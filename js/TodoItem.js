`use strict`;

class TodoItem {
  constructor(id, place) {
    this._id = id;
    this._place = place;
    this._team;
    this._$item;
    this._isCompleted = false;
  }

  createItem(text) {
    let template = `
      <li>
        <div class="view">
          <input class="toggle" type="checkbox"/>
          <label class="label">${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}" />
      </li>`;

    let div = document.createElement('div');
    div.innerHTML = template;

    this._$item = div.firstElementChild;
    this._$item.addEventListener('keyup', this.onKeyUp.bind(this));
    return div.firstElementChild;
  }

  onKeyUp(event) {
    if (event.code === 'Enter') {
      const value = event.target.value;
      this._$item.querySelector('.label').innerHTML = value;
      this._$item.querySelector('.edit').innerHTML = value;
      this._$item.classList.remove('editing');
    }
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set place(p) {
    this._place = p;
  }

  get place() {
    return this._place;
  }

  set team(t) {
    this._team = t;
  }

  get team() {
    return this._team;
  }

  set $item(i) {
    this._$item = i;
  }

  get $item() {
    return this._$item;
  }

  set isCompleted(b) {
    this._isCompleted = b;
  }

  get isCompleted() {
    this._isCompleted;
  }
}

export default TodoItem;
