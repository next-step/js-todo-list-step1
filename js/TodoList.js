function TodoList () {
  this.data = [];
  const $TODO_LIST = document.getElementById('todo-list');
  const $NEW_TODO_TITLE = document.getElementById('new-todo-title');

  // list click 이벤트 리스너 등록
  $TODO_LIST.addEventListener('click', (e) => {
    const $TARGET = e.target;
    const $CLICKED_ITEM_ID = Number($TARGET.closest('li').id);

    // 완료 여부 toggle 클릭할 경우
    if ($TARGET.classList.contains('toggle')) {
      this.setIsCompletedTodo($CLICKED_ITEM_ID);
    }
  });

  // input keyup 이벤트 리스너 등록
  $NEW_TODO_TITLE.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && $NEW_TODO_TITLE.value) {
      const newTodo = {
        id: this.data.length + 1,
        text: $NEW_TODO_TITLE.value,
        status: 'default', // default, editing, completed
      };

      this.createTodo(newTodo);
    }
  });

  // 할 일 완료/취소 처리
  this.setIsCompletedTodo = function (clickedItemId) {
    this.data.forEach(todoItem => {
      if (todoItem.id === clickedItemId) {
        todoItem.status = todoItem.status === 'completed' ? 'default' : 'completed';
      }
    });
    this.render();
  };

  // 새 할 일 생성
  this.createTodo = function (newTodo) {
    this.data.push(newTodo);
    this.initInput();
    this.render();
  };

  // 입력창 초기화
  this.initInput = function () {
    $NEW_TODO_TITLE.value = '';
  };

  this.createTodoHTMLString = function () {
    return this.data.map((todoItem) => {
      return `
        <li id="${todoItem.id}" class="${todoItem.status}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todoItem.status === 'completed' ? 'checked' : ''} />
                <label class="label">${todoItem.text}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todoItem.text}" />
        </li>    
      `;
    }).join('');
  };

  this.render = function () {
    $TODO_LIST.innerHTML = this.createTodoHTMLString();
  };

  this.render();
}

