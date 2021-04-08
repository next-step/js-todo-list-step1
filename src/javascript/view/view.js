/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
export default class View {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
    this.input = document.querySelector('#new-todo-title');
    this.count = document.querySelector('.todo-count').children[0];
    this.filter = document.querySelector('.filters');
    this.seletedFilter = this.filter.querySelector('.all');
    this.currentUser = 'default';
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

      default:
        console.log('eventName is not handling');
    }
  }

  renderTodo(todo) {
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
    if (li) {
      return;
    }
    const temp = document.createElement('li');
    temp.dataset.id = todo.id;
    temp.classList.add(todo.completed ? 'completed' : 'ing');
    temp.innerHTML = `
                        <div class="view">
                          <input class="toggle" type="checkbox"
                          ${todo.completed ? 'checked' : ''}/>
                          <label class="label">${todo.content}</label>
                          <button class="destroy"></button>
                        </div>
                        <input class="edit" value="새로운 타이틀" />`;
    this.todoList.appendChild(temp);
    this.increaseCount();
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
    this.decreaseCount();
  }

  renderAgain(todo) {
    const li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
    if (!li) {
      return;
    }
    li.className = todo.completed ? 'completed' : 'ing';
    li.innerHTML = `
                    <div class="view">
                      <input class="toggle" type="checkbox"
                      ${todo.completed ? 'checked' : ''}/>
                      <label class="label">${todo.content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀" />`;
  }

  filterAll() {
    const todos = this.todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      todo.style.display = 'block';
    });
  }

  filterActive() {
    const todos = this.todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      } else {
        todo.style.display = 'block';
      }
    });
  }

  filterCompleted() {
    const todos = this.todoList.querySelectorAll('li');
    todos.forEach((todo) => {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'block';
      } else {
        todo.style.display = 'none';
      }
    });
  }

  setSelectFilter(filter) {
    this.seletedFilter.classList.remove('selected');
    this.seletedFilter = filter;
    this.seletedFilter.classList.add('selected');
  }

  increaseCount() {
    this.count.innerText = +this.count.innerText + 1;
  }

  decreaseCount() {
    this.count.innerText = +this.count.innerText - 1;
  }

  clearInput() {
    this.input.value = '';
  }
}
