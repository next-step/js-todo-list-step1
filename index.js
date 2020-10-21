window.onload = () => {
  const $todoInput = document.getElementById('new-todo-title');
  const $todoList = document.getElementById('todo-list');
  const $totalCount = document
    .getElementsByClassName('todo-count')[0]
    .getElementsByTagName('strong')[0];
  const $todoFilter = document.getElementsByClassName('filters')[0];

  function addItem(text) {
    $todoList.innerHTML += `
    <li>
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${text} />
    </li>`;

    $totalCount.innerHTML = $todoList.getElementsByTagName('li').length;
    $todoInput.value = '';
  }

  function handleChangeAddItem(event) {
    addItem(event.target.value);
  }

  function handleRemoveItem(event) {
    const removeParentNode = event.target.parentNode.parentNode;
    $todoList.removeChild(removeParentNode);
    $totalCount.innerHTML = $todoList.getElementsByTagName('li').length;
  }

  function handleToggleItem(event) {
    const toggleParentNode = event.target.parentNode;
    const { parentNode } = toggleParentNode;
    if (event.target.checked) {
      parentNode.classList.add('completed');
    } else {
      parentNode.classList.remove('completed');
    }
  }

  function handleClickItem(event) {
    const { className } = event.target;

    switch (className) {
      case 'destroy':
        handleRemoveItem(event);
        break;
      case 'toggle':
        handleToggleItem(event);
        break;
    }
  }

  function handleDblclickItem(event) {
    const { className } = event.target;
    const editedParentNode = event.target.parentNode;
    const { parentNode } = editedParentNode;

    if (className === 'label') {
      parentNode.classList.add('editing');
    }
  }

  function handleKeyupItem(event) {
    const editingParentNode = event.target.parentNode;

    switch (event.key) {
      case 'Escape':
        editingParentNode.classList.remove('editing');
        break;
      case 'Enter':
        event.target.closest('li').querySelector('label').innerText =
          event.target.value;
        editingParentNode.classList.remove('editing');
        break;
    }
  }

  function handleFilter(event) {
    for (let i = 0; i < $todoFilter.children.length; i++) {
      $todoFilter.children[i].lastElementChild.classList.remove('selected');
    }
    event.target.classList.add('selected');

    if (event.target.classList.contains('all')) {
      for (let i = 0; i < $todoList.children.length; i++) {
        $todoList.children[i].classList.remove('hidden');
      }
    } else if (event.target.classList.contains('active')) {
      for (let i = 0; i < $todoList.children.length; i++) {
        if ($todoList.children[i].classList.contains('completed')) {
          $todoList.children[i].classList.add('hidden');
        } else {
          $todoList.children[i].classList.remove('hidden');
        }
      }
    } else if (event.target.classList.contains('completed')) {
      for (let i = 0; i < $todoList.children.length; i++) {
        if ($todoList.children[i].classList.contains('completed')) {
          $todoList.children[i].classList.remove('hidden');
        } else {
          $todoList.children[i].classList.add('hidden');
        }
      }
    }
  }

  $todoInput.addEventListener('change', handleChangeAddItem);
  $todoList.addEventListener('click', handleClickItem);
  $todoList.addEventListener('dblclick', handleDblclickItem);
  $todoList.addEventListener('keyup', handleKeyupItem);
  $todoFilter.addEventListener('click', handleFilter);
};
