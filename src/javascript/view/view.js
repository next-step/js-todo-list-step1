/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
import TodoListView from './todoListView.js';
import InputView from './inputView.js';
import TodoCountView from './todoCountView.js';

export default class View {
  constructor() {
    this.todoListView = new TodoListView();
    this.inputView = new InputView();
    this.todoCountView = new TodoCountView();

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
      // NOTE: callback == Controller.showAll
      selectAll: () => this.todoCountView.setSelectAllEvent(callback),
      // NOTE: callback == Controller.showActive
      selectActive: () => this.todoCountView.setSelectActiveEvent(callback),
      // NOTE: callback == Controller.showCompleted
      selectCompleted: () =>
        this.todoCountView.setSelectCompletedEvent(callback),
      refresh: () => {
        // NOTE: callback == Controller.refreshPage
        window.addEventListener('load', () => {
          callback();
        });
      },
    };
    options[eventName]();
  }

  setCurrentUser(name) {
    this._currentUser = name;
  }

  getCurrentUser() {
    return this._currentUser;
  }

  _add(todo) {
    this.todoListView.add(todo);
    this.inputView.clear();
    if (this.todoCountView.getCurrentFilter() === 'completed') {
      this.todoListView.hide(todo);
    } else {
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() + 1
      );
    }
    this.todoCountView.increaseTodoCount();
  }

  _addAll(todos) {
    todos.map((todo) => {
      this._add(todo);
    });
  }

  _remove(todo) {
    this.todoListView.remove(todo);
    this.todoCountView.decreaseTodoCount();
    this.todoCountView.setTodoCount(this.todoCountView.getInnerTextCount() - 1);
  }

  _update(todo) {
    this.todoListView.update(todo);
    const currentFilter = this.todoCountView.getCurrentFilter();

    if (currentFilter === 'all') {
      return;
    } else if (currentFilter === 'active' && todo.completed) {
      this.todoListView.hide(todo);
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() - 1
      );
    } else if (currentFilter === 'completed' && !todo.completd) {
      this.todoListView.hide(todo);
      this.todoCountView.setTodoCount(
        this.todoCountView.getInnerTextCount() - 1
      );
    }
  }

  _filterAll() {
    const count = this.todoListView.filterAll();
    this.todoCountView.setTodoCount(count);
  }

  _filterActive() {
    const count = this.todoListView.filterActive();
    this.todoCountView.setTodoCount(count);
  }

  _filterCompleted() {
    const count = this.todoListView.filterCompleted();
    this.todoCountView.setTodoCount(count);
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
}
