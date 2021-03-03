const CLASS_COMPLETED = 'completed';
const CLASS_EDITING = 'editing';

const extractState = ($li) => {
  return {
    index: $li.dataset.id,
    content: $li.querySelector('.label').textContent,
    status: $li.classList[0],
  };
};

const eventHandler = (updateTodoItem, removeTodoItem) => {
  const _toggleCompleteStatus = ({ target }) => {
    if (!target.classList.contains('toggle')) {
      return;
    }

    const $li = target.closest('li');
    const isCompleted = target.toggleAttribute('checked');
    if (isCompleted) {
      $li.classList.add(CLASS_COMPLETED);
    } else {
      $li.classList.remove(CLASS_COMPLETED);
    }

    updateTodoItem(extractState($li));
  };

  const _changeToEditMode = ({ target }) => {
    if (!target.classList.contains('label')) {
      return;
    }

    const $li = target.closest('li');
    $li.classList.add(CLASS_EDITING);
    $li.querySelector('.edit').focus();
  };

  const _changeToViewModeOnFocusout = ({ target }) => {
    _changeToViewMode(target);
  };

  const _changeToViewModeOnEnter = ({ target, key }) => {
    if (key !== 'Enter') {
      return;
    }
    _changeToViewMode(target);
  };

  const _changeToViewMode = (target) => {
    if (!target.classList.contains('edit')) {
      return;
    }
    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $label = $li.querySelector('.label');
    const updatedContent = target.value.trim();
    $label.textContent = updatedContent;

    updateTodoItem(extractState($li));
  };

  const _escapeToViewMode = ({ target, key }) => {
    if (!target.classList.contains('edit')) {
      return;
    }

    if (key !== 'Escape') {
      return;
    }

    const $li = target.closest('li');
    $li.classList.remove(CLASS_EDITING);

    const $label = $li.querySelector('.label');
    const oldContent = $label.textContent;
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

    const $li = target.closest('li');
    $li.remove();
    removeTodoItem(extractState($li));
  };

  const addEventListener = ($liTemplate) => {
    $liTemplate.addEventListener('click', _toggleCompleteStatus);
    $liTemplate.addEventListener('dblclick', _changeToEditMode);
    $liTemplate.addEventListener('keyup', _changeToViewModeOnEnter);
    $liTemplate.addEventListener('focusout', _changeToViewModeOnFocusout);
    $liTemplate.addEventListener('keyup', _escapeToViewMode);
    $liTemplate.addEventListener('click', _removeTodoItem);

    return $liTemplate;
  };

  return {
    addEventListener,
  };
};

const todoList = ($ulist, updateTodoItem, removeTodoItem) => {
  const _eventHandler = eventHandler(updateTodoItem, removeTodoItem);

  const _createListItemTemplate = () => {
    const $liTemplate = document.createElement('li');

    const $innerDiv = document.createElement('div');
    $innerDiv.classList.add('view');

    const $innerInput = document.createElement('input');
    $innerInput.type = 'checkbox';
    $innerInput.classList.add('toggle');

    const $innerLabel = document.createElement('label');
    $innerLabel.classList.add('label');

    const $innerButton = document.createElement('button');
    $innerButton.classList.add('destroy');

    $innerDiv.appendChild($innerInput);
    $innerDiv.appendChild($innerLabel);
    $innerDiv.appendChild($innerButton);

    const $listInput = document.createElement('input');
    $listInput.classList.add('edit');

    $liTemplate.appendChild($innerDiv);
    $liTemplate.appendChild($listInput);

    return $liTemplate;
  };

  const _createListItem = ({ index, content, status }) => {
    const $todoItem = _eventHandler.addEventListener(_createListItemTemplate());

    $todoItem.querySelector('label.label').textContent = content;
    $todoItem.querySelector('input.edit').value = content;
    status && $todoItem.classList.add(status);
    if (status === CLASS_COMPLETED) {
      $todoItem.querySelector('input.toggle').setAttribute('checked', null);
    }

    $todoItem.dataset.id = index;

    return $todoItem;
  };

  const _empty = () => {
    $ulist.innerHTML = '';
  };

  const _render = ($listItem) => {
    $ulist.appendChild($listItem);
  };

  return {
    addItem(todoItem) {
      _render(_createListItem(todoItem));
    },
    refresh(todoItems) {
      _empty();
      todoItems.map(_createListItem).forEach(_render);
    },
  };
};

export { todoList };
