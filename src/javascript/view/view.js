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
    this.filter = document.querySelector('.filters');
    this.currentFilter = this.filter.querySelector('.all');
    this.currentUser = 'default';
  }

  renderTodo(todo) {
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
    this.increaseTodoCount();
    if (this.currentFilter.classList.contains('completed')) {
      temp.style.display = 'none';
      return;
    } else {
      this.setTodoCount(+this.todoCountView.innerText + 1);
    }
  }

  renderAllTodo(todos) {
    todos.forEach((todo) => {
      this.renderTodo(todo);
    });
  }

  removeTodoFromList(todo) {
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
    if (!li) {
      return;
    }
    li.remove();
    this.decreaseTodoCount();
    this.setTodoCount(this.todoCountView.innerText - 1);
  }

  renderAgain(todo) {
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
    this.setDisplayStyle(li, todo);
  }

  filterAll() {
    const todos = this.todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
    this.setTodoCount(this.getTodoCount());
  }

  filterActive() {
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
    this.setTodoCount(activeCount);
  }

  filterCompleted() {
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
    this.setTodoCount(completedCount);
  }

  setSelectFilter(filter) {
    this.currentFilter.classList.remove('selected');
    this.currentFilter = filter;
    this.currentFilter.classList.add('selected');
  }

  increaseTodoCount() {
    this.todoCount++;
  }

  decreaseTodoCount() {
    this.todoCount--;
  }

  getTodoCount() {
    return this.todoCount;
  }

  setTodoCount(count) {
    this.todoCountView.innerText = count;
  }

  editMode(todo) {
    todo.classList.add('editing');
    const input = todo.querySelector('.edit');
    input.focus();
  }

  editEnd(todo) {
    todo =
      todo instanceof Element
        ? todo
        : this.todoList.querySelector(`li[data-id='${todo.id}']`);
    todo.classList.remove('editing');
    const input = todo.querySelector('.edit');
    input.value = '';
  }

  clearInput() {
    this.input.value = '';
  }

  setDisplayStyle(li, todo) {
    if (this.currentFilter.classList.contains('all')) {
      return;
    } else if (
      this.currentFilter.classList.contains('active') &&
      todo.completed
    ) {
      li.style.display = 'none';
    } else if (
      this.currentFilter.classList.contains('completed') &&
      !todo.completed
    ) {
      li.style.display = 'none';
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
        this.filter.addEventListener('click', (event) => {
          const filter = event.target.closest('.all');
          if (!filter) {
            return;
          }
          this.setSelectFilter(filter);
          callback();
        });
        break;
      case 'selectActive':
        // NOTE: callback == Controller.showActive
        this.filter.addEventListener('click', (event) => {
          const filter = event.target.closest('.active');
          if (!filter) {
            return;
          }
          this.setSelectFilter(filter);
          callback();
        });
        break;
      case 'selectCompleted':
        // NOTE: callback == Controller.showCompleted
        this.filter.addEventListener('click', (event) => {
          const filter = event.target.closest('.completed');
          if (!filter) {
            return;
          }
          this.setSelectFilter(filter);
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
        // NOTE: callback == Controller.editEnd
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
}
