/* 
  NOTE: 현재는 currentUser 를 default로 바로 등록하고 있지만,
        이후에는 DOM 요소로 user를 선택할 수 있게 수정해야한다.
*/
export default class View {
  constructor() {
    this.todoList = document.querySelector('#todo-list');
    this.input = document.querySelector('#new-todo-title');
    this.currentUser = 'default';
    console.log(this.todoList);
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

  renderAllTodo(items) {
    // TODO: 아래 빈 줄로 만드는걸 메서드로 빼기
    this.todoList.innerHTML = '';
    items.forEach((item) => {
      this.renderTodo(item);
    });
  }

  renderTodo(item) {
    console.log(item);
    let li = `<li class=${item.completed ? 'completed' : 'ing'} data-id=${
      item.id
    }>
                <div class="view">
                  <input class="toggle" type="checkbox"
                  ${item.completed ? 'checked' : ''}/>
                  <label class="label">${item.content}</label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="새로운 타이틀" />
              </li>`;
    this.todoList.insertAdjacentHTML('beforeend', li);
  }

  clearInput() {
    this.input.value = '';
  }
}
