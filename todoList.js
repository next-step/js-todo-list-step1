const extractState = (listItem) => {
  return {
    index: listItem.dataset.id,
    content: listItem.querySelector('.label').textContent,
    status: listItem.classList[0],
  };
};

const eventHandler = (updateTodoItem, removeTodoItem) => {
  const _toggleCompleteStatus = ({ target }) => {
    if (!target.classList.contains('toggle')) {
      return;
    }

    // todo list의 체크박스를 클릭하여 complete 상태로 변경.
    // (li tag 에 completed class 추가, input 태그에 checked 속성 추가)
    const listItem = target.closest('li');
    const isCompleted = target.toggleAttribute('checked');
    if (isCompleted) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }

    updateTodoItem(extractState(listItem)); //TODO
  };

  const _changeToEditMode = ({ target }) => {
    if (!target.classList.contains('label')) {
      return;
    }

    // todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가)
    const listItem = target.closest('li');
    listItem.classList.add('editing');
  };

  const _changeToViewMode = ({ target, key }) => {
    if (!target.classList.contains('edit')) {
      return;
    }

    if (key !== 'Enter') {
      return;
    }

    const listItem = target.closest('li');
    listItem.classList.remove('editing');

    const label = listItem.querySelector('.label');
    const updatedContent = target.value;
    label.textContent = updatedContent;

    updateTodoItem(extractState(listItem)); //TODO
  };

  const _escapeToViewMode = ({ target, key }) => {
    if (!target.classList.contains('edit')) {
      return;
    }

    if (key !== 'escape') {
      return;
    }

    const listItem = target.closest('li');
    listItem.classList.replace('editing', 'view');

    const label = listItem.querySelector('.label');
    const oldContent = label.textContent;
    target.value = oldContent;

    return;
  };

  const _removeTodoItem = ({ target }) => {
    if (!target.classList.contains('destroy')) {
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    //todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
    const listItem = target.closest('li');
    listItem.remove();

    removeTodoItem(extractState(listItem));
  };

  const addEventListener = (listItemTemplate) => {
    listItemTemplate.addEventListener('click', _toggleCompleteStatus);
    listItemTemplate.addEventListener('dblclick', _changeToEditMode);
    listItemTemplate.addEventListener('keyup', _changeToViewMode); // TODO Enter 키입력과 focusout 두개로 분리하여 저장
    // listItemTemplate.addEventListener('focusout', changeToViewMode);
    listItemTemplate.addEventListener('keyup', _escapeToViewMode);
    listItemTemplate.addEventListener('click', _removeTodoItem);

    return listItemTemplate;
  };

  return {
    addEventListener,
  };
};

const todoList = (updateTodoItem, removeTodoItem) => {
  const _ulist = document.getElementById('todo-list');
  const _addEventListener = eventHandler(updateTodoItem, removeTodoItem);

  const _createListItemTemplate = () => {
    const listItemTemplate = document.createElement('li');

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('view');

    const innerInput = document.createElement('input');
    innerInput.type = 'checkbox';
    innerInput.classList.add('toggle');

    const innerLabel = document.createElement('label');
    innerLabel.classList.add('label');

    const innerButton = document.createElement('button');
    innerButton.classList.add('destroy');

    innerDiv.appendChild(innerInput);
    innerDiv.appendChild(innerLabel);
    innerDiv.appendChild(innerButton);

    const listInput = document.createElement('input');
    listInput.classList.add('edit');

    listItemTemplate.appendChild(innerDiv);
    listItemTemplate.appendChild(listInput);

    return listItemTemplate;
  };

  const _createListItem = ({ index, content, status }) => {
    const todoItem = _addEventListener.addEventListener(
      _createListItemTemplate()
    ); //TODO

    todoItem.querySelector('label.label').textContent = content;
    todoItem.querySelector('input.edit').value = content;
    status && todoItem.classList.add(status); // status 유효값 검사?
    if (status === 'completed') {
      todoItem.querySelector('input.toggle').setAttribute('checked', null);
    }

    todoItem.dataset.id = index;

    return todoItem;
  };

  const _empty = () => {
    _ulist.innerHTML = '';
  };

  const _render = (todoItem) => {
    const listItem = _createListItem(todoItem);
    _ulist.appendChild(listItem);
  };

  return {
    addItem(todoItem) {
      _render(todoItem);
    },
    refresh(todoItems) {
      _empty();
      todoItems.forEach(_render);
    },
  };
};

export { todoList };
