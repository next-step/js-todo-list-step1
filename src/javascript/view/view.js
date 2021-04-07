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
      default:
        console.log('eventName is not handling');
    }
  }

  renderTodo(item) {
    console.log(this);
    let li = `<li data-id=${item.id}>
                <div class="view">
                  <input class="toggle" type="checkbox"/>
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
