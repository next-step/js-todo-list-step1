/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
import { EVENT_NAME, RENDER_COMMAND } from '../utils/constants.js';
export default class View {
  constructor() {
    this._todoList = document.querySelector('#todo-list');
    this._input = document.querySelector('#new-todo-title');
    this._todoCount = 0;
    this._todoCountView = document.querySelector('.todo-count').children[0];
    this._filterContainer = document.querySelector('.filters');
    this._currentFilterView = this._filterContainer.querySelector('.all');
    this._currentFilter = 'all';
    this.setCurrentUser('default');
  }

  render(obj) {
    const cmd = obj.cmd;
    if (!cmd) {
      return;
    }
    switch (cmd) {
      case RENDER_COMMAND.ADD:
        this._add(obj.todo);
        this._clearInput();
        break;
      case RENDER_COMMAND.EDIT_START:
        this._editMode(obj.todo);
        break;
      case RENDER_COMMAND.EDIT_APPLY:
        this._update(obj.todo);
        break;
      case RENDER_COMMAND.EDIT_END:
        this._editEnd(obj.todo);
        break;
      case RENDER_COMMAND.REMOVE:
        this._remove(obj.todo);
        break;
      case RENDER_COMMAND.TOGGLE:
        this._update(obj.todo);
        break;
      case RENDER_COMMAND.REFRESH:
        this._addAll(obj.todos);
        break;
      case RENDER_COMMAND.SHOW_ALL:
        this._filterAll();
        break;
      case RENDER_COMMAND.SHOW_ACTIVE:
        this._filterActive();
        break;
      case RENDER_COMMAND.SHOW_COMPLETED:
        this._filterCompleted();
        break;
    }
  }

  setCurrentUser(name) {
    this._currentUser = name;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  setEventListener(eventName, callback) {
    switch (eventName) {
      case EVENT_NAME.ADD:
        // NOTE: callback == Controller.add
        this._input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            callback(this._input.value);
          }
        });
        break;
      case EVENT_NAME.REFRESH:
        // NOTE: callback == Controller.refreshPage
        window.addEventListener('load', () => {
          callback();
        });
        break;
      case EVENT_NAME.DESTROY:
        // NOTE: callback == Controller.destroy
        this._todoList.addEventListener('click', (event) => {
          if (!event.target.closest('.destroy')) {
            return;
          }
          const li = event.target.closest('li');
          callback(+li.dataset.id);
        });
        break;
      case EVENT_NAME.TOGGLE:
        // NOTE: callback == Controller.toggleCheckBox
        this._todoList.addEventListener('click', (event) => {
          if (!event.target.closest('.toggle')) {
            return;
          }
          const li = event.target.closest('li');
          callback(+li.dataset.id);
        });
        break;
      case EVENT_NAME.SELECT_ALL:
        // NOTE: callback == Controller.showAll
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.all');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case EVENT_NAME.SELECT_ACTIVE:
        // NOTE: callback == Controller.showActive
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.active');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case EVENT_NAME.SELECT_COMPLETED:
        // NOTE: callback == Controller.showCompleted
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.completed');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case EVENT_NAME.EDIT:
        // NOTE: callback == Controller.edit
        this._todoList.addEventListener('dblclick', (event) => {
          const todo = event.target.closest('li');
          if (!todo) {
            return;
          }
          callback(todo);
        });
        break;
      case EVENT_NAME.EDIT_END:
        // NOTE: callback == Controller._editEnd
        this._todoList.addEventListener('focusout', (event) => {
          const todo = event.target.closest('li');
          if (!todo) {
            return;
          }
          callback(todo);
        });
        break;
      case EVENT_NAME.EDIT_APPLY:
        // NOTE: callback == Controller.editApply
        this._todoList.addEventListener('keypress', (event) => {
          if (event.key !== 'Enter') {
            return;
          }
          const input = event.target.closest('.edit');
          const todo = input.closest('li');
          callback(+todo.dataset.id, input.value);
        });
        break;
      default:
        console.log('eventName is not handling');
    }
  }

  _add(todo) {
    const li = this._todoList.querySelector(`li[data-id='${todo.id}']`);
    if (li) {
      return;
    }
    const temp = document.createElement('li');
    temp.dataset.id = todo.id;
    temp.classList.add(todo.completed ? 'completed' : 'active');
    temp.innerHTML = `
                        <div class="view">
                          <input class="toggle" type="checkbox"
                          ${todo.completed ? 'checked' : ''}/>
                          <label class="label">${todo.content}</label>
                          <button class="destroy"></button>
                        </div>
                        <input class="edit" value="" />`;
    this._todoList.appendChild(temp);
    this._increaseTodoCount();
    if (this._currentFilter === 'completed') {
      temp.style.display = 'none';
      return;
    } else {
      this._setTodoCount(+this._todoCountView.innerText + 1);
    }
  }

  _addAll(todos) {
    todos.forEach((todo) => {
      this._add(todo);
    });
  }

  _remove(todo) {
    const li = this._todoList.querySelector(`li[data-id='${todo.id}']`);
    if (!li) {
      return;
    }
    li.remove();
    this._decreaseTodoCount();
    this._setTodoCount(this._todoCountView.innerText - 1);
  }

  _update(todo) {
    const li = this._todoList.querySelector(`li[data-id='${todo.id}']`);
    if (!li) {
      return;
    }
    li.className = todo.completed ? 'completed' : 'active';
    li.innerHTML = `
                    <div class="view">
                      <input class="toggle" type="checkbox"
                      ${todo.completed ? 'checked' : ''}/>
                      <label class="label">${todo.content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="" />`;
    this._setDisplayStyleAndCount(li, todo);
  }

  _filterAll() {
    const todos = this._todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
    this._setTodoCount(this.getTodoCount());
  }

  _filterActive() {
    let activeCount = 0;
    const todos = this._todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      } else {
        activeCount++;
        todo.style.display = 'block';
      }
    });
    this._setTodoCount(activeCount);
  }

  _filterCompleted() {
    let completedCount = 0;
    const todos = this._todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'block';
        completedCount++;
      } else {
        todo.style.display = 'none';
      }
    });
    this._setTodoCount(completedCount);
  }

  _setSelectFilter(filter) {
    this._currentFilterView.classList.remove('selected');
    this._currentFilter = filter.className;
    this._currentFilterView = filter;
    this._currentFilterView.classList.add('selected');
  }

  _increaseTodoCount() {
    this._todoCount++;
  }

  _decreaseTodoCount() {
    this._todoCount--;
  }

  getTodoCount() {
    return this._todoCount;
  }

  _setTodoCount(count) {
    this._todoCountView.innerText = count;
  }

  _editMode(todo) {
    todo.classList.add('editing');
    const input = todo.querySelector('.edit');
    input.focus();
  }

  _editEnd(todo) {
    todo =
      todo instanceof Element
        ? todo
        : this._todoList.querySelector(`li[data-id='${todo.id}']`);
    todo.classList.remove('editing');
    const input = todo.querySelector('.edit');
    input.value = '';
  }

  _clearInput() {
    this._input.value = '';
  }

  _setDisplayStyleAndCount(li, todo) {
    if (this._currentFilter === 'all') {
      return;
    } else if (this._currentFilter === 'active' && todo.completed) {
      li.style.display = 'none';
      this._setTodoCount(+this._todoCountView.innerText - 1);
    } else if (this._currentFilter === 'completed' && !todo.completed) {
      this._setTodoCount(+this._todoCountView.innerText - 1);
      li.style.display = 'none';
    }
  }
}
