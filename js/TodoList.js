function TodoList() {
  this.data = [];
  const $TODO_LIST = document.getElementById('todo-list');
  const $NEW_TODO_TITLE = document.getElementById('new-todo-title');
  const $TODO_COUNT = document.querySelector('.todo-count > strong');

  // list click 이벤트 리스너 등록
  $TODO_LIST.addEventListener('click', (e) => {
    const $TARGET = e.target;
    const $TODO_ITEM_ID = Number($TARGET.closest('li').id);

    // 완료 여부 toggle 클릭할 경우
    if ($TARGET.classList.contains('toggle')) {
      this.setIsCompletedTodo($TODO_ITEM_ID);
    }
    // 삭제 버튼 클릭할 경우
    else if ($TARGET.classList.contains('destroy')) {
      this.deleteItem($TODO_ITEM_ID);
    }
  });

  // list double click 이벤트 리스너 등록
  $TODO_LIST.addEventListener('dblclick', (e) => {
    const $TARGET = e.target;
    const $TODO_ITEM_ID = Number($TARGET.closest('li').id);

    // label 클릭했을 경우
    if ($TARGET.classList.contains('label')) {
      this.changeEditMode($TODO_ITEM_ID);
    }
  });

  // list keyup 이벤트 리스너 등록
  $TODO_LIST.addEventListener('keyup', (e) => {
    const $TARGET = e.target;
    const $TODO_ITEM_ID = Number($TARGET.closest('li').id);

    if ($TARGET.classList.contains('edit')) {
      if (e.keyCode === 13) { // enter key
        this.editTodoText($TODO_ITEM_ID, $TARGET.value);
      } else if (e.keyCode === 27) { // esc key
        this.changeEditMode($TODO_ITEM_ID);
      }
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

  // 새 할 일 생성
  this.createTodo = function (newTodo) {
    this.data.push(newTodo);
    this.initInput();
    this.render();
  };

  // 할 일 완료/취소 처리
  this.setIsCompletedTodo = function (selectedTodoItemId) {
    this.data.forEach(todoItem => {
      if (todoItem.id === selectedTodoItemId) {
        todoItem.status = todoItem.status === 'completed' ? 'default' : 'completed';
      }
    });
    this.render();
  };

  // 할 일 삭제
  this.deleteItem = function (selectedTodoItemId) {
    this.data.forEach((todoItem, index) => {
      if (todoItem.id === selectedTodoItemId) {
        this.data.splice(index, 1);
      }
    });
    this.render();
  };

  // 편집 모드 설정/해제
  this.changeEditMode = function (selectedTodoItemId) {
    this.data.forEach(todoItem => {
      if (todoItem.id === selectedTodoItemId) {
        todoItem.status = todoItem.status === 'editing' ? 'default' : 'editing';
      }
    });
    this.render();
  };

  this.editTodoText = function (selectedTodoItemId, newText) {
    this.data.forEach(todoItem => {
      if (todoItem.id === selectedTodoItemId) {
        todoItem.text = newText;
      }
    });
    this.changeEditMode(selectedTodoItemId);
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
    $TODO_COUNT.innerHTML = this.data.length.toString();
  };

  this.render();
}

