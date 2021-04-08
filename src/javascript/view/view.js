/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
export default class View {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
    this.input = document.querySelector('#new-todo-title');
    this.count = document.querySelector('.todo-count').children[0];
    this.currentUser = 'default';
  }

  setEventListener(eventName, callback) {
    switch (eventName) {
      case 'add':
        // NOTE: callback == Controller.addItem
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
        // NOTE: callback == Controller.destroyItem
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

      default:
        console.log('eventName is not handling');
    }
  }

  renderTodo(item) {
    const li = this.todoList.querySelector(`li[data-id='${item.id}']`);
    if (li) {
      return;
    }
    const temp = document.createElement('li');
    temp.dataset.id = item.id;
    temp.classList.add(item.completed ? 'completed' : 'ing');
    temp.innerHTML = `
                        <div class="view">
                          <input class="toggle" type="checkbox"
                          ${item.completed ? 'checked' : ''}/>
                          <label class="label">${item.content}</label>
                          <button class="destroy"></button>
                        </div>
                        <input class="edit" value="새로운 타이틀" />`;
    this.todoList.appendChild(temp);
    this.increaseCount();
  }

  renderAllTodo(items) {
    // TODO: 아래 빈 줄로 만드는걸 메서드로 빼기
    items.forEach((item) => {
      this.renderTodo(item);
    });
  }

  removeItemFromTodoList(item) {
    const li = this.todoList.querySelector(`li[data-id='${item.id}']`);
    if (!li) {
      return;
    }
    li.remove();
    this.decreaseCount();
  }

  renderAgain(item) {
    const li = this.todoList.querySelector(`li[data-id='${item.id}']`);
    if (!li) {
      return;
    }
    li.className = item.completed ? 'completed' : 'ing';
    li.innerHTML = `
                    <div class="view">
                      <input class="toggle" type="checkbox"
                      ${item.completed ? 'checked' : ''}/>
                      <label class="label">${item.content}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀" />`;
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
