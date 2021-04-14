/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
import { $, $$ } from '../utils/querySelector.js';
import TodoListView from './todoListView.js';
import InputView from './inputView.js';

export default class View {
  constructor() {
    this.todoListView = new TodoListView();
    this.inputView = new InputView();
    this._todoList = $('#todo-list');
    this._todoCount = 0;
    this._todoCountView = $('.todo-count').children[0];
    this._filterContainer = $('.filters');
    this._currentFilterView = $('.all', this._filterContainer);
    this._currentFilter = 'all';
    this.setCurrentUser('default');
  }

  render(obj) {
    const cmd = obj.cmd;
    if (!cmd) {
      return;
    }
    const options = {
      add: () => this._add(obj.todo),
      editStart: () => this._editMode(obj.todo),
      editApply: () => this._update(obj.todo),
      editEnd: () => this._editEnd(obj.todo),
      remove: () => this._remove(obj.todo),
      toggle: () => this._update(obj.todo),
      refresh: () => this._addAll(obj.todos),
      showAll: () => this._filterAll(),
      showActive: () => this._filterActive(),
      showCompleted: () => this._filterCompleted(),
    };
    options[cmd]();
  }

  setCurrentUser(name) {
    this._currentUser = name;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  setEventListener(eventName, callback) {
    const options = {
      // NOTE: callback == Controller.add
      add: () => this.inputView.setAddEvent(callback),
      // NOTE: callback == Controller.destroy
      destroy: () => this.todoListView.setRemoveEvent(callback),
      // NOTE: callback == Controller.toggleCheckBox
      toggle: () => this.todoListView.setToggleEvent(callback),
      // NOTE: callback == Controller.edit
      edit: () => this.todoListView.setEditStartEvent(callback),
      // NOTE: callback == Controller._editEnd
      editEnd: () => this.todoListView.setEditEndEvent(callback),
      // NOTE: callback == Controller.editApply
      editApply: () => this.todoListView.setEditApplyEvent(callback),

      // TODO: 모듈화 할 것들
      refresh: () => {
        // NOTE: callback == Controller.refreshPage
        window.addEventListener('load', () => {
          callback();
        });
      },
      selectAll: () => {
        // NOTE: callback == Controller.showAll
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.all');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
      },
      selectActive: () => {
        // NOTE: callback == Controller.showActive
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.active');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
      },
      selectCompleted: () => {
        // NOTE: callback == Controller.showCompleted
        this._filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.completed');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
      },
    };
    options[eventName]();
  }

  _add(todo) {
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

    this.inputView.clear();

    if (this._currentFilter === 'completed') {
      temp.style.display = 'none';
      return;
    } else {
      this._setTodoCount(+this._todoCountView.innerText + 1);
    }
  }

  _addAll(todos) {
    todos.map((todo) => {
      this._add(todo);
    });
  }

  _remove(todo) {
    this.todoListView.remove(todo);
    this._decreaseTodoCount();
    this._setTodoCount(this._todoCountView.innerText - 1);
  }

  _update(todo) {
    const li = this._getTodoById(todo.id);
    if (!li) {
      return;
    }
    this.todoListView.update(todo);
    this._setDisplayStyleAndCount(li, todo);
  }

  _filterAll() {
    const todos = $$('li', this._todoList);
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
    this._setTodoCount(this.getTodoCount());
  }

  _filterActive() {
    let activeCount = 0;
    const todos = $$('li', this._todoList);
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
    const todos = $$('li', this._todoList);
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
    this.todoListView.editStart(todo);
  }

  _editEnd(todo) {
    this.todoListView.editEnd(todo);
  }

  _clearInput() {
    this.InputView.clear();
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

  _getTodoById(id) {
    return $(`li[data-id='${id}']`, this._todoList);
  }
}
