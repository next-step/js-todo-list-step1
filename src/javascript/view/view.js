/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
export default class View {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
    this.input = document.querySelector('#new-todo-title');
    this.todoCount = 0;
    this.todoCountView = document.querySelector('.todo-count').children[0];
    this.filterContainer = document.querySelector('.filters');
    this.currentFilterView = this.filterContainer.querySelector('.all');
    this.currentFilter = 'all';
    this.currentUser = 'default';
  }

  render(obj) {
    const cmd = obj.cmd;
    if (!cmd) {
      return;
    }
    switch (cmd) {
      case 'add':
        this._add(obj.todo);
        this._clearInput();
        break;
      case 'editStart':
        this._editMode(obj.todo);
        break;
      case 'editApply':
        this._update(obj.todo);
        break;
      case 'editEnd':
        this._editEnd(obj.todo);
        break;
      case 'remove':
        this._remove(obj.todo);
        break;
      case 'toggle':
        this._update(obj.todo);
        break;
      case 'refresh':
        this._addAll(obj.todos);
        break;
      case 'showAll':
        this._filterAll();
        break;
      case 'showActive':
        this._filterActive();
        break;
      case 'showCompleted':
        this._filterCompleted();
        break;
    }
  }

  setEventListener(eventName, callback) {
    switch (eventName) {
      case 'add':
        // NOTE: callback == Controller.add
        this.input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            callback(this.input.value);
          }
        });
        break;
      case 'refresh':
        // NOTE: callback == Controller.refreshPage
        window.addEventListener('load', () => {
          callback();
        });
        break;
      case 'destroy':
        // NOTE: callback == Controller.destroy
        this.todoList.addEventListener('click', (event) => {
          if (!event.target.closest('.destroy')) {
            return;
          }
          const li = event.target.closest('li');
          callback(+li.dataset.id);
        });
        break;
      case 'toggle':
        // NOTE: callback == Controller.toggleCheckBox
        this.todoList.addEventListener('click', (event) => {
          if (!event.target.closest('.toggle')) {
            return;
          }
          const li = event.target.closest('li');
          callback(+li.dataset.id);
        });
        break;
      case 'selectAll':
        // NOTE: callback == Controller.showAll
        this.filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.all');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case 'selectActive':
        // NOTE: callback == Controller.showActive
        this.filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.active');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case 'selectCompleted':
        // NOTE: callback == Controller.showCompleted
        this.filterContainer.addEventListener('click', (event) => {
          const filter = event.target.closest('.completed');
          if (!filter) {
            return;
          }
          this._setSelectFilter(filter);
          callback();
        });
        break;
      case 'edit':
        // NOTE: callback == Controller.edit
        this.todoList.addEventListener('dblclick', (event) => {
          const todo = event.target.closest('li');
          if (!todo) {
            return;
          }
          callback(todo);
        });
        break;
      case 'editEnd':
        // NOTE: callback == Controller._editEnd
        this.todoList.addEventListener('focusout', (event) => {
          const todo = event.target.closest('li');
          if (!todo) {
            return;
          }
          callback(todo);
        });
        break;
      case 'editApply':
        // NOTE: callback == Controller.editApply
        this.todoList.addEventListener('keypress', (event) => {
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
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
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
    this.todoList.appendChild(temp);
    this._increaseTodoCount();
    if (this.currentFilter === 'completed') {
      temp.style.display = 'none';
      return;
    } else {
      this._setTodoCount(+this.todoCountView.innerText + 1);
    }
  }

  _addAll(todos) {
    todos.forEach((todo) => {
      this._add(todo);
    });
  }

  _remove(todo) {
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
    if (!li) {
      return;
    }
    li.remove();
    this._decreaseTodoCount();
    this._setTodoCount(this.todoCountView.innerText - 1);
  }

  _update(todo) {
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
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
    const todos = this.todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
    this._setTodoCount(this.getTodoCount());
  }

  _filterActive() {
    let activeCount = 0;
    const todos = this.todoList.querySelectorAll('li');
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
    const todos = this.todoList.querySelectorAll('li');
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
    this.currentFilterView.classList.remove('selected');
    this.currentFilter = filter.className;
    this.currentFilterView = filter;
    this.currentFilterView.classList.add('selected');
  }

  _increaseTodoCount() {
    this.todoCount++;
  }

  _decreaseTodoCount() {
    this.todoCount--;
  }

  getTodoCount() {
    return this.todoCount;
  }

  _setTodoCount(count) {
    this.todoCountView.innerText = count;
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
        : this.todoList.querySelector(`li[data-id='${todo.id}']`);
    todo.classList.remove('editing');
    const input = todo.querySelector('.edit');
    input.value = '';
  }

  _clearInput() {
    this.input.value = '';
  }

  _setDisplayStyleAndCount(li, todo) {
    if (this.currentFilter === 'all') {
      return;
    } else if (this.currentFilter === 'active' && todo.completed) {
      li.style.display = 'none';
      this._setTodoCount(+this.todoCountView.innerText - 1);
    } else if (this.currentFilter === 'completed' && !todo.completed) {
      this._setTodoCount(+this.todoCountView.innerText - 1);
      li.style.display = 'none';
    }
  }
}
